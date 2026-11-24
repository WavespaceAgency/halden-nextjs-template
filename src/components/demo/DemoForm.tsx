"use client";

import { useActionState, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { submitDemoRequest } from "@/app/book-a-demo/actions";
import type { DemoFormContent } from "@/config/pages/book-a-demo";
import { buttonClasses } from "@/lib/button";
import { cn } from "@/lib/utils";
import styles from "./DemoForm.module.css";
import {
  demoFieldNames,
  emptyDemoValues,
  readDemoForm,
  validateDemo,
  validateDemoField,
  type DemoErrors,
  type DemoField,
  type DemoFormState,
} from "./validation";

type Props = {
  content: DemoFormContent;
};

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const inputClass = cn(
  styles.input,
  "w-full rounded-[10px] border border-line bg-surface px-[18px] text-base leading-[26px] text-ink placeholder:text-muted hover:border-ink/25 focus:border-brand focus:outline-none aria-invalid:border-[#b42318]",
);
const labelClass = cn(styles.label, "self-start text-[13px] leading-[17px] font-medium text-ink");
const errorClass = cn(styles.error, "text-[13px] leading-[17px] text-[#b42318] empty:hidden");

/** Label + control + error message, wired together with ids. */
function Field({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn(styles.field, "flex flex-col gap-2", className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className={errorClass}>
        {error}
      </p>
    </div>
  );
}

/** Small shake on a field that failed validation (skipped with "reduce motion"). */
function shake(el: Element | null) {
  if (!(el instanceof HTMLElement) || reduceMotion()) return;
  el.animate([{ translate: "0" }, { translate: "-5px 0" }, { translate: "4px 0" }, { translate: "-5px 0" }, { translate: "4px 0" }, { translate: "0" }], {
    duration: 420,
    easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)",
  });
}

/**
 * "Book your demo" form. It posts to a Server Action (app/book-a-demo/actions.ts)
 * through useActionState, so it also works before JavaScript loads.
 * - The browser checks the fields first (same rules as the server) and shows the
 *   errors next to each field, announces a summary and focuses the first invalid field.
 *   After the first submit, fields re-check as you type.
 * - The server checks again; its errors are shown the same way, with the typed values kept.
 * - While sending, the button shows a spinner and "Sending…" (it is never disabled up front).
 * - On success the card morphs into a thank-you message that takes focus; "Send another
 *   request" brings back an empty form.
 */
export function DemoForm({ content: f }: Props) {
  const [state, formAction, pending] = useActionState<DemoFormState, FormData>(submitDemoRequest, { status: "idle" });
  // Start from the action's state: without JavaScript the server renders the form with its errors.
  const [errors, setErrors] = useState<DemoErrors>(() => (state.status === "error" ? state.errors : {}));
  const [summary, setSummary] = useState(() => (state.status === "error" ? (state.message ?? f.errorSummary) : ""));
  const [checkLive, setCheckLive] = useState(false);
  /** The success state the visitor closed with "Send another request". */
  const [dismissed, setDismissed] = useState<DemoFormState | null>(null);
  const [returning, setReturning] = useState(false);

  // Show the server's answer: adopt its errors when a new state arrives (no effect needed).
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error") {
      setErrors(state.errors);
      setSummary(state.message ?? f.errorSummary);
    } else {
      setErrors({});
      setSummary("");
    }
  }

  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  /** Card height just before the form ⇄ thank-you swap, for the morph. */
  const heightBefore = useRef(0);
  const firstSwap = useRef(true);

  const success = state.status === "success" && state !== dismissed;
  const values = state.status === "error" ? state.values : emptyDemoValues;

  // Server errors: focus the first invalid field.
  useEffect(() => {
    if (state.status !== "error") return;
    const first = demoFieldNames.find((name) => state.errors[name]);
    const el = first && formRef.current?.elements.namedItem(first);
    if (el instanceof HTMLElement) el.focus();
  }, [state]);

  // Form ⇄ thank-you: morph the card's height, then move focus into the new content.
  useLayoutEffect(() => {
    if (firstSwap.current) {
      firstSwap.current = false;
      return;
    }
    const card = cardRef.current;
    if (!card) return;
    const from = heightBefore.current;
    const to = card.offsetHeight;
    const morph =
      from && from !== to && !reduceMotion()
        ? card.animate([{ height: `${from}px`, overflow: "hidden" }, { height: `${to}px`, overflow: "hidden" }], { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" })
        : undefined;
    if (success) successTitleRef.current?.focus({ preventScroll: true });
    else formRef.current?.querySelector("input")?.focus({ preventScroll: true });
    return () => morph?.cancel();
  }, [success]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (pending) {
      event.preventDefault();
      return;
    }
    const form = event.currentTarget;
    const found = validateDemo(readDemoForm(new FormData(form)));
    setCheckLive(true);
    setErrors(found);
    const invalid = demoFieldNames.filter((name) => found[name]);
    if (invalid.length > 0) {
      event.preventDefault();
      setSummary(f.errorSummary);
      invalid.forEach((name) => shake(form.elements.namedItem(name) as Element | null));
      (form.elements.namedItem(invalid[0]) as HTMLElement | null)?.focus();
      return;
    }
    // Valid: let React run the Server Action.
    setSummary("");
    heightBefore.current = cardRef.current?.offsetHeight ?? 0;
  };

  /** After the first submit, re-check a field as soon as it changes. */
  const recheck = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;
    if (!checkLive || !(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const name = target.name as DemoField;
    if (!demoFieldNames.includes(name)) return;
    const error = validateDemoField(name, target.value);
    setErrors((current) => (current[name] === error ? current : { ...current, [name]: error }));
  };

  const again = () => {
    heightBefore.current = cardRef.current?.offsetHeight ?? 0;
    setDismissed(state);
    setErrors({});
    setSummary("");
    setCheckLive(false);
    setReturning(true);
  };

  const describedBy = (name: DemoField) => `demo-${name}-error`;
  const textFields = [
    { name: "name", type: "text", autoComplete: "name", inputMode: undefined, ...f.fields.name },
    { name: "email", type: "email", autoComplete: "email", inputMode: "email", ...f.fields.email },
    { name: "clinic", type: "text", autoComplete: "organization", inputMode: undefined, ...f.fields.clinic },
    { name: "phone", type: "tel", autoComplete: "tel", inputMode: "tel", ...f.fields.phone },
  ] as const;

  return (
    <div ref={cardRef} className="rounded-[28px] bg-surface p-6 sm:p-10 xl:w-[600px] xl:shrink-0">
      {success ? (
        <div className="flex flex-col items-start gap-4 py-6">
          <span className={cn(styles.badge, "relative flex size-14 items-center justify-center rounded-full bg-sky-soft")} aria-hidden="true">
            <span className={cn(styles.ripple, "absolute inset-0 rounded-full border-2 border-brand/40")} />
            <svg className="size-7 text-brand" viewBox="0 0 24 24" fill="none" data-no-draw>
              <path className={styles.check} d="M5 12.5 10 17.5 19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
            </svg>
          </span>
          <h2 ref={successTitleRef} tabIndex={-1} className={cn(styles.rise, "text-[28px] leading-9 font-medium tracking-[-0.015em] text-ink focus:outline-none")} style={{ "--i": 1 } as CSSProperties}>
            {f.success.title}
          </h2>
          <p className={cn(styles.rise, "max-w-[440px] text-base leading-6 text-body")} style={{ "--i": 2 } as CSSProperties}>
            {f.success.description}
          </p>
          <div className={styles.rise} style={{ "--i": 3 } as CSSProperties}>
            <button type="button" className={buttonClasses({ variant: "outline", size: "md" })} onClick={again}>
              {f.success.again}
            </button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          action={formAction}
          onSubmit={onSubmit}
          onInput={recheck}
          onBlur={recheck}
          noValidate
          aria-labelledby="demo-form-title"
          className={cn("flex flex-col gap-6", returning && styles.formIn)}
        >
          <div className="flex flex-col gap-2">
            <h2 id="demo-form-title" className="text-[28px] leading-9 font-medium tracking-[-0.015em] text-ink">
              {f.title}
            </h2>
            <p className="text-base leading-[21px] text-muted">{f.description}</p>
          </div>

          <p className="sr-only" role="alert">
            {summary}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-4">
            {textFields.map((field) => (
              <Field key={field.name} id={`demo-${field.name}`} label={field.label} error={errors[field.name]}>
                <input
                  id={`demo-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  spellCheck={field.name === "email" ? false : undefined}
                  placeholder={field.placeholder}
                  defaultValue={values[field.name]}
                  required
                  aria-invalid={errors[field.name] ? true : undefined}
                  aria-describedby={describedBy(field.name)}
                  className={cn(inputClass, "h-[52px]")}
                />
              </Field>
            ))}

            <Field id="demo-locations" label={f.fields.locations.label} error={errors.locations} className="sm:col-span-2">
              <div className="relative">
                <select
                  id="demo-locations"
                  name="locations"
                  defaultValue={values.locations}
                  required
                  aria-invalid={errors.locations ? true : undefined}
                  aria-describedby={describedBy("locations")}
                  className={cn(inputClass, "h-[52px] appearance-none pr-12 invalid:text-muted")}
                >
                  <option value="" disabled>
                    {f.fields.locations.placeholder}
                  </option>
                  {f.fields.locations.options.map((option) => (
                    <option key={option} value={option} className="text-ink">
                      {option}
                    </option>
                  ))}
                </select>
                <svg
                  className={cn(styles.chevron, "pointer-events-none absolute top-1/2 right-[22px] h-[5px] w-2.5 -translate-y-1/2 text-muted")}
                  viewBox="0 0 10 5"
                  fill="none"
                  aria-hidden="true"
                  data-no-draw
                >
                  <path d="m.5.5 4.5 4 4.5-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Field>

            <Field id="demo-message" label={f.fields.message.label} error={errors.message} className="sm:col-span-2">
              <textarea
                id="demo-message"
                name="message"
                rows={4}
                maxLength={2000}
                placeholder={f.fields.message.placeholder}
                defaultValue={values.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy("message")}
                className={cn(inputClass, "h-[140px] resize-y py-[13px]")}
              />
            </Field>
          </div>

          <div>
            <button
              type="submit"
              aria-disabled={pending || undefined}
              className="inline-flex min-h-[52px] items-center justify-center rounded-button bg-brand px-[17px] text-base leading-6 font-medium text-canvas transition-[background-color,box-shadow,scale] duration-[250ms,300ms,450ms] ease-[ease,ease,cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] aria-disabled:opacity-80 motion-reduce:hover:scale-100"
            >
              {pending && <span className={styles.spinner} aria-hidden="true" />}
              {pending ? f.sending : f.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

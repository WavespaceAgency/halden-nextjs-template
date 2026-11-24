"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { buttonClasses } from "@/lib/button";
import { cn } from "@/lib/utils";

type Props = {
  content: { label: string; placeholder: string; button: string; success: string; error: string };
};

/**
 * Newsletter sign-up. Checks the email in the browser and shows a thank-you message.
 * It does not send anything yet – connect it to your email tool in `onSubmit` (see TODO).
 */
export function NewsletterForm({ content: n }: Props) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    if (!input.value.trim() || !input.checkValidity()) {
      setStatus("error");
      input.focus();
      return;
    }
    // TODO: send `input.value` to your email provider here (Mailchimp, Buttondown, ConvertKit, Resend …),
    // e.g. with a Server Action. Keep API keys on the server – never in this client component.
    setStatus("success");
    event.currentTarget.reset();
  };

  return (
    <form className="w-full lg:w-[381px]" noValidate onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 rounded-[18px] bg-surface p-1.5 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-brand sm:flex-row sm:items-center sm:pl-5">
        <label htmlFor={`${id}-email`} className="sr-only">
          {n.label}
        </label>
        <input
          ref={inputRef}
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder={n.placeholder}
          aria-invalid={status === "error" || undefined}
          aria-describedby={`${id}-status`}
          onChange={() => status !== "idle" && setStatus("idle")}
          className="min-h-11 w-full min-w-0 flex-1 bg-transparent px-3.5 text-base text-ink placeholder:text-muted focus:outline-none sm:px-0"
        />
        <button type="submit" className={buttonClasses({ size: "md", className: "shadow-none!" })}>
          {n.button}
        </button>
      </div>
      <p id={`${id}-status`} className={cn("mt-2 min-h-5 text-sm leading-5 empty:hidden", status === "error" ? "text-[#b42318]" : "text-ink")} aria-live="polite">
        {status === "error" ? n.error : status === "success" ? n.success : ""}
      </p>
    </form>
  );
}

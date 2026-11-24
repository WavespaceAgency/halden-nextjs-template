import { bookDemo } from "@/config/pages/book-a-demo";

/**
 * Validation for the "Book your demo" form, shared by the browser (instant feedback)
 * and the Server Action (the check that counts – never trust the browser alone).
 * Error messages come from src/config/pages/book-a-demo.ts.
 */

export const demoFieldNames = ["name", "email", "clinic", "phone", "locations", "message"] as const;
export type DemoField = (typeof demoFieldNames)[number];
export type DemoValues = Record<DemoField, string>;
export type DemoErrors = Partial<Record<DemoField, string>>;

/** What the Server Action returns to the form (see useActionState in DemoForm). */
export type DemoFormState =
  | { status: "idle" }
  | { status: "error"; errors: DemoErrors; values: DemoValues; message?: string }
  | { status: "success" };

export const emptyDemoValues: DemoValues = { name: "", email: "", clinic: "", phone: "", locations: "", message: "" };

const { fields } = bookDemo.form;

/** The form's values as trimmed strings. */
export function readDemoForm(data: FormData): DemoValues {
  const get = (key: DemoField) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return { name: get("name"), email: get("email"), clinic: get("clinic"), phone: get("phone"), locations: get("locations"), message: get("message") };
}

/** Error message for one field, or undefined when it is valid. */
export function validateDemoField(field: DemoField, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case "name":
      return v && v.length <= 120 ? undefined : fields.name.error;
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254 ? undefined : fields.email.error;
    case "clinic":
      return v && v.length <= 160 ? undefined : fields.clinic.error;
    case "phone": {
      const digits = v.replace(/\D/g, "").length;
      return /^[+\d\s().-]+$/.test(v) && digits >= 7 && digits <= 15 ? undefined : fields.phone.error;
    }
    case "locations":
      return fields.locations.options.includes(v) ? undefined : fields.locations.error;
    case "message":
      return v.length <= 2000 ? undefined : fields.message.error;
  }
}

/** Errors for every invalid field (empty object = valid). */
export function validateDemo(values: DemoValues): DemoErrors {
  const errors: DemoErrors = {};
  for (const field of demoFieldNames) {
    const error = validateDemoField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

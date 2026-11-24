"use server";

import { readDemoForm, validateDemo, type DemoFormState } from "@/components/demo/validation";

/**
 * Server Action behind the "Book your demo" form (used with useActionState in
 * src/components/demo/DemoForm.tsx). It runs on the server only: it validates the
 * request again (the browser check is just for speed), then hands it on.
 * Returns field errors (with the values, so nothing the visitor typed is lost)
 * or success. Works without JavaScript too (the form posts to it directly).
 */
export async function submitDemoRequest(_previous: DemoFormState, formData: FormData): Promise<DemoFormState> {
  const values = readDemoForm(formData);
  const errors = validateDemo(values);
  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  // TODO: connect your email or CRM here. A few common options:
  //   - Email:   await resend.emails.send({ from, to: "sales@yourclinic.com", subject: "New demo request", text: … })
  //   - CRM:     await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { method: "POST", headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` }, body: … })
  //   - Webhook: await fetch(process.env.DEMO_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(values) })
  // If the call fails, return an error so the visitor can try again, e.g.:
  //   return { status: "error", errors: {}, values, message: bookDemo.form.serverError };
  // Until then the request is only written to the server log (your terminal, or the Vercel function logs).
  // Remove this log once requests go to a real inbox – it contains personal data.
  console.info("[book-a-demo] New demo request", values);

  return { status: "success" };
}

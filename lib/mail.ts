import { Resend } from "resend";
import { normalizeUrl, type ApplicationInput } from "@/lib/validations/application";
import { topicLabels, type EnquiryInput } from "@/lib/validations/enquiry";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const wrap = (inner: string) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f8fb;padding:32px 16px">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e9ef;border-radius:16px;overflow:hidden">
    <div style="height:4px;background:linear-gradient(90deg,#1e40af,#2563eb,#3b82f6)"></div>
    <div style="padding:28px;color:#0a0a0a;font-size:15px;line-height:1.6">${inner}</div>
  </div>
</div>`;

export async function sendEnquiryEmails(data: EnquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  if (!apiKey || !to) throw new Error("Email is not configured");

  const from = process.env.RESEND_FROM ?? "OxCodx <enquiries@oxcodx.com>";
  const resend = new Resend(apiKey);

  const topic = topicLabels[data.topic];
  const regarding = data.subject ? `${topic}: ${data.subject}` : topic;

  /* 1) notification to you */
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#5b6472;vertical-align:top">${label}</td><td style="padding:6px 0">${value}</td></tr>`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[OxCodx] ${regarding} - ${data.name}`,
    html: wrap(`
      <p style="margin:0 0 16px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#2563eb;font-family:monospace">New enquiry</p>
      <h2 style="margin:0 0 20px;font-size:20px">${esc(regarding)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:20px">
        ${row("Name", esc(data.name))}
        ${row("Email", `<a href="mailto:${esc(data.email)}" style="color:#2563eb">${esc(data.email)}</a>`)}
        ${data.phone ? row("Phone", esc(data.phone)) : ""}
      </table>
      <div style="padding:16px;background:#f6f8fb;border-radius:12px;white-space:pre-wrap">${esc(data.message)}</div>
      <p style="margin:20px 0 0;font-size:13px;color:#5b6472">Hit Reply to answer ${esc(data.name)} directly.</p>
    `),
    text: `New enquiry: ${regarding}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\n\n${data.message}`,
  });
  if (error) throw new Error(error.message);

  /* 2) confirmation to the visitor (never blocks success) */
  if (process.env.SEND_CONFIRMATION !== "false") {
    try {
      const { error: confirmError } = await resend.emails.send({
        from,
        to: [data.email],
        subject: "We received your enquiry - OxCodx",
        html: wrap(`
          <h2 style="margin:0 0 12px;font-size:20px">Thanks, ${esc(data.name.split(" ")[0])}.</h2>
          <p style="margin:0 0 16px">We've received your message about <strong>${esc(regarding)}</strong> and will reply within one business day.</p>
          <div style="padding:16px;background:#f6f8fb;border-radius:12px;white-space:pre-wrap;font-size:14px;color:#5b6472">${esc(data.message)}</div>
          <p style="margin:20px 0 0;font-size:13px;color:#5b6472">- The OxCodx team</p>
        `),
        text: `Thanks, ${data.name.split(" ")[0]}.\n\nWe've received your message about "${regarding}" and will reply within one business day.\n\n- The OxCodx team`,
      });
      if (confirmError) console.error("[enquiry] confirmation email failed:", confirmError.message);
    } catch (e) {
      console.error("[enquiry] confirmation email failed:", e);
    }
  }
}

export async function sendApplicationEmails(data: ApplicationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CAREERS_TO ?? process.env.ENQUIRY_TO;
  if (!apiKey || !to) throw new Error("Email is not configured");

  const from = process.env.RESEND_FROM ?? "OxCodx <enquiries@oxcodx.com>";
  const resend = new Resend(apiKey);

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#5b6472;vertical-align:top">${label}</td><td style="padding:6px 0">${value}</td></tr>`;
  const link = (url: string) => {
    const u = normalizeUrl(url);
    return `<a href="${esc(u)}" style="color:#2563eb">${esc(u)}</a>`;
  };

  /* 1) notification to you */
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[OxCodx Careers] ${data.role} - ${data.name}`,
    html: wrap(`
      <p style="margin:0 0 16px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#2563eb;font-family:monospace">New application</p>
      <h2 style="margin:0 0 20px;font-size:20px">${esc(data.role)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:20px">
        ${row("Name", esc(data.name))}
        ${row("Email", `<a href="mailto:${esc(data.email)}" style="color:#2563eb">${esc(data.email)}</a>`)}
        ${data.phone ? row("Phone", esc(data.phone)) : ""}
        ${row("CV / portfolio", link(data.portfolioUrl))}
        ${data.profileUrl ? row("LinkedIn / GitHub", link(data.profileUrl)) : ""}
      </table>
      <div style="padding:16px;background:#f6f8fb;border-radius:12px;white-space:pre-wrap">${esc(data.message)}</div>
      <p style="margin:20px 0 0;font-size:13px;color:#5b6472">Hit Reply to answer ${esc(data.name)} directly.</p>
    `),
    text: `New application: ${data.role}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\nCV / portfolio: ${normalizeUrl(data.portfolioUrl)}\nLinkedIn / GitHub: ${data.profileUrl ? normalizeUrl(data.profileUrl) : "-"}\n\n${data.message}`,
  });
  if (error) throw new Error(error.message);

  /* 2) confirmation to the applicant (never blocks success) */
  if (process.env.SEND_CONFIRMATION !== "false") {
    try {
      const { error: confirmError } = await resend.emails.send({
        from,
        to: [data.email],
        subject: "We received your application - OxCodx",
        html: wrap(`
          <h2 style="margin:0 0 12px;font-size:20px">Thanks, ${esc(data.name.split(" ")[0])}.</h2>
          <p style="margin:0 0 16px">We've received your application for <strong>${esc(data.role)}</strong>. Our team will review it and be in touch by email.</p>
          <p style="margin:20px 0 0;font-size:13px;color:#5b6472">- The OxCodx team</p>
        `),
        text: `Thanks, ${data.name.split(" ")[0]}.\n\nWe've received your application for "${data.role}". Our team will review it and be in touch by email.\n\n- The OxCodx team`,
      });
      if (confirmError) console.error("[apply] confirmation email failed:", confirmError.message);
    } catch (e) {
      console.error("[apply] confirmation email failed:", e);
    }
  }
}
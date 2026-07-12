'use server';

import { InquiryFormValues, InquirySourceContext } from "@/types";

export async function sendInquiry(
  values: InquiryFormValues,
  context: InquirySourceContext
) {
  try {
    // 1. Validation (mock)
    const fullName = typeof values.fullName === "string" ? values.fullName.trim() : "";
    const email = typeof values.email === "string" ? values.email.trim() : "";
    const phoneNumber = typeof values.phoneNumber === "string" ? values.phoneNumber.trim() : "";
    const message = typeof values.message === "string" ? values.message.trim() : "";
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (fullName.length < 2 || !isValidEmail || message.length < 10) {
      return { success: false, error: "Invalid form fields" };
    }

    // 2. Email payload preparation
    const subject = context.sourceType === "product_inquiry" 
      ? `[Palais des Chimères] Product inquiry — ${context.productName}`
      : `[Palais des Chimères] Website contact form`;

    let body = `New inquiry received\n\n`;
    body += `Inquiry source: ${context.sourceLabel}\n`;
    body += `Source type: ${context.sourceType}\n\n`;
    body += `Customer information:\n`;
    body += `Full name: ${fullName}\n`;
    body += `Email: ${email}\n`;
    if (phoneNumber) {
      body += `Phone number: ${phoneNumber}\n`;
    }
    body += `\nMessage:\n${message}\n\n`;

    if (context.sourceType === "product_inquiry") {
      body += `Product context:\n`;
      body += `Product name: ${context.productName}\n`;
      body += `Product slug: ${context.productSlug}\n`;
      body += `Product ID: ${context.productId}\n`;
      body += `Product type: ${context.productType}\n`;
      if (context.productPrice) {
        body += `Product price: ${context.productPrice}\n`;
      }
      body += `\n`;
    }

    body += `Technical context:\n`;
    if (context.pageUrl) body += `Page URL: ${context.pageUrl}\n`;
    body += `Locale: ${context.locale}\n`;
    body += `Submitted at: ${new Date().toISOString()}\n`;

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.INQUIRY_FROM_EMAIL;

    if (!apiKey || !from) {
      console.error("Inquiry email is not configured: RESEND_API_KEY and INQUIRY_FROM_EMAIL are required.");
      return { success: false, error: "Inquiry email is not configured" };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Palais-des-Chimeres/1.0",
      },
      body: JSON.stringify({
        from,
        to: ["opryshkosm@gmail.com"],
        reply_to: email,
        subject,
        text: body,
      }),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      console.error("Inquiry email delivery failed:", response.status, responseBody);
      return { success: false, error: "Unable to deliver inquiry email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send inquiry:", error);
    return { success: false, error: "Failed to send inquiry" };
  }
}

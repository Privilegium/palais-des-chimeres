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

    // 3. Send email (mock)
    // TODO: Plug in Resend or SMTP here when env vars are available
    console.log("================ SENDING EMAIL ================");
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log("===============================================");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
  } catch (error) {
    console.error("Failed to send inquiry:", error);
    return { success: false, error: "Failed to send inquiry" };
  }
}

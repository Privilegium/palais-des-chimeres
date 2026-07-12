import type { InquiryFormValues, InquirySourceContext } from "@/types";

export async function sendInquiry(
  values: InquiryFormValues,
  context: InquirySourceContext
) {
  void values;
  void context;

  return {
    success: false,
    error: "Inquiry delivery is unavailable in the static preview.",
  };
}

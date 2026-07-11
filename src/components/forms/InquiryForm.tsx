'use client';

import { useState } from 'react';
import { sendInquiry } from '@/actions/send-inquiry';
import { getDictionary } from '@/i18n/dictionaries';
import { StarOrnament } from '@/components/ui/Ornament';
import type { InquirySourceContext, InquiryFormValues } from '@/types';

/*
  FloatingField / FloatingTextarea — same CSS-only floating-label technique
  used in ContactForm:
    • input has placeholder=" " (single space)
    • :placeholder-shown  → label centred inside field (empty state)
    • :not(:placeholder-shown) | :focus → label floats to top-left edge
    All done with Tailwind `peer` variants — zero JS.
*/

function FloatingField({
  id,
  name,
  label,
  type = 'text',
  required = false,
  minLength,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder=" "
        className={[
          'peer w-full bg-transparent border border-brand-ivory/20',
          'px-4 pt-5 pb-2',
          'text-[13px] text-brand-ivory',
          'placeholder:text-transparent',
          'focus:outline-none focus:border-brand-ivory/50',
          'transition-colors duration-200',
        ].join(' ')}
      />
      <label
        htmlFor={id}
        className={[
          'absolute left-4 top-[50%] -translate-y-1/2',
          'text-[11px] tracking-[0.2em] uppercase text-brand-ivory/40',
          'pointer-events-none select-none',
          'transition-all duration-200 ease-out',
          'peer-focus:top-[9px] peer-focus:translate-y-0 peer-focus:text-[8.5px] peer-focus:text-brand-ivory/60 peer-focus:tracking-[0.28em]',
          'peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:translate-y-0',
          'peer-[:not(:placeholder-shown)]:text-[8.5px] peer-[:not(:placeholder-shown)]:text-brand-ivory/60',
          'peer-[:not(:placeholder-shown)]:tracking-[0.28em]',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
  required = false,
  minLength,
  rows = 4,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        required={required}
        minLength={minLength}
        rows={rows}
        placeholder=" "
        className={[
          'peer w-full bg-transparent border border-brand-ivory/20',
          'px-4 pt-6 pb-3',
          'text-[13px] text-brand-ivory resize-none',
          'placeholder:text-transparent',
          'focus:outline-none focus:border-brand-ivory/50',
          'transition-colors duration-200',
        ].join(' ')}
      />
      <label
        htmlFor={id}
        className={[
          'absolute left-4 top-[18px]',
          'text-[11px] tracking-[0.2em] uppercase text-brand-ivory/40',
          'pointer-events-none select-none',
          'transition-all duration-200 ease-out',
          'peer-focus:top-[8px] peer-focus:text-[8.5px] peer-focus:text-brand-ivory/60 peer-focus:tracking-[0.28em]',
          'peer-[:not(:placeholder-shown)]:top-[8px]',
          'peer-[:not(:placeholder-shown)]:text-[8.5px]',
          'peer-[:not(:placeholder-shown)]:text-brand-ivory/60',
          'peer-[:not(:placeholder-shown)]:tracking-[0.28em]',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
}

interface InquiryFormProps {
  context: InquirySourceContext;
  locale: string;
}

export function InquiryForm({ context, locale }: InquiryFormProps) {
  const dict = getDictionary(locale);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const values: InquiryFormValues = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      message: formData.get('message') as string,
    };

    const submissionContext: InquirySourceContext = {
      ...context,
      pageUrl: window.location.href,
    };

    const result = await sendInquiry(values, submissionContext);

    setIsSubmitting(false);
    if (result.success) {
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setSubmitStatus('error');
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="flex min-h-[220px] flex-col items-start justify-center">
        <StarOrnament size={22} className="mb-4 opacity-80" />
        <p className="font-serif text-[0.9rem] leading-relaxed text-brand-ivory/80">
          {dict.form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[6px] w-full">
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-2 gap-[6px]">
        <FloatingField
          id="inquiry-fullName"
          name="fullName"
          label={dict.form.fullName}
          required
          minLength={2}
          autoComplete="name"
        />
        <FloatingField
          id="inquiry-email"
          name="email"
          label={dict.form.email}
          type="email"
          required
          autoComplete="email"
        />
      </div>

      {/* Row 2: Phone */}
      <FloatingField
        id="inquiry-phone"
        name="phoneNumber"
        label={dict.form.phoneNumber}
        type="tel"
        autoComplete="tel"
      />

      {/* Row 3: Message */}
      <FloatingTextarea
        id="inquiry-message"
        name="message"
        label={dict.form.message}
        required
        minLength={10}
        rows={4}
      />

      {submitStatus === 'error' && (
        <p className="text-[10px] tracking-wider text-brand-red mt-1">
          {dict.form.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center gap-3 bg-brand-red py-4 text-[11px] uppercase tracking-[0.3em] text-brand-ivory transition-colors hover:bg-brand-red/85 disabled:opacity-50"
      >
        {isSubmitting ? '…' : (
          <>
            <span>{dict.form.send}</span>
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}

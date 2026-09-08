'use client';

import { useState } from 'react';
import { getDictionary } from '@/i18n/dictionaries';
import { getSiteContent } from '@/content/site';
import { sendInquiry } from '@/actions/send-inquiry';
import type { InquirySourceContext, InquiryFormValues } from '@/types';

interface ContactFormProps {
  locale: string;
  context: InquirySourceContext;
}

/*
  FloatingField — elegant floating-label input field.

  Behaviour:
  - Label sits centred inside the field border as a placeholder.
  - When focused OR when the field has a value (detected via
    :not(:placeholder-shown) on a dummy space placeholder), the
    label animates up to the top-left edge of the border.
  - Implemented with pure CSS — no JS state.

  Technique:
  - The <input> has `placeholder=" "` (a single space). This means
    `:placeholder-shown` is true when empty and false when typed in.
  - Label is absolutely positioned sibling, controlled via
    peer-placeholder-shown and peer-focus Tailwind variants.
  - Works in all modern browsers.
*/
function FloatingField({
  id,
  name,
  label,
  type = 'text',
  required = false,
  minLength,
  inputMode,
  autoComplete,
  className = '',
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder=" "
        className={[
          'peer min-h-[92px] w-full border border-brand-ivory/25 bg-transparent px-5 pt-[38px] pb-3',
          'font-serif !text-[clamp(1rem,1.15vw,1.25rem)] leading-[1.2] tracking-[0.01em] text-brand-ivory',
          'placeholder:text-transparent', // hides the space placeholder visually
          'focus:outline-none focus:border-brand-ivory/50',
          'transition-colors duration-200',
        ].join(' ')}
      />
      <label
        htmlFor={id}
        className={[
          // Base position — centred vertically inside the field
          'absolute left-5 top-[50%] -translate-y-1/2',
          'text-[11px] tracking-[0.2em] uppercase text-brand-ivory/40',
          'pointer-events-none select-none',
          'transition-all duration-200 ease-out',
          // When field is focused OR has content → move label to top edge
          'peer-focus:top-[13px] peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:text-brand-ivory/60 peer-focus:tracking-[0.28em]',
          'peer-[:not(:placeholder-shown)]:top-[13px] peer-[:not(:placeholder-shown)]:translate-y-0',
          'peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-brand-ivory/60',
          'peer-[:not(:placeholder-shown)]:tracking-[0.28em]',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
}

/*
  FloatingTextarea — same concept for <textarea>.
  Label starts at the top-left and stays there (textareas don't have
  a meaningful "centred" position). It dims down when empty/unfocused.
*/
function FloatingTextarea({
  id,
  name,
  label,
  required = false,
  minLength,
  rows = 4,
  className = '',
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <textarea
        id={id}
        name={name}
        required={required}
        minLength={minLength}
        rows={rows}
        placeholder=" "
        className={[
          'peer min-h-[170px] w-full resize-none border border-brand-ivory/25 bg-transparent px-5 pt-[38px] pb-4',
          'font-serif !text-[clamp(1rem,1.15vw,1.25rem)] leading-[1.35] tracking-[0.01em] text-brand-ivory',
          'placeholder:text-transparent',
          'focus:outline-none focus:border-brand-ivory/50',
          'transition-colors duration-200',
        ].join(' ')}
      />
      <label
        htmlFor={id}
        className={[
          'absolute left-5 top-[13px]',
          'text-[11px] tracking-[0.2em] uppercase text-brand-ivory/40',
          'pointer-events-none select-none',
          'transition-all duration-200 ease-out',
          // Shrink label when focused or has content
          'peer-focus:top-[13px] peer-focus:text-[9px] peer-focus:text-brand-ivory/60 peer-focus:tracking-[0.28em]',
          'peer-[:not(:placeholder-shown)]:top-[13px]',
          'peer-[:not(:placeholder-shown)]:text-[9px]',
          'peer-[:not(:placeholder-shown)]:text-brand-ivory/60',
          'peer-[:not(:placeholder-shown)]:tracking-[0.28em]',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
}

export function ContactForm({ locale, context }: ContactFormProps) {
  const dict = getDictionary(locale);
  const site = getSiteContent(locale);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

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
    } as InquirySourceContext;

    const result = await sendInquiry(values, submissionContext);

    setIsSubmitting(false);
    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[300px] flex-col items-start justify-center">
        <p className="font-serif text-base leading-relaxed text-brand-ivory/80">
          {dict.form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[6px] w-full">
      {/* Row 1: Name + Email side by side */}
      <div className="grid grid-cols-1 gap-[6px] sm:grid-cols-2">
        <FloatingField
          id="contact-fullName"
          name="fullName"
          label={dict.form.fullName}
          required
          minLength={2}
          autoComplete="name"
        />
        <FloatingField
          id="contact-email"
          name="email"
          label={dict.form.email}
          type="email"
          required
          autoComplete="email"
        />
      </div>

      {/* Row 2: Phone (full width) */}
      <FloatingField
        id="contact-phone"
        name="phoneNumber"
        label={dict.form.phoneNumber}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />

      {/* Row 3: Message */}
      <FloatingTextarea
        id="contact-message"
        name="message"
        label={dict.form.message}
        required
        minLength={10}
        rows={3}
      />

      {/* Error state */}
      {status === 'error' && (
        <p className="text-[10px] tracking-wider text-brand-red">{dict.form.error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 flex w-full items-center justify-center gap-4 bg-brand-red py-3 text-[11px] uppercase tracking-[0.3em] text-brand-ivory transition-colors hover:bg-brand-red/85 disabled:opacity-50"
      >
        {isSubmitting ? '…' : (
          <>
            <span>{site.contact.formSubmit}</span>
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}

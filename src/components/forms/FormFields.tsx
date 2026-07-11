import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, name, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? name ?? generatedId;

    return (
      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor={fieldId} className="text-xs uppercase tracking-widest text-brand-ivory/80">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          name={name}
          className={`bg-transparent border-b border-brand-ivory/20 py-2 text-brand-ivory focus:outline-none focus:border-brand-ivory transition-colors placeholder:text-brand-ivory/20 ${className}`}
          {...props}
        />
        {error && <span className="text-brand-red text-xs mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, name, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? name ?? generatedId;

    return (
      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor={fieldId} className="text-xs uppercase tracking-widest text-brand-ivory/80">
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          name={name}
          className={`bg-transparent border-b border-brand-ivory/20 py-2 text-brand-ivory focus:outline-none focus:border-brand-ivory transition-colors placeholder:text-brand-ivory/20 resize-none min-h-[100px] ${className}`}
          {...props}
        />
        {error && <span className="text-brand-red text-xs mt-1">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

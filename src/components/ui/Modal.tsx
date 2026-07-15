'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-black/92 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[540px] mx-4 bg-brand-black border border-brand-ivory/[0.12] shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-y-auto max-h-[92dvh]">
        {/* Top decorative line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

        {/* Close button — top right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[14px] text-brand-ivory/55 hover:text-brand-ivory transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
        >
          ✕
        </button>

        {/* Content */}
        <div className="px-8 py-8 md:px-10 md:py-9">
          {children}
        </div>

        {/* Bottom decorative line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      </div>
    </div>
  );
}

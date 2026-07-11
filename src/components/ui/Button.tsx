import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase transition-all duration-300 ease-in-out font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-red text-brand-ivory px-8 py-4 hover:bg-brand-red/80 shadow-[0_0_15px_rgba(139,0,0,0.3)] hover:shadow-[0_0_25px_rgba(139,0,0,0.5)]",
    secondary: "bg-transparent border border-brand-ivory text-brand-ivory px-8 py-4 hover:bg-brand-ivory hover:text-brand-black",
    ghost: "bg-transparent text-brand-ivory/70 hover:text-brand-ivory underline underline-offset-4 decoration-brand-ivory/30 hover:decoration-brand-ivory"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

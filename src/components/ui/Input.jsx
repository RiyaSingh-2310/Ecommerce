import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`input-field h-11 w-full rounded-xl px-4 text-sm transition-all ${className}`}
      {...props}
    />
  );
});

export default Input;

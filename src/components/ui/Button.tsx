import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-ganga-500 text-white hover:bg-ganga-600 active:bg-ganga-700 shadow-subtle border border-ganga-600',
    secondary: 'bg-skywater-100 text-skywater-800 hover:bg-skywater-200 active:bg-skywater-300 border border-skywater-200',
    outline: 'bg-white text-ink-700 hover:bg-ink-50 active:bg-ink-100 border border-ink-100 hover:border-ink-200',
    ghost: 'bg-transparent text-ink-700 hover:bg-ink-50 active:bg-ink-100 border border-transparent',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs font-medium rounded-lg gap-1.5',
    md: 'px-3.5 py-1.5 text-sm font-medium rounded-lg gap-2',
    lg: 'px-5 py-2.5 text-base font-medium rounded-xl gap-2.5'
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-sans transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ganga-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
};

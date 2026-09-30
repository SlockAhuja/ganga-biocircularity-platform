import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'demo';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  icon,
  className = ''
}) => {
  const variantStyles = {
    primary: 'bg-ganga-100 text-ganga-700 border-ganga-200',
    secondary: 'bg-skywater-100 text-skywater-700 border-skywater-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-ink-50 text-ink-700 border-ink-100',
    demo: 'bg-amber-50 text-amber-800 border-amber-300 font-mono font-medium'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    md: 'px-2.5 py-1 text-xs font-medium rounded-lg'
  };

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 border leading-tight transition-colors",
      variantStyles[variant],
      sizeStyles[size],
      className
    )}>
      {icon}
      {children}
    </span>
  );
};

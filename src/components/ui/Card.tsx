import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  ...props 
}) => {
  return (
    <div 
      className={clsx(
        "bg-white border border-ink-100 rounded-xl shadow-subtle p-5 transition-all duration-200",
        hoverEffect && "hover:shadow-card hover:border-ganga-200 transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  action?: React.ReactNode; 
  badge?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, badge, className = '' }) => {
  return (
    <div className={clsx("flex items-start justify-between mb-4 pb-3 border-b border-ink-50", className)}>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-ink-900 text-base tracking-tight">{title}</h3>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs text-ink-500 font-normal mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

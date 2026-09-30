import React from 'react';
import clsx from 'clsx';
import { StatusTag } from '../ui/StatusTag';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  badge,
  actions,
  children,
  className = ''
}) => {
  return (
    <div className={clsx("p-6 lg:p-8 space-y-6 max-w-7xl mx-auto", className)}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-ink-100">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
              {title}
            </h2>
            {badge || <StatusTag type="demo" />}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-ink-500 font-normal mt-1 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {/* Page Body Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

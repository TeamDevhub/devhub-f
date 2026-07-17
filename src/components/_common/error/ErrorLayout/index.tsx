import type { ReactNode } from 'react';

interface ErrorLayoutProps {
  children: ReactNode;
}

export default function ErrorLayout({ children }: ErrorLayoutProps) {
  return (
    <div className="error-page-layout flex-center w-100">
      {children}
    </div>
  );
}

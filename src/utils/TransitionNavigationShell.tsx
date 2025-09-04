import React, { MouseEvent, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

export function TransitionNavigationShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement | null;
    const a = el?.closest('a');
    const href = a?.getAttribute('href');
    if (!a || !href) return;

    if (href.startsWith('/search')) {
      e.preventDefault();
      startTransition(() => navigate(href));
    }
  };

  return <div onClickCapture={onClickCapture}>{children}</div>;
}

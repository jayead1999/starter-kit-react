import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    label: string;
    icon: ReactNode;
    className?: string;
};

export function SocialButton({ label, icon, className }: Props) {
    return (
        <button
            type="button"
            className={cn(
                'flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                className,
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

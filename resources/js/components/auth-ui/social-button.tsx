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
                'flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900',
                className,
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

import type { InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    icon: LucideIcon;
};

export function Input({ className, icon: Icon, ...props }: Props) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Icon className="size-4" />
            </div>
            <input
                {...props}
                className={cn(
                    'h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-4 pl-11 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100',
                    className,
                )}
            />
        </div>
    );
}

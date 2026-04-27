import type { InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    icon: LucideIcon;
};

export function Input({ className, icon: Icon, ...props }: Props) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                <Icon className="size-4" />
            </div>
            <input
                {...props}
                className={cn(
                    'h-11 w-full rounded-xl border border-input bg-input pr-4 pl-11 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/30',
                    className,
                )}
            />
        </div>
    );
}

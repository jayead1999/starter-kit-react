import { Eye, EyeOff, Lock } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function PasswordInput({ className, ...props }: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                <Lock className="size-4" />
            </div>
            <input
                {...props}
                type={visible ? 'text' : 'password'}
                className={cn(
                    'h-11 w-full rounded-xl border border-input bg-input pr-12 pl-11 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/30',
                    className,
                )}
            />
            <button
                type="button"
                onClick={() => setVisible((current) => !current)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-foreground"
                aria-label={visible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
            >
                {visible ? (
                    <EyeOff className="size-4" />
                ) : (
                    <Eye className="size-4" />
                )}
            </button>
        </div>
    );
}

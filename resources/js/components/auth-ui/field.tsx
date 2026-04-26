import type { ReactNode } from 'react';
import InputError from '@/components/input-error';

type Props = {
    htmlFor: string;
    label: string;
    action?: ReactNode;
    error?: string;
    children: ReactNode;
};

export function Field({ htmlFor, label, action, error, children }: Props) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
                <label
                    htmlFor={htmlFor}
                    className="text-sm font-medium text-slate-600"
                >
                    {label}
                </label>
                {action}
            </div>
            {children}
            <InputError message={error} className="text-xs" />
        </div>
    );
}

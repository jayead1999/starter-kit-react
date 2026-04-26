import { ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

type Props = {
    label: string;
    processing?: boolean;
    tabIndex?: number;
    testId?: string;
};

export function SubmitButton({
    label,
    processing = false,
    tabIndex,
    testId,
}: Props) {
    return (
        <Button
            type="submit"
            disabled={processing}
            tabIndex={tabIndex}
            data-test={testId}
            className="h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-950/15 transition hover:bg-blue-700"
        >
            {processing && <Spinner />}
            <span>{label}</span>
            {!processing && <ArrowRight className="size-4" />}
        </Button>
    );
}

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
            className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
            {processing && <Spinner />}
            <span>{label}</span>
            {!processing && <ArrowRight className="size-4" />}
        </Button>
    );
}

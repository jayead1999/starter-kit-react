import { Form, Head } from '@inertiajs/react';
import { MailCheck } from 'lucide-react';
import TextLink from '@/components/text-link';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            <div className="space-y-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <MailCheck className="size-7" />
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Please verify your email address by clicking the link we
                    sent to your inbox.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        A new verification link has been sent successfully.
                    </div>
                )}

                <Form {...send.form()} className="space-y-4">
                    {({ processing }) => (
                        <>
                            <SubmitButton
                                label="Resend Verification Email"
                                processing={processing}
                            />

                            <TextLink
                                href={logout()}
                                className="block font-semibold text-blue-600 no-underline hover:text-blue-700"
                            >
                                Log out
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Enterprise Starter',
    description: 'Verify your email address to activate your workspace access.',
};

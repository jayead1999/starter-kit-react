import { Form, Head } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Field } from '@/components/auth-ui/field';
import { Input } from '@/components/auth-ui/input';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import TextLink from '@/components/text-link';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            <div className="space-y-6">
                {status && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {status}
                    </div>
                )}

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Enter your email address and we&apos;ll send you a secure
                    password reset link.
                </div>

                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <div className="space-y-5">
                            <Field
                                htmlFor="email"
                                label="Email Address"
                                error={errors.email}
                            >
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    placeholder="name@company.com"
                                    icon={Mail}
                                />
                            </Field>

                            <SubmitButton
                                label="Email Password Reset Link"
                                processing={processing}
                                testId="email-password-reset-link-button"
                            />
                        </div>
                    )}
                </Form>

                <div className="text-center text-sm text-slate-500">
                    Return to{' '}
                    <TextLink
                        href={login()}
                        className="font-semibold text-blue-600 no-underline hover:text-blue-700"
                    >
                        log in
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Enterprise Starter',
    description: 'Recover access to your professional workspace.',
};

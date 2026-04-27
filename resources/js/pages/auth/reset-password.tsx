import { Form, Head } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Field } from '@/components/auth-ui/field';
import { Input } from '@/components/auth-ui/input';
import { PasswordInput } from '@/components/auth-ui/password-input';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
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
                                value={email}
                                readOnly
                                icon={Mail}
                                className="cursor-not-allowed bg-muted text-muted-foreground"
                            />
                        </Field>

                        <Field
                            htmlFor="password"
                            label="New Password"
                            error={errors.password}
                        >
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="Create a new password"
                            />
                        </Field>

                        <Field
                            htmlFor="password_confirmation"
                            label="Confirm Password"
                            error={errors.password_confirmation}
                        >
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Confirm your new password"
                            />
                        </Field>

                        <SubmitButton
                            label="Reset Password"
                            processing={processing}
                            testId="reset-password-button"
                        />
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Enterprise Starter',
    description: 'Set a fresh password for your workspace account.',
};

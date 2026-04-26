import { Form, Head } from '@inertiajs/react';
import { Field } from '@/components/auth-ui/field';
import { PasswordInput } from '@/components/auth-ui/password-input';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-5">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                            This is a secure area. Please confirm your password
                            before continuing.
                        </div>

                        <Field
                            htmlFor="password"
                            label="Password"
                            error={errors.password}
                        >
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                autoFocus
                            />
                        </Field>

                        <SubmitButton
                            label="Confirm Password"
                            processing={processing}
                            testId="confirm-password-button"
                        />
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Enterprise Starter',
    description: 'Confirm your password to continue securely.',
};

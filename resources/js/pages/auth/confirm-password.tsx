import { Form, Head } from '@inertiajs/react';
import { LockKeyhole } from 'lucide-react';
import { Field } from '@/components/auth-ui/field';
import { PasswordInput } from '@/components/auth-ui/password-input';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import { SettingsPageShell } from '@/components/settings-page-shell';
import { store } from '@/routes/password/confirm';
import { edit as editSecurity } from '@/routes/security';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <SettingsPageShell
                title="Security"
                description="Confirm your password before managing password changes, two-factor authentication, and recovery access."
                activeHref={editSecurity()}
                aside={
                    <div className="rounded-lg border border-border bg-muted p-4">
                        <p className="text-sm font-semibold text-foreground">
                            Secure area
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Password confirmation helps protect sensitive
                            account settings when your session is already
                            signed in.
                        </p>
                    </div>
                }
            >
                <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <LockKeyhole className="size-5" />
                        </span>
                        <div className="max-w-2xl space-y-2">
                            <h2 className="text-lg font-semibold text-foreground">
                                Confirm password
                            </h2>
                            <p className="text-sm leading-6 text-muted-foreground">
                                Re-enter your password before continuing to
                                security settings.
                            </p>
                        </div>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="mt-6 max-w-xl"
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-5">
                                <div className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                                    This is a secure area. Please confirm your
                                    password before continuing.
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
                                    label="Confirm password"
                                    processing={processing}
                                    testId="confirm-password-button"
                                />
                            </div>
                        )}
                    </Form>
                </section>
            </SettingsPageShell>
        </>
    );
}

ConfirmPassword.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: editSecurity(),
        },
    ],
};


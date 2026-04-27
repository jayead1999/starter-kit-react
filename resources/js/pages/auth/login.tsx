import { Form, Head } from '@inertiajs/react';
import { Building2, Chrome, Mail } from 'lucide-react';
import { Checkbox } from '@/components/auth-ui/checkbox';
import { Divider } from '@/components/auth-ui/divider';
import { Field } from '@/components/auth-ui/field';
import { Input } from '@/components/auth-ui/input';
import { PasswordInput } from '@/components/auth-ui/password-input';
import { SocialButton } from '@/components/auth-ui/social-button';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import TextLink from '@/components/text-link';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {status && (
                            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                                {status}
                            </div>
                        )}

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
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="name@company.com"
                                    icon={Mail}
                                />
                            </Field>

                            <Field
                                htmlFor="password"
                                label="Password"
                                error={errors.password}
                                action={
                                    canResetPassword ? (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-medium text-primary no-underline hover:text-primary/80"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    ) : null
                                }
                            >
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                />
                            </Field>

                            <Checkbox
                                id="remember"
                                name="remember"
                                label="Keep me signed in"
                                tabIndex={3}
                            />

                            <SubmitButton
                                label="Sign In"
                                processing={processing}
                                tabIndex={4}
                                testId="login-button"
                            />

                            <Divider label="Or continue with" />

                            <div className="grid grid-cols-2 gap-3">
                                <SocialButton
                                    label="Google"
                                    icon={<Chrome className="size-4" />}
                                />
                                <SocialButton
                                    label="SSO"
                                    icon={<Building2 className="size-4" />}
                                />
                            </div>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                Don&apos;t have an account?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-semibold text-primary no-underline hover:text-primary/80"
                                >
                                    Request access
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Enterprise Starter',
    description: 'Sign in to your professional workspace',
};

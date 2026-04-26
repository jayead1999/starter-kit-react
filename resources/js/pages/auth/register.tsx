import { Form, Head } from '@inertiajs/react';
import { Building2, Chrome, Mail, User } from 'lucide-react';
import { Divider } from '@/components/auth-ui/divider';
import { Field } from '@/components/auth-ui/field';
import { Input } from '@/components/auth-ui/input';
import { PasswordInput } from '@/components/auth-ui/password-input';
import { SocialButton } from '@/components/auth-ui/social-button';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import TextLink from '@/components/text-link';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-5">
                            <Field
                                htmlFor="name"
                                label="Full Name"
                                error={errors.name}
                            >
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    icon={User}
                                />
                            </Field>

                            <Field
                                htmlFor="email"
                                label="Email Address"
                                error={errors.email}
                            >
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    icon={Mail}
                                />
                            </Field>

                            <Field
                                htmlFor="password"
                                label="Password"
                                error={errors.password}
                            >
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Create a password"
                                />
                            </Field>

                            <Field
                                htmlFor="password_confirmation"
                                label="Confirm Password"
                                error={errors.password_confirmation}
                            >
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                />
                            </Field>

                            <SubmitButton
                                label="Create Account"
                                processing={processing}
                                tabIndex={5}
                                testId="register-user-button"
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

                        <div className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-semibold text-blue-600 no-underline hover:text-blue-700"
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Enterprise Starter',
    description: 'Create your professional workspace account',
};

import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { KeyRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Field } from '@/components/auth-ui/field';
import { Input } from '@/components/auth-ui/input';
import { SubmitButton } from '@/components/auth-ui/submit-button';
import TextLink from '@/components/text-link';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');

    const authConfigContent = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Enterprise Starter',
                description:
                    'Enter one of your recovery codes to regain access securely.',
                toggleText: 'Use an authentication code instead',
            };
        }

        return {
            title: 'Enterprise Starter',
            description:
                'Enter the authentication code from your authenticator app.',
            toggleText: 'Use a recovery code instead',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void) => {
        setShowRecoveryInput((current) => !current);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor authentication" />

            <Form
                {...store.form()}
                className="space-y-5"
                resetOnError
                resetOnSuccess={!showRecoveryInput}
            >
                {({ errors, processing, clearErrors }) => (
                    <>
                        <div className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                            {showRecoveryInput
                                ? 'Use one of your saved recovery codes to access your workspace.'
                                : 'Use your authenticator app to complete the secure sign-in flow.'}
                        </div>

                        {showRecoveryInput ? (
                            <Field
                                htmlFor="recovery_code"
                                label="Recovery Code"
                                error={errors.recovery_code}
                            >
                                <Input
                                    id="recovery_code"
                                    name="recovery_code"
                                    type="text"
                                    placeholder="Enter recovery code"
                                    autoFocus={showRecoveryInput}
                                    required
                                    icon={KeyRound}
                                />
                            </Field>
                        ) : (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-muted-foreground">
                                    Authentication Code
                                </label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={(value) => setCode(value)}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                    >
                                        <InputOTPGroup className="gap-2">
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className="h-11 w-10 rounded-xl border border-input bg-input text-sm text-foreground"
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <InputError
                                    message={errors.code}
                                    className="text-center text-xs"
                                />
                            </div>
                        )}

                        <SubmitButton
                            label="Continue"
                            processing={processing}
                        />

                        <div className="text-center text-sm text-muted-foreground">
                            <TextLink
                                href="#"
                                as="button"
                                type="button"
                                className="font-semibold text-primary no-underline hover:text-primary/80"
                                onClick={() => toggleRecoveryMode(clearErrors)}
                            >
                                {authConfigContent.toggleText}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

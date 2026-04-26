import { Form, Head } from '@inertiajs/react';
import { KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { SettingsPageShell } from '@/components/settings-page-shell';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { edit } from '@/routes/security';
import { disable, enable } from '@/routes/two-factor';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

export default function Security({
    canManageTwoFactor = false,
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    return (
        <>
            <Head title="Security settings" />

            <SettingsPageShell
                title="Security"
                description="Manage password changes, two-factor authentication, and recovery access."
                aside={
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-900">
                            Protection status
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                <ShieldCheck className="size-4" />
                            </span>
                            <div>
                                <p className="text-sm font-medium text-slate-900">
                                    {twoFactorEnabled
                                        ? '2FA enabled'
                                        : 'Password only'}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {twoFactorEnabled
                                        ? 'Extra sign-in protection is active.'
                                        : 'Enable 2FA for stronger access control.'}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            >
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <LockKeyhole className="size-5" />
                        </span>
                        <div className="max-w-2xl space-y-2">
                            <h2 className="text-lg font-semibold text-slate-950">
                                Update password
                            </h2>
                            <p className="text-sm leading-6 text-slate-500">
                                Use a long, unique password that is not shared
                                with other services.
                            </p>
                        </div>
                    </div>

                    <Form
                        {...SecurityController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus();
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus();
                            }
                        }}
                        className="mt-6 grid gap-5 md:grid-cols-2"
                    >
                        {({ errors, processing }) => (
                            <>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="current_password">
                                        Current password
                                    </Label>

                                    <PasswordInput
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        autoComplete="current-password"
                                        placeholder="Current password"
                                    />

                                    <InputError
                                        message={errors.current_password}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        New password
                                    </Label>

                                    <PasswordInput
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="New password"
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm password
                                    </Label>

                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex items-center md:col-span-2">
                                    <Button
                                        disabled={processing}
                                        data-test="update-password-button"
                                    >
                                        Save password
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </section>

                {canManageTwoFactor && (
                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                <KeyRound className="size-5" />
                            </span>
                            <div className="max-w-2xl space-y-2">
                                <h2 className="text-lg font-semibold text-slate-950">
                                    Two-factor authentication
                                </h2>
                                <p className="text-sm leading-6 text-slate-500">
                                    Add a time-based authentication code to your
                                    sign-in flow.
                                </p>
                            </div>
                        </div>

                        {twoFactorEnabled ? (
                            <div className="mt-6 flex flex-col items-start justify-start space-y-4">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                                    Two-factor authentication is enabled. You
                                    will be prompted for an authentication code
                                    during login.
                                </div>

                                <Form {...disable.form()}>
                                    {({ processing }) => (
                                        <Button
                                            variant="destructive"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Disable 2FA
                                        </Button>
                                    )}
                                </Form>

                                <TwoFactorRecoveryCodes
                                    recoveryCodesList={recoveryCodesList}
                                    fetchRecoveryCodes={fetchRecoveryCodes}
                                    errors={errors}
                                />
                            </div>
                        ) : (
                            <div className="mt-6 flex flex-col items-start justify-start space-y-4">
                                <p className="max-w-2xl text-sm leading-6 text-slate-500">
                                    When enabled, you will enter a secure code
                                    from your authenticator app after your
                                    password.
                                </p>

                                {hasSetupData ? (
                                    <Button
                                        onClick={() => setShowSetupModal(true)}
                                    >
                                        <ShieldCheck />
                                        Continue setup
                                    </Button>
                                ) : (
                                    <Form
                                        {...enable.form()}
                                        onSuccess={() =>
                                            setShowSetupModal(true)
                                        }
                                    >
                                        {({ processing }) => (
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                Enable 2FA
                                            </Button>
                                        )}
                                    </Form>
                                )}
                            </div>
                        )}

                        <TwoFactorSetupModal
                            isOpen={showSetupModal}
                            onClose={() => setShowSetupModal(false)}
                            requiresConfirmation={requiresConfirmation}
                            twoFactorEnabled={twoFactorEnabled}
                            qrCodeSvg={qrCodeSvg}
                            manualSetupKey={manualSetupKey}
                            clearSetupData={clearSetupData}
                            fetchSetupData={fetchSetupData}
                            errors={errors}
                        />
                    </section>
                )}
            </SettingsPageShell>
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
    ],
};

import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Mail, UserRound } from 'lucide-react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { SettingsPageShell } from '@/components/settings-page-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Profile settings" />

            <SettingsPageShell
                title="Profile"
                description="Keep your identity and contact information accurate for your workspace account."
                aside={
                    <div className="rounded-lg border border-border bg-muted p-4">
                        <p className="text-sm font-semibold text-foreground">
                            Account status
                        </p>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div>
                                <dt className="text-muted-foreground">Name</dt>
                                <dd className="mt-1 font-medium text-foreground">
                                    {auth.user.name}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">
                                    Email
                                </dt>
                                <dd className="mt-1 break-all font-medium text-foreground">
                                    {auth.user.email}
                                </dd>
                            </div>
                        </dl>
                    </div>
                }
            >
                <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="max-w-2xl space-y-2">
                        <h2 className="text-lg font-semibold text-foreground">
                            Profile information
                        </h2>
                        <p className="text-sm leading-6 text-muted-foreground">
                            Update the name and email address people use to
                            identify you in the workspace.
                        </p>
                    </div>

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="mt-6 grid gap-5 md:grid-cols-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <div className="relative">
                                        <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            className="pl-10"
                                            defaultValue={auth.user.name}
                                            name="name"
                                            required
                                            autoComplete="name"
                                            placeholder="Full name"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            className="pl-10"
                                            defaultValue={auth.user.email}
                                            name="email"
                                            required
                                            autoComplete="username"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 md:col-span-2">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="font-semibold underline underline-offset-4"
                                            >
                                                Resend the verification email.
                                            </Link>
                                            {status ===
                                                'verification-link-sent' && (
                                                <p className="mt-2 font-medium text-emerald-700">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center md:col-span-2">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Save profile
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </section>

                <section className="rounded-lg border border-destructive/20 bg-card p-5 shadow-sm">
                    <DeleteUser />
                </section>
            </SettingsPageShell>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};

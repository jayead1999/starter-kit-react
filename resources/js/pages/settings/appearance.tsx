import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import { SettingsPageShell } from '@/components/settings-page-shell';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <SettingsPageShell
                title="Appearance"
                description="Choose how the workspace should look across dashboards, forms, and account pages."
                aside={
                    <div className="rounded-lg border border-border bg-muted p-4">
                        <p className="text-sm font-semibold text-foreground">
                            System mode
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            System follows the theme preference from your
                            device and updates automatically when it changes.
                        </p>
                    </div>
                }
            >
                <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="max-w-2xl space-y-2">
                        <h2 className="text-lg font-semibold text-foreground">
                            Theme preference
                        </h2>
                        <p className="text-sm leading-6 text-muted-foreground">
                            Select a light, dark, or system-matched interface
                            for your account.
                        </p>
                    </div>
                    <div className="mt-6">
                        <AppearanceTabs />
                    </div>
                </section>
            </SettingsPageShell>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
};

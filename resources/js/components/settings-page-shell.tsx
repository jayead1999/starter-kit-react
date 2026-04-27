import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { Palette, ShieldCheck, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

type SettingsNavItem = {
    title: string;
    description: string;
    href: ReturnType<typeof editProfile>;
    icon: LucideIcon;
};

const settingsNavItems: SettingsNavItem[] = [
    {
        title: 'Profile',
        description: 'Personal details',
        href: editProfile(),
        icon: UserRound,
    },
    {
        title: 'Security',
        description: 'Password and 2FA',
        href: editSecurity(),
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        description: 'Theme preference',
        href: editAppearance(),
        icon: Palette,
    },
];

type Props = {
    title: string;
    description: string;
    children: ReactNode;
    aside?: ReactNode;
    activeHref?: NonNullable<InertiaLinkProps['href']>;
};

export function SettingsPageShell({
    title,
    description,
    children,
    aside,
    activeHref,
}: Props) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const activeUrl = activeHref ? toUrl(activeHref) : undefined;

    return (
        <div className="px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <div className="flex flex-col gap-5 border-b border-border pb-6">
                    <div className="max-w-3xl space-y-2">
                        <p className="text-sm font-medium text-blue-600">
                            Settings
                        </p>
                        <h1 className="text-2xl font-semibold tracking-normal text-foreground md:text-3xl">
                            {title}
                        </h1>
                        <p className="text-sm leading-6 text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <nav
                        className="grid gap-2 sm:grid-cols-3"
                        aria-label="Settings"
                    >
                        {settingsNavItems.map((item) => {
                            const active = isCurrentOrParentUrl(
                                item.href,
                                activeUrl,
                            );

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    prefetch
                                    className={cn(
                                        'flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition hover:border-primary/30 hover:bg-primary/10',
                                        active &&
                                            'border-primary/40 bg-primary/10 text-primary',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground',
                                            active &&
                                                'bg-primary text-primary-foreground',
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold">
                                            {item.title}
                                        </span>
                                        <span className="block truncate text-xs text-muted-foreground">
                                            {item.description}
                                        </span>
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div
                    className={cn(
                        'grid gap-6',
                        aside && 'lg:grid-cols-[minmax(0,1fr)_18rem]',
                    )}
                >
                    <main className="min-w-0 space-y-6">{children}</main>
                    {aside && (
                        <aside className="space-y-4 lg:pt-1">{aside}</aside>
                    )}
                </div>
            </div>
        </div>
    );
}

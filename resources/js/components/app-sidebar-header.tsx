import { Link, usePage } from '@inertiajs/react';
import { Bell, HelpCircle, Palette, Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { avatarSrc } from '@/lib/avatar';
import { edit as editAppearance } from '@/routes/appearance';
import type { Auth, BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const getInitials = useInitials();

    return (
        <header className="sticky top-0 z-30 flex shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 py-2.5 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <SidebarTrigger className="h-10 w-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50" />
                <div className="hidden min-w-0 md:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="relative hidden max-w-xl flex-1 md:block">
                    <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search resources, team members or reports..."
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-11 text-sm text-slate-700 outline-hidden transition focus:border-blue-200 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden h-9 w-9 rounded-full text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:inline-flex"
                >
                    <Bell className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden h-9 w-9 rounded-full text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:inline-flex"
                >
                    <HelpCircle className="size-4" />
                </Button>
                <Button
                    asChild
                    variant="ghost"
                    className="hidden h-9 rounded-full px-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:inline-flex"
                >
                    <Link href={editAppearance()} prefetch>
                        <Palette className="size-4" />
                        <span className="hidden lg:inline">Appearance</span>
                    </Link>
                </Button>
                <div className="hidden h-8 w-px bg-slate-200 md:block" />
                <div className="flex items-center gap-3 rounded-xl px-1 py-1">
                    <Avatar className="size-8 rounded-full border border-slate-200">
                        <AvatarImage
                            src={avatarSrc(auth.user?.avatar)}
                            alt={auth.user?.name}
                        />
                        <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-700">
                            {getInitials(auth.user?.name ?? '')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                        <p className="text-sm font-semibold text-slate-900">
                            {auth.user?.name ?? 'Admin'}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

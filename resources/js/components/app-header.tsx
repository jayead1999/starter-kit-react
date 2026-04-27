import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    FolderKanban,
    HelpCircle,
    LayoutGrid,
    Menu,
    Palette,
    Search,
    ShieldCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { avatarSrc } from '@/lib/avatar';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { edit as editAppearance } from '@/routes/appearance';
import type { Auth, BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Resources',
        href: dashboard(),
        icon: FolderKanban,
    },
    {
        title: 'Security',
        href: dashboard(),
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: Palette,
    },
];

export function AppHeader({ breadcrumbs = [] }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const getInitials = useInitials();
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <>
            <div className="border-b border-border bg-card/95 backdrop-blur">
                <div className="mx-auto flex h-[74px] items-center px-4 md:max-w-7xl">
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-10 w-10 rounded-xl border border-border"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-72 flex-col justify-between border-r border-border bg-card p-0"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="border-b border-border px-4 py-5 text-left">
                                    <div className="flex items-center gap-3">
                                        <AppLogo />
                                    </div>
                                </SheetHeader>
                                <div className="flex h-full flex-col justify-between p-4">
                                    <div className="space-y-2">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                prefetch
                                                className={cn(
                                                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                                                    isCurrentUrl(item.href) &&
                                                        'bg-primary/10 text-primary shadow-[inset_4px_0_0_0_theme(colors.primary)]',
                                                )}
                                            >
                                                {item.icon && (
                                                    <item.icon className="h-5 w-5" />
                                                )}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="space-y-2 border-t border-border pt-4">
                                        {rightNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                prefetch
                                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                            >
                                                {item.icon && (
                                                    <item.icon className="h-5 w-5" />
                                                )}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center gap-3"
                    >
                        <AppLogo />
                    </Link>

                    <div className="ml-6 hidden h-full items-center lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-2">
                                {mainNavItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                                                isCurrentUrl(item.href) &&
                                                    'bg-primary/10 text-primary',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        <div className="relative hidden w-full max-w-md items-center lg:flex">
                            <Search className="pointer-events-none absolute left-4 size-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search resources, team members or reports..."
                                className="h-11 w-full rounded-xl border border-input bg-input pr-4 pl-11 text-sm text-foreground outline-hidden transition placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/30"
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                        >
                            <Bell className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                        >
                            <HelpCircle className="size-4" />
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="hidden h-10 rounded-xl px-3 text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                        >
                            <Link href={editAppearance()} prefetch>
                                <Palette className="size-4" />
                                <span className="hidden xl:inline">
                                    Appearance
                                </span>
                            </Link>
                        </Button>
                        <div className="hidden h-8 w-px bg-border md:block" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-auto rounded-2xl border border-border bg-muted px-2 py-1.5 hover:bg-accent"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-8 overflow-hidden rounded-full border border-border">
                                            <AvatarImage
                                                src={avatarSrc(
                                                    auth.user?.avatar,
                                                )}
                                                alt={auth.user?.name}
                                            />
                                            <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700">
                                                {getInitials(
                                                    auth.user?.name ?? '',
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden text-left md:block">
                                            <p className="text-sm font-semibold text-foreground">
                                                {auth.user?.name ?? 'Admin'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Enterprise Admin
                                            </p>
                                        </div>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-border bg-card">
                    <div className="mx-auto flex h-12 w-full items-center px-4 text-muted-foreground md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}

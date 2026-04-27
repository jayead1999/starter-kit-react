import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    sidebarFooterNavigation,
    sidebarMainNavigation
    
} from '@/config/sidebar-navigation';
import type {SidebarNavItem} from '@/config/sidebar-navigation';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes';

function isLogoutItem(item: SidebarNavItem) {
    return item.href === logout().url;
}

function SidebarNavSection({
    items,
    collapsed,
}: {
    items: SidebarNavItem[];
    collapsed: boolean;
}) {
    const { isCurrentUrl } = useCurrentUrl();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
        () =>
            Object.fromEntries(
                items
                    .filter((item) => item.children?.length)
                    .map((item) => [
                        item.title,
                        item.children?.some((child) =>
                            isCurrentUrl(child.href),
                        ) ?? false,
                    ]),
            ),
    );

    const toggleGroup = (title: string) => {
        setOpenGroups((current) => ({
            ...current,
            [title]: !current[title],
        }));
    };

    return (
        <div className="space-y-1">
            {items.map((item) => {
                const itemActive = item.href ? isCurrentUrl(item.href) : false;
                const childActive = item.children?.some((child) =>
                    isCurrentUrl(child.href),
                );
                const active = itemActive || childActive;
                const isOpen = openGroups[item.title] ?? childActive ?? false;
                const Icon = item.icon;

                if (item.children?.length) {
                    return (
                        <div key={item.title} className="pl-1">
                            <div
                                className={cn(
                                    'border-l-[3px] border-transparent',
                                    active && 'border-l-blue-600',
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(item.title)}
                                    className={cn(
                                        'flex h-11 w-full items-center gap-3 px-4 text-left text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                        active &&
                                            'bg-primary/10 text-primary',
                                        collapsed && 'justify-center px-2',
                                    )}
                                >
                                    <Icon className="size-4 shrink-0" />
                                    {!collapsed && (
                                        <>
                                            <span className="truncate text-[13px] font-medium">
                                                {item.title}
                                            </span>
                                            <ChevronDown
                                                className={cn(
                                                    'ml-auto size-3.5 shrink-0 transition-transform',
                                                    isOpen && 'rotate-180',
                                                )}
                                            />
                                        </>
                                    )}
                                </button>

                                {!collapsed && isOpen && (
                                    <div className="bg-sidebar py-1 pr-2 pl-9">
                                        {item.children.map((child) => {
                                            const ChildIcon = child.icon;
                                            const current = isCurrentUrl(
                                                child.href,
                                            );

                                            return (
                                                <Link
                                                    key={child.title}
                                                    href={child.href}
                                                    prefetch
                                                    className={cn(
                                                        'flex h-8 items-center rounded-md px-3 text-[12px] font-medium text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                                        current &&
                                                            'bg-primary/10 text-primary',
                                                    )}
                                                >
                                                    {ChildIcon && (
                                                        <ChildIcon className="mr-2 size-3.5 shrink-0" />
                                                    )}
                                                    {child.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={item.title} className="pl-1">
                        <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={{ children: item.title }}
                            className={cn(
                                'h-11 rounded-none border-l-[3px] border-transparent px-4 text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                active &&
                                    'border-l-primary bg-primary/10 text-primary',
                                collapsed &&
                                    'justify-center border-l-0 px-0 group-data-[collapsible=icon]:px-2',
                            )}
                        >
                            {isLogoutItem(item) ? (
                                <Link
                                    href={item.href ?? '#'}
                                    method={logout().method}
                                    as="button"
                                    className="flex w-full items-center gap-3"
                                >
                                    <Icon className="size-4 shrink-0" />
                                    <span className="truncate text-[13px] font-medium">
                                        {item.title}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    href={item.href ?? '#'}
                                    prefetch
                                    className="flex w-full items-center gap-3"
                                >
                                    <Icon className="size-4 shrink-0" />
                                    <span className="truncate text-[13px] font-medium">
                                        {item.title}
                                    </span>
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </div>
                );
            })}
        </div>
    );
}

export function AppSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r border-sidebar-border bg-sidebar"
        >
            <SidebarHeader className="bg-sidebar px-3 py-4">
                <SidebarMenuButton
                    size="lg"
                    asChild
                    className="h-auto rounded-xl bg-sidebar px-2 py-2 hover:bg-sidebar-accent"
                >
                    <Link
                        href={dashboard().url}
                        prefetch
                        className="flex items-center gap-3"
                    >
                        <AppLogo />
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>

            <SidebarContent className="bg-sidebar px-0 py-2">
                <SidebarNavSection
                    items={sidebarMainNavigation}
                    collapsed={isCollapsed}
                />
            </SidebarContent>

            <SidebarFooter className="mt-auto bg-sidebar px-0 py-3">
                <SidebarNavSection
                    items={sidebarFooterNavigation}
                    collapsed={isCollapsed}
                />
            </SidebarFooter>
        </Sidebar>
    );
}

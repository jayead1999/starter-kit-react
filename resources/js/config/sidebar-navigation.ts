import type { LucideIcon } from 'lucide-react';
import { BadgeHelp, LayoutGrid, LogOut, Settings, Users } from 'lucide-react';
import { dashboard, logout } from '@/routes';
import profile from '@/routes/profile';
import security from '@/routes/security';
import appearance from '@/routes/appearance';


export type SidebarNavChild = {
    title: string;
    href: string;
    icon?: LucideIcon;
};

export type SidebarNavItem = {
    title: string;
    href?: string;
    icon: LucideIcon;
    children?: SidebarNavChild[];
};

export const sidebarMainNavigation: SidebarNavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Settings',
        icon: Settings,
        children: [
            {
                title: 'Profile',
                href: profile.edit().url,
                icon: Users,
            },
            {
                title: 'Security',
                href: security.edit().url,
                icon: Settings,
            },
            {
                title: 'Appearances',
                href: appearance.edit().url,
                icon: Settings,
            },
        ],
    },
];

export const sidebarFooterNavigation: SidebarNavItem[] = [
    {
        title: 'Help Center',
        href: dashboard().url,
        icon: BadgeHelp,
    },
    {
        title: 'Logout',
        href: logout().url,
        icon: LogOut,
    },
];

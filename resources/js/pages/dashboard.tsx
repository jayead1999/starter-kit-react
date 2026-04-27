import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    CircleDollarSign,
    Plus,
    ShieldAlert,
    Users,
    Zap,
} from 'lucide-react';
import { useMemo } from 'react';
import ActionsDropdown from '@/components/ActionsDropdown';
import DataTable from '@/components/DataTable';
import type {DataTableColumn} from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { createStatusColumn } from '@/utils/tableUtils';

const stats = [
    {
        label: 'Total Users',
        value: '12,450',
        meta: '+12%',
        tone: 'blue',
        icon: Users,
    },
    {
        label: 'Active Now',
        value: '1,200',
        meta: 'Live sessions',
        tone: 'emerald',
        icon: Zap,
    },
    {
        label: 'Pending Requests',
        value: '45',
        meta: 'High priority',
        tone: 'amber',
        icon: ShieldAlert,
    },
    {
        label: 'Revenue',
        value: '$12,500',
        meta: '+8.4%',
        tone: 'violet',
        icon: CircleDollarSign,
    },
];

type DashboardUser = Record<string, unknown> & {
    id: number;
    name: string;
    initials: string;
    email: string;
    role: string;
    status: 'Active' | 'Pending' | 'Inactive';
    lastLogin: string;
    initialsClass: string;
};

const rows: DashboardUser[] = [
    {
        id: 1,
        name: 'John Doe',
        initials: 'JD',
        email: 'john.doe@enterprise.com',
        role: 'Administrator',
        status: 'Active',
        lastLogin: '2 mins ago',
        initialsClass: 'bg-blue-100 text-blue-700',
    },
    {
        id: 2,
        name: 'Sarah Smith',
        initials: 'SS',
        email: 's.smith@corp.io',
        role: 'Editor',
        status: 'Pending',
        lastLogin: 'Never',
        initialsClass: 'bg-fuchsia-100 text-fuchsia-700',
    },
    {
        id: 3,
        name: 'Marcus Brown',
        initials: 'MB',
        email: 'marcus.b@agency.net',
        role: 'Viewer',
        status: 'Inactive',
        lastLogin: '3 days ago',
        initialsClass: 'bg-muted text-muted-foreground',
    },
    {
        id: 4,
        name: 'Anna Lee',
        initials: 'AL',
        email: 'anna.lee@tech.com',
        role: 'Developer',
        status: 'Active',
        lastLogin: '15 mins ago',
        initialsClass: 'bg-blue-100 text-blue-700',
    },
    {
        id: 5,
        name: 'Robert King',
        initials: 'RK',
        email: 'r.king@design.studio',
        role: 'Manager',
        status: 'Active',
        lastLogin: '1 hour ago',
        initialsClass: 'bg-pink-100 text-pink-700',
    },
];

const toneClasses: Record<string, { icon: string; meta: string }> = {
    blue: {
        icon: 'bg-blue-50 text-blue-500',
        meta: 'text-emerald-500',
    },
    emerald: {
        icon: 'bg-emerald-50 text-emerald-500',
        meta: 'text-muted-foreground',
    },
    amber: {
        icon: 'bg-amber-50 text-amber-500',
        meta: 'text-amber-500',
    },
    violet: {
        icon: 'bg-violet-50 text-violet-500',
        meta: 'text-emerald-500',
    },
};

export default function Dashboard() {
    const columns = useMemo<DataTableColumn<DashboardUser>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                cell: (row) => (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex size-8 items-center justify-center rounded-full text-[11px] font-bold ${row.initialsClass}`}
                        >
                            {row.initials}
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                            {row.name}
                        </p>
                    </div>
                ),
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            createStatusColumn<DashboardUser>('status', 'Status', {
                Active: { color: 'emerald', label: 'Active' },
                Pending: { color: 'amber', label: 'Pending' },
                Inactive: { color: 'slate', label: 'Inactive' },
            }),
            {
                accessorKey: 'lastLogin',
                header: 'Last Login',
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: (row) => (
                    <div className="flex justify-end">
                        <ActionsDropdown
                            item={row}
                            routes={{
                                view: () => '#',
                                edit: () => '#',
                            }}
                        />
                    </div>
                ),
                enableSorting: false,
                enableHiding: false,
                className: 'text-right',
            },
        ],
        [],
    );

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-full bg-background px-4 py-5 md:px-6">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
                    <section className="flex flex-col gap-4 rounded-[18px] border border-border bg-card px-4 py-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-[34px] leading-none font-semibold tracking-tight text-foreground">
                                User Management
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your enterprise team members and their
                                access levels.
                            </p>
                        </div>
                        <Button className="h-10 rounded-xl bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 size-4" />
                            Add New User
                        </Button>
                    </section>

                    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            const tone = toneClasses[stat.tone];

                            return (
                                <article
                                    key={stat.label}
                                    className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                                {stat.label}
                                            </p>
                                            <p className="mt-4 text-[22px] leading-none font-semibold text-foreground">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div
                                            className={`flex size-8 items-center justify-center rounded-lg ${tone.icon}`}
                                        >
                                            <Icon className="size-4" />
                                        </div>
                                    </div>
                                    <div
                                        className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${tone.meta}`}
                                    >
                                        {stat.meta.includes('+') && (
                                            <ArrowUpRight className="size-3.5" />
                                        )}
                                        {stat.meta}
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                        <DataTable
                            title="Team Members"
                            data={rows}
                            columns={columns}
                            totalItems={rows.length}
                            searchPlaceholder="Filter by name or email..."
                            initialPageSize={2}
                            pageSizeOptions={[2,5, 10, 25]}
                        />
                    </section>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

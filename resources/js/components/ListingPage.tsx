import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from '@/components/DataTable';
import type {DataTableColumn, SortDirection} from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

declare function route(name: string, params?: unknown): string;

type FilterValue = string | number | undefined;
type Filters = Record<string, FilterValue>;

type PaginatedData<T extends Record<string, unknown>> = {
    data: T[];
    total: number;
    current_page: number;
};

type Props<T extends Record<string, unknown>> = {
    title: string;
    data: PaginatedData<T>;
    filters?: Filters;
    currentUser?: unknown;
    resourceName: string;
    resourceRoute?: string;
    breadcrumbs?: BreadcrumbItem[];
    columns?: DataTableColumn<T>[];
    createButtonText?: string;
    createPermission?: string;
    filterConfig?: unknown;
};

function PermissionGate({
    permission,
    children,
}: {
    permission?: string;
    children: React.ReactNode;
}) {
    void permission;

    return <>{children}</>;
}

export default function ListingPage<T extends Record<string, unknown>>({
    title,
    data,
    filters = {},
    currentUser,
    resourceName,
    resourceRoute,
    breadcrumbs,
    columns = [],
    createButtonText = 'New',
    createPermission,
}: Props<T>) {
    const singularResourceName = resourceName.endsWith('s')
        ? resourceName.slice(0, -1)
        : resourceName;
    const routeBase = resourceRoute || resourceName;
    const initialPerPage = Number(filters.per_page ?? 10);

    const [searchTerm, setSearchTerm] = useState(
        String(filters.search ?? ''),
    );
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
        String(filters.search ?? ''),
    );
    const [pageSize, setPageSize] = useState(initialPerPage);
    const [sortColumn, setSortColumn] = useState(
        String(filters.sort_column ?? 'created_at'),
    );
    const [sortDirection, setSortDirection] = useState<SortDirection>(
        filters.sort_direction === 'asc' ? 'asc' : 'desc',
    );
    const [columnVisibility, setColumnVisibility] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            window.clearTimeout(handler);
        };
    }, [searchTerm]);

    const navigateWithFilters = useCallback(
        (updatedFilters: Filters) => {
            const defaults: Filters = {
                page: 1,
                per_page: 10,
                search: '',
                sort_column: 'created_at',
                sort_direction: 'desc',
            };

            const cleanedFilters = Object.fromEntries(
                Object.entries(updatedFilters).filter(
                    ([key, value]) =>
                        value !== '' &&
                        value !== undefined &&
                        value !== defaults[key],
                ),
            );

            router.visit(route(`${routeBase}.index`), {
                data: cleanedFilters,
                method: 'get',
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        },
        [routeBase],
    );

    useEffect(() => {
        if (
            debouncedSearchTerm !== String(filters.search ?? '') ||
            pageSize !== Number(filters.per_page ?? 10) ||
            sortColumn !== String(filters.sort_column ?? 'created_at') ||
            sortDirection !==
                (filters.sort_direction === 'asc' ? 'asc' : 'desc')
        ) {
            navigateWithFilters({
                search: debouncedSearchTerm,
                per_page: pageSize,
                sort_column: sortColumn,
                sort_direction: sortDirection,
                page: 1,
            });
        }
    }, [
        debouncedSearchTerm,
        filters.per_page,
        filters.search,
        filters.sort_column,
        filters.sort_direction,
        navigateWithFilters,
        pageSize,
        sortColumn,
        sortDirection,
    ]);

    const tableActions = useMemo(() => {
        if (!currentUser) {
            return null;
        }

        return (
            <PermissionGate permission={createPermission}>
                <Button asChild>
                    <Link href={route(`${routeBase}.create`)}>
                        <Plus className="h-4 w-4" />
                        {createButtonText || `New ${singularResourceName}`}
                    </Link>
                </Button>
            </PermissionGate>
        );
    }, [
        createButtonText,
        createPermission,
        currentUser,
        routeBase,
        singularResourceName,
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6 md:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <DataTable
                        title={title}
                        data={data.data}
                        columns={columns}
                        totalItems={data.total}
                        searchPlaceholder={`Search ${resourceName.toLowerCase()}...`}
                        initialPageSize={pageSize}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        onPageChange={(pageIndex) =>
                            navigateWithFilters({
                                page: pageIndex + 1,
                                per_page: pageSize,
                                search: debouncedSearchTerm,
                                sort_column: sortColumn,
                                sort_direction: sortDirection,
                            })
                        }
                        currentPage={data.current_page - 1}
                        onSearch={setSearchTerm}
                        searchValue={searchTerm}
                        onPageSizeChange={setPageSize}
                        onSortChange={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        actions={tableActions}
                        columnVisibility={columnVisibility}
                        onColumnVisibilityChange={setColumnVisibility}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

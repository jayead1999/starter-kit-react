import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import ActionsDropdown from '@/components/ActionsDropdown';
import type { DataTableColumn } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

declare function route(name: string, params?: unknown): string;

type Row = Record<string, unknown>;
type StatusConfig = Record<string, { color?: string; label?: string }>;

const badgeToneClasses: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    yellow: 'border-amber-200 bg-amber-50 text-amber-700',
    red: 'border-red-200 bg-red-50 text-red-700',
    rose: 'border-rose-200 bg-rose-50 text-rose-700',
    gray: 'border-slate-200 bg-slate-50 text-slate-700',
    slate: 'border-slate-200 bg-slate-50 text-slate-700',
};

const badgeDotClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    yellow: 'bg-amber-500',
    red: 'bg-red-500',
    rose: 'bg-rose-500',
    gray: 'bg-slate-500',
    slate: 'bg-slate-500',
};

export function createColumn<T extends Row>(
    key: keyof T & string,
    header: ReactNode | ((column: DataTableColumn<T>) => ReactNode),
    cellRenderer: ((item: T) => ReactNode) | null = null,
    canSort = true,
    additionalProps: Partial<DataTableColumn<T>> = {},
): DataTableColumn<T> {
    return {
        accessorKey: key,
        header: (column) => {
            if (typeof header === 'function') {
                return header(column);
            }

            if (canSort) {
                return (
                    <Button
                        variant="ghost"
                        className="h-auto p-0 hover:bg-transparent"
                    >
                        {header}
                    </Button>
                );
            }

            return header;
        },
        cell: cellRenderer
            ? (item) => cellRenderer(item)
            : (item) => String(item[key] ?? ''),
        enableSorting: canSort,
        ...additionalProps,
    };
}

export function createActionsColumn<T extends Row>(
    actionsRenderer: (item: T) => ReactNode,
    header = 'Actions',
): DataTableColumn<T> {
    return {
        id: 'actions',
        header,
        cell: (item) => actionsRenderer(item),
        enableSorting: false,
        enableHiding: false,
        className: 'text-right',
    };
}

export function createDateColumn<T extends Row>(
    key: keyof T & string,
    header: string,
): DataTableColumn<T> {
    return createColumn<T>(key, header, (item) => {
        const dateValue = item[key];

        if (!dateValue) {
            return <span className="text-slate-400">-</span>;
        }

        return (
            <span>
                {new Intl.DateTimeFormat(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }).format(new Date(String(dateValue)))}
            </span>
        );
    });
}

export function createStatusColumn<T extends Row>(
    key: keyof T & string,
    header: string,
    statusConfig: StatusConfig = {},
): DataTableColumn<T> {
    return createColumn<T>(key, header, (item) => {
        const status = String(item[key] ?? '');
        const config = statusConfig[status] || {
            color: 'gray',
            label: status,
        };

        const color = config.color ?? 'gray';

        return (
            <Badge
                variant="outline"
                className={cn(
                    'gap-1.5 rounded-full border-transparent px-2.5 py-0.5',
                    badgeToneClasses[color] ?? badgeToneClasses.gray,
                )}
            >
                <span
                    className={cn(
                        'size-1.5 rounded-full',
                        badgeDotClasses[color] ?? badgeDotClasses.gray,
                    )}
                />
                {config.label || status}
            </Badge>
        );
    });
}

export function createTagsColumn<T extends Row>(
    key: keyof T & string,
    header: string,
): DataTableColumn<T> {
    return createColumn<T>(
        key,
        header,
        (item) => {
            const tags = Array.isArray(item[key]) ? item[key] : [];

            return (
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => {
                        const value = tag as { id?: string | number; name?: string };

                        return (
                            <Badge
                                key={value.id ?? value.name}
                                variant="outline"
                                className="border-blue-200 bg-blue-50 text-blue-700"
                            >
                                {value.name}
                            </Badge>
                        );
                    })}
                    {tags.length === 0 && (
                        <span className="text-sm text-slate-400">
                            No {header.toLowerCase()}
                        </span>
                    )}
                </div>
            );
        },
        false,
    );
}

export function createBooleanColumn<T extends Row>(
    key: keyof T & string,
    header: string,
    booleanRenderer: ((value: boolean, item: T) => ReactNode) | null = null,
): DataTableColumn<T> {
    return createColumn<T>(key, header, (item) => {
        const value = Boolean(item[key]);

        if (booleanRenderer) {
            return booleanRenderer(value, item);
        }

        return <span>{value ? 'Yes' : 'No'}</span>;
    });
}

export const withOriginal = <T extends Row,>(
    callback: (item: T) => ReactNode,
) => {
    return (item: T) => callback(item);
};

export const column = <T extends Row,>(
    accessor: keyof T & string,
    headerOrRenderFn: ReactNode | ((item: T) => ReactNode) = null,
    renderFn: ((item: T) => ReactNode) | null = null,
) => {
    let header: ReactNode = headerOrRenderFn as ReactNode;
    let renderer = renderFn;

    if (typeof headerOrRenderFn === 'function') {
        renderer = headerOrRenderFn as (item: T) => ReactNode;
        header = null;
    }

    return createColumn<T>(
        accessor,
        header ?? capitalize(accessor),
        renderer,
    );
};

export function createSerialColumn<T extends Row>(
    header = '#',
): DataTableColumn<T> {
    return {
        id: 'serial',
        header,
        cell: (_item, index) => <span>{index + 1}</span>,
        enableSorting: false,
    };
}

export const linkColumn = <T extends Row,>(
    accessor: keyof T & string,
    header: string,
    routeName: string,
    idAccessor: keyof T & string = 'id' as keyof T & string,
    options: {
        className?: string;
        linkWrapper?: string;
        textAccessor?: keyof T & string | ((item: T) => ReactNode);
        urlParams?: (item: T) => unknown;
    } = {},
): DataTableColumn<T> => {
    const {
        className = 'font-medium text-blue-600 hover:underline',
        linkWrapper = '',
        textAccessor = accessor,
        urlParams = (item) => item[idAccessor],
    } = options;

    return {
        accessorKey: accessor,
        header,
        cell: (item) => {
            const linkText =
                typeof textAccessor === 'function'
                    ? textAccessor(item)
                    : (item[textAccessor] as ReactNode);

            return (
                <div className={linkWrapper}>
                    <Link href={route(routeName, urlParams(item))} className={className}>
                        {linkText}
                    </Link>
                </div>
            );
        },
    };
};

export function createImageColumn<T extends Row>(
    key: keyof T & string,
    header: string,
    options: {
        width?: number;
        height?: number;
        className?: string;
        defaultImage?: string;
        altTextFn?: (item: T) => string;
        imageUrlFn?: (item: T) => string;
    } = {},
): DataTableColumn<T> {
    const {
        width = 50,
        height = 50,
        className = '',
        defaultImage = '',
        altTextFn = (item) =>
            String(item.name ?? item.title ?? 'Image'),
        imageUrlFn,
    } = options;

    return createColumn<T>(
        key,
        header,
        (item) => {
            const imageUrl = imageUrlFn?.(item) ?? String(item[key] ?? defaultImage);

            if (!imageUrl) {
                return <span className="text-slate-400">-</span>;
            }

            return (
                <img
                    src={imageUrl}
                    alt={altTextFn(item)}
                    width={width}
                    height={height}
                    className={cn('rounded object-cover', className)}
                />
            );
        },
        false,
        {
            className: 'w-[60px]',
        },
    );
}

export function createPermissionActionsColumn<T extends Row & { id: string | number }>(
    routes: {
        view?: (id: T['id'], item: T) => string;
        edit?: (id: T['id'], item: T) => string;
        delete?: (id: T['id'], item: T) => string;
    },
): DataTableColumn<T> {
    return createActionsColumn<T>((item) => (
        <div className="flex justify-end">
            <ActionsDropdown item={item} routes={routes} />
        </div>
    ));
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

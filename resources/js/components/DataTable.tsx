import { ChevronDown, Download, Search, SlidersHorizontal } from 'lucide-react';
import type { ChangeEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import PaginationComponent from '@/components/PaginationComponent';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SortDirection = 'asc' | 'desc';

export type DataTableColumn<T extends Record<string, unknown>> = {
    id?: string;
    accessorKey?: keyof T & string;
    header: ReactNode | ((column: DataTableColumn<T>) => ReactNode);
    cell?: (item: T, rowIndex: number) => ReactNode;
    enableSorting?: boolean;
    enableHiding?: boolean;
    className?: string;
};

type VisibilityState = Record<string, boolean>;

type Props<T extends Record<string, unknown>> = {
    data: T[];
    columns: DataTableColumn<T>[];
    totalItems?: number;
    searchPlaceholder?: string;
    initialPageSize?: number;
    pageSizeOptions?: number[];
    onPageChange?: (pageIndex: number) => void;
    currentPage?: number;
    onSearch?: (value: string) => void;
    searchValue?: string;
    onPageSizeChange?: (pageSize: number) => void;
    onSortChange?: (column: string, direction: SortDirection) => void;
    sortColumn?: string;
    sortDirection?: SortDirection;
    onExport?: (data: T[]) => void;
    showColumnToggle?: boolean;
    title?: string;
    actions?: ReactNode;
    columnVisibility?: VisibilityState;
    onColumnVisibilityChange?: (visibility: VisibilityState) => void;
    className?: string;
};

function getColumnId<T extends Record<string, unknown>>(
    column: DataTableColumn<T>,
) {
    return column.id ?? column.accessorKey ?? '';
}

function valueToString(value: unknown) {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value);
}

export default function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    totalItems,
    searchPlaceholder = 'Search...',
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50, 100],
    onPageChange,
    currentPage = 0,
    onSearch,
    searchValue = '',
    onPageSizeChange,
    onSortChange,
    sortColumn = 'created_at',
    sortDirection = 'desc',
    onExport,
    showColumnToggle = true,
    title,
    actions,
    columnVisibility = {},
    onColumnVisibilityChange,
    className,
}: Props<T>) {
    const [globalFilter, setGlobalFilter] = useState(searchValue);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageIndex, setPageIndex] = useState(currentPage);
    const [sorting, setSorting] = useState({
        id: sortColumn,
        direction: sortDirection,
    });
    const [localColumnVisibility, setLocalColumnVisibility] =
        useState(columnVisibility);
    const isServerSide = Boolean(onPageChange);
    const effectivePageIndex = isServerSide ? currentPage : pageIndex;

    const visibleColumns = useMemo(
        () =>
            columns.filter((column) => {
                const id = getColumnId(column);

                return localColumnVisibility[id] !== false;
            }),
        [columns, localColumnVisibility],
    );

    const filteredData = useMemo(() => {
        if (isServerSide || !globalFilter.trim()) {
            return data;
        }

        const needle = globalFilter.toLowerCase();

        return data.filter((item) =>
            columns.some((column) => {
                if (!column.accessorKey) {
                    return false;
                }

                return valueToString(item[column.accessorKey])
                    .toLowerCase()
                    .includes(needle);
            }),
        );
    }, [columns, data, globalFilter, isServerSide]);

    const sortedData = useMemo(() => {
        if (isServerSide || !sorting.id) {
            return filteredData;
        }

        return [...filteredData].sort((a, b) => {
            const aValue = valueToString(a[sorting.id]);
            const bValue = valueToString(b[sorting.id]);
            const result = aValue.localeCompare(bValue, undefined, {
                numeric: true,
                sensitivity: 'base',
            });

            return sorting.direction === 'asc' ? result : -result;
        });
    }, [filteredData, isServerSide, sorting]);

    const paginatedData = useMemo(() => {
        if (isServerSide) {
            return sortedData;
        }

        const start = effectivePageIndex * pageSize;

        return sortedData.slice(start, start + pageSize);
    }, [effectivePageIndex, isServerSide, pageSize, sortedData]);

    const totalCount =
        typeof totalItems === 'number' ? totalItems : filteredData.length;
    const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
    const startIndex = effectivePageIndex * pageSize + (totalCount > 0 ? 1 : 0);
    const endIndex = Math.min((effectivePageIndex + 1) * pageSize, totalCount);
    const showPagination = totalCount > 0;

    const handlePageChange = (newPage: number) => {
        if (newPage < 0 || newPage >= pageCount) {
            return;
        }

        if (isServerSide && onPageChange) {
            onPageChange(newPage);
        } else {
            setPageIndex(newPage);
        }
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGlobalFilter(value);
        setPageIndex(0);
        onSearch?.(value);
    };

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value);
        setPageSize(newSize);
        setPageIndex(0);
        onPageSizeChange?.(newSize);

        if (isServerSide) {
            onPageChange?.(0);
        }
    };

    const handleSort = (column: DataTableColumn<T>) => {
        const id = getColumnId(column);
        const nextDirection: SortDirection =
            sorting.id === id && sorting.direction === 'asc' ? 'desc' : 'asc';

        setSorting({ id, direction: nextDirection });
        onSortChange?.(id, nextDirection);
    };

    const handleColumnVisibilityChange = (id: string, value: boolean) => {
        const nextVisibility = { ...localColumnVisibility, [id]: value };
        setLocalColumnVisibility(nextVisibility);
        onColumnVisibilityChange?.(nextVisibility);
    };

    const exportCsv = () => {
        if (onExport) {
            onExport(data);

            return;
        }

        const headers = visibleColumns.map((column) => getColumnId(column));
        const csv = [
            headers.join(','),
            ...data.map((item) =>
                headers
                    .map((header) =>
                        JSON.stringify(valueToString(item[header])),
                    )
                    .join(','),
            ),
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title ?? 'table'}-export.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={cn('space-y-4', className)}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    {title && (
                        <h2 className="text-lg font-semibold text-foreground">
                            {title}
                        </h2>
                    )}

                    <div className="relative w-full max-w-md">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={globalFilter}
                            onChange={handleSearchChange}
                            className="pl-9"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {actions}

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-border bg-card text-foreground"
                        onClick={exportCsv}
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>

                    {showColumnToggle && columns.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-border bg-card text-foreground"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {columns
                                    .filter(
                                        (column) =>
                                            column.enableHiding !== false,
                                    )
                                    .map((column) => {
                                        const id = getColumnId(column);

                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={id}
                                                checked={
                                                    localColumnVisibility[
                                                        id
                                                    ] !== false
                                                }
                                                onCheckedChange={(value) =>
                                                    handleColumnVisibilityChange(
                                                        id,
                                                        Boolean(value),
                                                    )
                                                }
                                            >
                                                {id === 'actions'
                                                    ? 'Actions'
                                                    : id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select
                    value={String(pageSize)}
                    onValueChange={handlePageSizeChange}
                >
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder={String(pageSize)} />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="border-b border-border bg-secondary/80">
                            <tr className="border-b border-border">
                                {visibleColumns.map((column) => {
                                    const id = getColumnId(column);
                                    const canSort =
                                        column.enableSorting !== false &&
                                        Boolean(column.accessorKey);

                                    return (
                                        <th
                                            key={id}
                                            className={cn(
                                                'px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase',
                                                column.className,
                                            )}
                                        >
                                            {canSort ? (
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1 hover:text-foreground"
                                                    onClick={() =>
                                                        handleSort(column)
                                                    }
                                                >
                                                    {typeof column.header ===
                                                    'function'
                                                        ? column.header(column)
                                                        : column.header}
                                                    <ChevronDown
                                                        className={cn(
                                                            'size-4 transition',
                                                            sorting.id !== id &&
                                                                'opacity-20',
                                                            sorting.id === id &&
                                                                sorting.direction ===
                                                                    'desc' &&
                                                                'rotate-180',
                                                        )}
                                                    />
                                                </button>
                                            ) : typeof column.header ===
                                              'function' ? (
                                                column.header(column)
                                            ) : (
                                                column.header
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, rowIndex) => (
                                    <tr
                                        key={String(item.id ?? rowIndex)}
                                        className={cn(
                                            'group transition-colors hover:bg-muted/80',
                                            rowIndex % 2 === 0
                                                ? 'bg-card'
                                                : 'bg-muted/35',
                                        )}
                                    >
                                        {visibleColumns.map((column) => {
                                            const id = getColumnId(column);

                                            return (
                                                <td
                                                    key={id}
                                                    className={cn(
                                                        'px-6 py-4 text-sm text-card-foreground',
                                                        column.className,
                                                    )}
                                                >
                                                    {column.cell
                                                        ? column.cell(
                                                              item,
                                                              rowIndex,
                                                          )
                                                        : valueToString(
                                                              column.accessorKey
                                                                  ? item[
                                                                        column
                                                                            .accessorKey
                                                                    ]
                                                                  : '',
                                                          )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={visibleColumns.length}
                                        className="h-24 px-4 text-center text-sm text-muted-foreground"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <PaginationComponent
                    pageIndex={effectivePageIndex}
                    totalCount={totalCount}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    showPagination={showPagination}
                    handlePageChange={handlePageChange}
                    getPageCount={() => pageCount}
                />
            </div>
        </div>
    );
}

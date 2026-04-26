import { Link, router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Id = string | number;

type ActionRoutes<T extends { id: Id }> = {
    view?: (id: T['id'], item: T) => string;
    edit?: (id: T['id'], item: T) => string;
    delete?: (id: T['id'], item: T) => string;
};

type ActionPermissions = {
    view?: string;
    edit?: string;
    delete?: string;
};

type Props<T extends { id: Id }> = {
    item: T;
    routes: ActionRoutes<T>;
    permissions?: ActionPermissions;
};

function ProtectedItem({
    permission,
    children,
}: {
    permission?: string;
    children: ReactNode;
}) {
    void permission;

    return <>{children}</>;
}

export default function ActionsDropdown<T extends { id: Id }>({
    item,
    routes,
    permissions = {},
}: Props<T>) {
    const confirmDelete = () => {
        if (!routes.delete) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure? You won't be able to revert this.",
        );

        if (confirmed) {
            router.delete(routes.delete(item.id, item));
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {routes.view && (
                    <ProtectedItem permission={permissions.view}>
                        <DropdownMenuItem asChild>
                            <Link
                                href={routes.view(item.id, item)}
                                className="w-full cursor-pointer"
                            >
                                View
                            </Link>
                        </DropdownMenuItem>
                    </ProtectedItem>
                )}

                {routes.edit && (
                    <ProtectedItem permission={permissions.edit}>
                        <DropdownMenuItem asChild>
                            <Link
                                href={routes.edit(item.id, item)}
                                className="w-full cursor-pointer"
                            >
                                Edit
                            </Link>
                        </DropdownMenuItem>
                    </ProtectedItem>
                )}

                {routes.delete && (
                    <ProtectedItem permission={permissions.delete}>
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={confirmDelete}
                        >
                            Delete
                        </DropdownMenuItem>
                    </ProtectedItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    pageIndex: number;
    totalCount: number;
    startIndex: number;
    endIndex: number;
    showPagination: boolean;
    handlePageChange: (pageIndex: number) => void;
    getPageCount: () => number;
};

export default function PaginationComponent({
    pageIndex,
    totalCount,
    startIndex,
    endIndex,
    showPagination,
    handlePageChange,
    getPageCount,
}: Props) {
    const pageCount = getPageCount();
    const maxButtons = 5;
    const start = Math.max(0, Math.min(pageCount - maxButtons, pageIndex - 2));
    const displayedPages = Array.from(
        { length: Math.min(maxButtons, pageCount) },
        (_, index) => index + start,
    );

    return (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-card px-6 py-4 sm:flex-row">
            <div className="text-sm font-medium text-muted-foreground">
                {showPagination
                    ? `Showing ${startIndex} to ${endIndex} of ${totalCount} items`
                    : 'No items to display'}
            </div>

            {showPagination && (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-border bg-card px-3 text-sm font-medium text-muted-foreground hover:bg-muted"
                        disabled={pageIndex === 0}
                        onClick={() => handlePageChange(pageIndex - 1)}
                    >
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {displayedPages.map((displayPageIndex) => (
                            <Button
                                key={displayPageIndex}
                                variant={
                                    displayPageIndex === pageIndex
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    'h-9 w-9 rounded-lg px-0 text-sm font-semibold',
                                    displayPageIndex === pageIndex
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'text-muted-foreground hover:bg-muted',
                                )}
                                onClick={() =>
                                    handlePageChange(displayPageIndex)
                                }
                            >
                                {displayPageIndex + 1}
                            </Button>
                        ))}

                        {pageCount > maxButtons &&
                            displayedPages.at(-1) !== pageCount - 1 && (
                                <>
                                    <span className="px-2 text-muted-foreground/50">
                                        ...
                                    </span>
                                    <Button
                                        variant="ghost"
                                        className="h-9 w-9 rounded-lg px-0 text-sm font-semibold text-muted-foreground hover:bg-muted"
                                        onClick={() =>
                                            handlePageChange(pageCount - 1)
                                        }
                                    >
                                        {pageCount}
                                    </Button>
                                </>
                            )}
                    </div>

                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-border bg-card px-3 text-sm font-medium text-muted-foreground hover:bg-muted active:scale-95"
                        disabled={pageIndex >= pageCount - 1}
                        onClick={() => handlePageChange(pageIndex + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

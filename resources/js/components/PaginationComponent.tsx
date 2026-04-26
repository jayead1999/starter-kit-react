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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row">
            <div className="text-sm font-medium text-slate-500">
                {showPagination
                    ? `Showing ${startIndex} to ${endIndex} of ${totalCount} items`
                    : 'No items to display'}
            </div>

            {showPagination && (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-slate-200 bg-white px-3 text-sm font-medium text-slate-500 hover:bg-slate-50"
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
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50',
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
                                    <span className="px-2 text-slate-300">
                                        ...
                                    </span>
                                    <Button
                                        variant="ghost"
                                        className="h-9 w-9 rounded-lg px-0 text-sm font-semibold text-slate-600 hover:bg-slate-50"
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
                        className="h-9 rounded-lg border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 active:scale-95"
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

import { Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col bg-background text-foreground">
            <main className="flex flex-1 items-center justify-center px-6 py-12">
                <div className="w-full max-w-[440px]">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            <ArrowLeft className="size-4" />
                            Home
                        </Link>
                    </div>

                    <div className="mb-8 text-center">
                        <Link
                            href={home()}
                            className="inline-flex flex-col items-center"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                                <ShieldCheck className="size-6" />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                {title}
                            </span>
                        </Link>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="space-y-6">{children}</div>
                    </div>
                </div>
            </main>

            <footer className="px-6 py-8 text-center text-sm text-muted-foreground">
                <span>Enterprise Starter workspace</span>
                <span className="mx-2 text-muted-foreground/50">•</span>
                <span>Secure access portal</span>
            </footer>

            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-[-5%] bottom-[-5%] h-[30%] w-[30%] rounded-full bg-tertiary/20 blur-3xl" />
            </div>
        </div>
    );
}

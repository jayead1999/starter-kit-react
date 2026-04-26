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
        <div className="relative flex min-h-svh flex-col bg-[#faf8ff] text-slate-900">
            <main className="flex flex-1 items-center justify-center px-6 py-12">
                <div className="w-full max-w-[440px]">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
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
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-950/15">
                                <ShieldCheck className="size-6" />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                {title}
                            </span>
                        </Link>
                        <p className="mt-2 text-sm text-slate-500">
                            {description}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                        <div className="space-y-6">{children}</div>
                    </div>
                </div>
            </main>

            <footer className="px-6 py-8 text-center text-sm text-slate-500">
                <span>Enterprise Starter workspace</span>
                <span className="mx-2 text-slate-300">•</span>
                <span>Secure access portal</span>
            </footer>

            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] h-[40%] w-[40%] rounded-full bg-blue-500/8 blur-3xl" />
                <div className="absolute right-[-5%] bottom-[-5%] h-[30%] w-[30%] rounded-full bg-slate-300/20 blur-3xl" />
            </div>
        </div>
    );
}

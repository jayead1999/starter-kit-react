import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-950/10">
                <AppLogoIcon className="size-4.5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate text-[17px] leading-tight font-extrabold tracking-tight text-blue-600">
                    AdminKit
                </span>
                <span className="truncate text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase">
                    Starter
                </span>
            </div>
        </>
    );
}

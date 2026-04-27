import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <AppLogoIcon className="size-4.5 fill-current text-primary-foreground" />
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate text-[17px] leading-tight font-extrabold tracking-tight text-primary">
                    AdminKit
                </span>
                <span className="truncate text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                    Starter
                </span>
            </div>
        </>
    );
}

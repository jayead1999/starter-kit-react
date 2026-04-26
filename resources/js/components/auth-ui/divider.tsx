type Props = {
    label: string;
};

export function Divider({ label }: Props) {
    return (
        <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                    {label}
                </span>
            </div>
        </div>
    );
}

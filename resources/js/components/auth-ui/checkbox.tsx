type Props = {
    id: string;
    name: string;
    label: string;
    defaultChecked?: boolean;
    tabIndex?: number;
};

export function Checkbox({
    id,
    name,
    label,
    defaultChecked,
    tabIndex,
}: Props) {
    return (
        <label
            htmlFor={id}
            className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
        >
            <input
                id={id}
                name={name}
                type="checkbox"
                defaultChecked={defaultChecked}
                tabIndex={tabIndex}
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
            />
            <span>{label}</span>
        </label>
    );
}

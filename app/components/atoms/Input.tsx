export default function Input({
    labelProps,
    inputProps,
}: {
    labelProps?: { text: string }
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
}) {
    return (
        <div className="flex flex-col">
            {labelProps && (
                <label
                    htmlFor={inputProps.name}
                    className="mb-2 ml-2 text-gray-200"
                >
                    {labelProps.text} {inputProps.required ? '(*)' : ''}
                </label>
            )}
            <input
                {...inputProps}
                className="h-[60px] rounded-xl bg-neutral-900 p-5 outline-none placeholder:text-gray-400"
            />
        </div>
    )
}

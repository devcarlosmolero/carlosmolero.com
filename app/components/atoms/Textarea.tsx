export default function Textarea({
    labelProps,
    inputProps,
}: {
    labelProps: { text: string }
    inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>
}) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor={inputProps.name}
                className="mb-2 ml-2 text-gray-200"
            >
                {labelProps.text} {inputProps.required ? '(*)' : ''}
            </label>
            <textarea
                {...inputProps}
                className="rounded-xl bg-neutral-900 p-5 outline-none placeholder:text-gray-400"
            />
        </div>
    )
}

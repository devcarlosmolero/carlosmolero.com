export default function Select({
    inputProps,
    defaultValue,
    options,
    labelProps,
}: {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
    defaultValue?: any
    options: { value: any; label: string }[]
    labelProps?: { text: string }
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
            <div className="relative w-full">
                <select
                    defaultValue={defaultValue}
                    className="flex h-[60px] w-full appearance-none items-center rounded-xl bg-neutral-900 p-3 text-start outline-none md:p-5"
                >
                    <option value="" selected disabled>
                        Selecciona una opción
                    </option>
                    {options.map((option, index) => (
                        <option
                            className="cursor-pointer rounded-md px-3 py-2 hover:bg-neutral-950 focus:outline-0"
                            value={option.value}
                            key={index}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

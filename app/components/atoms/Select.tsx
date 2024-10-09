import * as RadixSelect from '@radix-ui/react-select'

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
            <RadixSelect.Root
                name={inputProps.name}
                defaultValue={defaultValue}
            >
                <RadixSelect.Trigger className="flex h-[60px] rounded-xl bg-neutral-900 p-5 outline-none">
                    <RadixSelect.Value placeholder={inputProps.placeholder} />
                    <RadixSelect.Icon className="ml-auto" />
                </RadixSelect.Trigger>

                <RadixSelect.Portal>
                    <RadixSelect.Content className="rounded-md border border-zinc-800 bg-neutral-900 p-2 text-white">
                        <RadixSelect.ScrollUpButton />
                        <RadixSelect.Viewport>
                            {options.map((option, index) => (
                                <RadixSelect.Item
                                    className="cursor-pointer rounded-md px-3 py-2 hover:bg-neutral-950 focus:outline-0"
                                    value={option.value}
                                    key={index}
                                >
                                    <RadixSelect.ItemText>
                                        {option.label}
                                    </RadixSelect.ItemText>
                                </RadixSelect.Item>
                            ))}
                        </RadixSelect.Viewport>
                        <RadixSelect.ScrollDownButton />
                        <RadixSelect.Arrow />
                    </RadixSelect.Content>
                </RadixSelect.Portal>
            </RadixSelect.Root>
        </div>
    )
}

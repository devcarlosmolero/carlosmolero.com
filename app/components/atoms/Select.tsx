import {
    Root,
    Trigger,
    Value,
    Icon,
    Content,
    Viewport,
    ScrollUpButton,
    ScrollDownButton,
    Arrow,
    Portal,
    Item,
    ItemText,
} from '@radix-ui/react-select'

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
            <Root name={inputProps.name} defaultValue={defaultValue}>
                <Trigger className="flex h-[60px] items-center rounded-xl bg-neutral-900 p-3 text-start outline-none md:p-5">
                    <Value placeholder={inputProps.placeholder} />
                    <Icon className="ml-auto" />
                </Trigger>

                <Portal>
                    <Content className="rounded-md border border-zinc-800 bg-neutral-900 p-2 text-white">
                        <ScrollUpButton />
                        <Viewport>
                            {options.map((option, index) => (
                                <Item
                                    className="cursor-pointer rounded-md px-3 py-2 hover:bg-neutral-950 focus:outline-0"
                                    value={option.value}
                                    key={index}
                                >
                                    <ItemText>{option.label}</ItemText>
                                </Item>
                            ))}
                        </Viewport>
                        <ScrollDownButton />
                        <Arrow />
                    </Content>
                </Portal>
            </Root>
        </div>
    )
}

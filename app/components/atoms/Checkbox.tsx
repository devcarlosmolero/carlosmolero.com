import { CheckIcon } from '@heroicons/react/24/outline'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import cn from 'classnames'

export default function Checkbox({
    checkboxProps,
    labelProps,
}: {
    checkboxProps: RadixCheckbox.CheckboxProps & { useStrike?: boolean }
    labelProps?: { text: string }
}) {
    return (
        <div className="flex w-fit items-start justify-center gap-x-2 md:items-center">
            <RadixCheckbox.Root
                {...checkboxProps}
                className="mt-1 flex min-h-[25px] min-w-[25px] items-center justify-center rounded-md border border-zinc-600 bg-neutral-800 outline-none md:mt-0"
            >
                <RadixCheckbox.Indicator className="text-white">
                    <CheckIcon className="size-4" />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            {labelProps && (
                <label
                    className={cn(
                        checkboxProps.useStrike &&
                            checkboxProps.defaultChecked &&
                            'line-through'
                    )}
                    htmlFor={checkboxProps?.name}
                >
                    {labelProps?.text}
                </label>
            )}
        </div>
    )
}

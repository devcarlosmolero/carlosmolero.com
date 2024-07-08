import cn from 'classnames'
import { ReactNode } from 'react'

export default function Badge({
    children,
    label,
    className,
}: {
    label?: string
    className?: string
    children?: ReactNode
}) {
    return (
        <div
            className={cn(
                'flex w-fit items-center gap-x-3 rounded-full border border-zinc-600 bg-neutral-900 px-4 py-3 text-sm',
                className
            )}
        >
            {children ?? label}
        </div>
    )
}

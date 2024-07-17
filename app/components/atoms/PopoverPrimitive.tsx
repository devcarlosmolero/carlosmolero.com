import { ReactNode } from 'react'
import cn from 'classnames'

function Root({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return <div className={cn('group relative', className)}>{children}</div>
}

function Trigger({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <button className={cn('group w-full rounded', className)}>
            {children}
        </button>
    )
}

function Content({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                'absolute -left-20 hidden group-hover:block',
                className
            )}
        >
            {children}
        </div>
    )
}

const PopoverPrimitive = {
    Root,
    Trigger,
    Content,
}
export default PopoverPrimitive

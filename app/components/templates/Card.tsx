import { ReactNode } from 'react'

export default function Card({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div
            className={`rounded-xl border border-zinc-600 bg-neutral-900 p-5 ${className}`}
        >
            {children}
        </div>
    )
}

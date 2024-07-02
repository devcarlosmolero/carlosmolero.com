import { ReactNode } from 'react'
import cl from 'classnames'

export default function PageInner({
    children,
    className,
}: {
    children: ReactNode | ReactNode[]
    className?: string
}) {
    return (
        <div className={cl(className ?? 'grid grid-cols-1', 'gap-y-24 py-10')}>
            {children}
        </div>
    )
}

import { Link, LinkProps } from '@remix-run/react'
import cn from 'classnames'

export default function DashedLink({
    to,
    target,
    className,
    reloadDocument,
    children,
}: LinkProps) {
    return (
        <Link
            className={cn(
                'flex items-start underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300',
                className
            )}
            reloadDocument={reloadDocument}
            to={to}
            target={target}
        >
            {children}
        </Link>
    )
}

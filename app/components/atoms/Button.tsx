import { Fragment, ReactNode } from 'react'
import cn from 'classnames'
import Spinner from '../molecules/Spinner'
import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'

export default function Button({
    children,
    variant,
    to,
    asLink = false,
    isLoading = false,
    isDisabled = false,
    hasIcon = false,
    className,
    props,
}: {
    children: ReactNode | string
    variant: 'primary' | 'ghost' | 'accent' | 'secondary'
    to?: string
    asLink?: boolean
    isLoading?: boolean
    isDisabled?: boolean
    hasIcon?: boolean
    className?: string
    props?:
        | React.ForwardRefExoticComponent<
              RemixLinkProps & React.RefAttributes<HTMLAnchorElement>
          >
        | React.LinkHTMLAttributes<HTMLLinkElement>
}) {
    function getVariantClassname() {
        if (isDisabled) {
            return 'bg-neutral-800 pointer-events-none text-gray-400'
        }

        switch (variant) {
            case 'primary':
                return 'bg-violet-700 text-white'
            case 'ghost':
                return 'bg-neutral-800 text-white'
            case 'secondary':
                return 'bg-highlight-900 text-black'
            case 'accent':
                return 'bg-slate-200 text-black'
        }
    }

    return (
        <Fragment>
            {!asLink && (
                <button
                    className={cn(
                        getVariantClassname(),
                        className,
                        hasIcon && 'flex items-center gap-x-3',
                        'w-fit rounded-full px-5 py-3'
                    )}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    {isLoading && <Spinner />}
                    {!isLoading && <Fragment>{children}</Fragment>}
                </button>
            )}
            {asLink && (
                <Link
                    to={to ?? ''}
                    className={cn(
                        getVariantClassname(),
                        className,
                        hasIcon && 'flex items-center gap-x-3',
                        'w-fit rounded-full px-5 py-3'
                    )}
                    {...(props as any)}
                >
                    {isLoading && <Spinner />}
                    {!isLoading && <Fragment>{children}</Fragment>}
                </Link>
            )}
        </Fragment>
    )
}

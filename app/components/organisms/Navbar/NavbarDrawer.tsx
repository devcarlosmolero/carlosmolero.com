import { Fragment } from 'react/jsx-runtime'
import cn from 'classnames'
import { Link } from '@remix-run/react'

import Button from '~/components/atoms/Button'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { IMAGE_KIT_BASE_URL } from '~/consts'

export default function NavbarDrawer({
    isOpen,
    isRoot,

    onClose,
}: {
    isOpen: boolean
    isRoot: boolean

    onClose: () => void
}) {
    return (
        <Fragment>
            <div
                role="button"
                tabIndex={-1}
                onKeyUp={() => {}}
                onClick={onClose}
                className={cn(
                    'fixed z-20 h-[100vh] w-full cursor-default bg-neutral-950/50 transition-opacity duration-500 lg:hidden',
                    isOpen && 'opacity-1',
                    !isOpen && 'hidden opacity-0'
                )}
            ></div>
            <div
                className={cn(
                    `fixed left-0 z-50 h-[100vh] bg-neutral-950 transition-all duration-500 lg:hidden`,
                    isOpen && 'opacity-1 w-[80%]',
                    !isOpen && 'w-[0%] opacity-0'
                )}
            >
                <div
                    className={cn(
                        'h-100 flex min-w-[300px] flex-col items-start justify-center gap-y-2 px-6 py-4 font-semibold tracking-tighter transition-opacity',
                        isOpen && 'opacity-1 w-[100%] duration-500',
                        !isOpen && 'hidden w-[0%] opacity-0 duration-0'
                    )}
                >
                    <Link reloadDocument to="/" className="mb-5">
                        <img
                            className="h-[60px] w-[60px]"
                            alt="Logo"
                            src={`${IMAGE_KIT_BASE_URL}/tr:ar-1-1,w-60,f-webp/logo.svg`}
                        />
                    </Link>
                    <Link

                            reloadDocument
                        className=" text-gray-500 pointer-events-none"
                            to={'/diseno-ux-ui'}
                        >
                            Diseño UX/UI
                        </Link>
                    <Link
                        reloadDocument
                        onClick={onClose}
                        className="text-white"
                        to={'/nuestros-clientes-y-casos-de-exito'}
                    >
                        Nuestros Clientes
                    </Link>
                    <Link
                        reloadDocument
                        onClick={onClose}
                        className="text-white"
                        to={'/blog'}
                    >
                        Blog{' '}
                    </Link>
                    <Link
                        onClick={onClose}
                        className="text-white"
                        to={`${isRoot ? '' : '/'}#contacto`}
                    >
                        Contacto
                    </Link>
                    <Button
                        hasIcon
                        variant="secondary"
                        className="mt-3 !py-2"
                        asLink
                        to="https://wa.link/zvj2va"
                        props={
                            {
                                target: '_blank',
                                onClick: onClose,
                            } as React.LinkHTMLAttributes<HTMLLinkElement>
                        }
                    >
                        ¿Hablamos?
                        <ChatBubbleLeftEllipsisIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

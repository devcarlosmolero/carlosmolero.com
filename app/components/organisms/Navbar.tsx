import { Link } from '@remix-run/react'
import Container from '~/components/templates/Container'
import Hamburger from '~/components/molecules/Hamburger'
import { Fragment, useEffect, useState } from 'react'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import Button from '../atoms/Button'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import cl from 'classnames'

export default function Navbar({
    isRoot,
    onOpen,
    onClose,
}: {
    isRoot: boolean
    onOpen: () => void
    onClose: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            onOpen()
            return
        }

        onClose()
    }, [isOpen, onOpen, onClose])

    return (
        <nav className="flex w-full justify-center">
            <Container className="fixed z-20 w-full bg-neutral-950/80 px-10 py-2 text-white backdrop-blur lg:px-5">
                {/* DESKTOP NAVBAR */}
                <div className="hidden grid-cols-5 items-center py-2 text-center font-semibold uppercase tracking-tighter lg:grid">
                    <Link to={`${isRoot ? '' : '/'}#servicios`}>Servicios</Link>
                    <Link to={`${isRoot ? '' : '/'}#preguntas`}>
                        Preguntas Frecuentes
                    </Link>
                    <div className="flex items-center justify-center gap-x-3">
                        <Link to="/">
                            <img
                                className="h-[60px] w-[60px]"
                                alt="Logo"
                                src="https://ik.imagekit.io/jgh04cawf/novascriptio/logo.svg?updatedAt=1715109841439"
                            />
                        </Link>
                    </div>
                    <Link to={`${isRoot ? '' : '/'}#contacto`}>Contacto</Link>
                    <Button
                        hasIcon
                        variant="secondary"
                        className="!py-2"
                        asLink
                        to="https://wa.link/byrnks"
                        props={
                            {
                                target: '_blank',
                            } as React.LinkHTMLAttributes<HTMLLinkElement>
                        }
                    >
                        ¿Hablamos?
                        <ChatBubbleLeftEllipsisIcon className="size-4" />
                    </Button>
                </div>
                {/* MOBILE NAVBAR */}
                <div className="grid grid-cols-2 items-center px-2 py-2 text-center lg:hidden">
                    <div className="flex items-center justify-start gap-x-3">
                        <Link to="/">
                            <ImageKitImage
                                alt="Logo"
                                className="h-[60px] w-[60px]"
                                src="/tr:ar-1-1,w-60/logo.svg"
                            />
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
                    </div>
                </div>
            </Container>
            <NavbarDrawer
                setClose={() => setIsOpen(false)}
                isOpen={isOpen}
                isRoot={isRoot}
            />
        </nav>
    )
}

function NavbarDrawer({
    isOpen,
    isRoot,
    setClose,
}: {
    isOpen: boolean
    isRoot: boolean
    setClose: () => void
}) {
    return (
        <Fragment>
            <div
                role="button"
                tabIndex={-1}
                onKeyUp={() => {}}
                onClick={setClose}
                className={cl(
                    'fixed h-[100vh] w-full cursor-default bg-neutral-950/50 transition-opacity duration-500 lg:hidden',
                    isOpen && 'opacity-1',
                    !isOpen && 'hidden opacity-0'
                )}
            ></div>
            <div
                className={cl(
                    `fixed left-0 z-50 h-[100vh] bg-neutral-950 transition-all duration-500 lg:hidden`,
                    isOpen && 'opacity-1 w-[80%]',
                    !isOpen && 'w-[0%] opacity-0'
                )}
            >
                <div
                    className={cl(
                        'h-100 flex flex-col items-start justify-center gap-y-2 px-6 py-4 font-semibold uppercase tracking-tighter transition-opacity',
                        isOpen && 'opacity-1 w-[100%] duration-[2300ms]',
                        !isOpen && 'w-[0%] opacity-0 duration-0'
                    )}
                >
                    <Link onClick={setClose} to="/" className="mb-5">
                        <img
                            className="h-[60px] w-[60px]"
                            alt="Logo"
                            src="https://ik.imagekit.io/jgh04cawf/novascriptio/logo.svg?updatedAt=1715109841439"
                        />
                    </Link>
                    <Link
                        onClick={setClose}
                        className="text-white"
                        to={`${isRoot ? '' : '/'}#servicios`}
                    >
                        Servicios
                    </Link>
                    <Link
                        onClick={setClose}
                        className="text-white"
                        to={`${isRoot ? '' : '/'}#preguntas`}
                    >
                        Preguntas Frecuentes
                    </Link>
                    <Link
                        onClick={setClose}
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
                        to="https://wa.link/byrnks"
                        props={
                            {
                                target: '_blank',
                                onClick: setClose,
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

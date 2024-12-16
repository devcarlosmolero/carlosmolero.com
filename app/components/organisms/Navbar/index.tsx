import { Link } from '@remix-run/react'
import Container from '~/components/templates/Container'
import Hamburger from '~/components/molecules/Hamburger'
import { useEffect, useState } from 'react'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import Button from '~/components/atoms/Button'
import NavbarDrawer from './NavbarDrawer'

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
                <div className="hidden grid-cols-12 items-center py-2 text-center font-semibold tracking-tighter lg:grid">
                    <div className="col-span-3 flex items-center justify-start gap-x-3">
                        <Link reloadDocument to="/">
                            <img
                                className="h-[60px] w-[60px]"
                                alt="Logo"
                                src={`${IMAGE_KIT_BASE_URL}/tr:w-60,ar-1-1,f-webp/logo.svg`}
                            />
                        </Link>
                    </div>
                    <div className="col-span-9 flex w-full items-center justify-end gap-x-10">
                        <Link
                            reloadDocument
                            className="w-fit"
                            to={'/nuestro-trabajo'}
                        >
                            Nuestro Trabajo
                        </Link>
                        <Link
                            reloadDocument
                            className="text-white"
                            to={'/blog'}
                        >
                            Blog{' '}
                        </Link>
                        <Link
                            className="w-fit"
                            to={`${isRoot ? '' : '/'}#contacto`}
                        >
                            Contacto
                        </Link>
                        <Button
                            hasIcon
                            variant="secondary"
                            className="!py-2"
                            asLink
                            to="https://wa.link/zvj2va"
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
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                isRoot={isRoot}
            />
        </nav>
    )
}

import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Facebook, Linkedin, TwitterX } from 'react-bootstrap-icons'
import Button from '../atoms/Button'
import ImageKitImage from '../atoms/ImageKitImage'
import SectionHeading from '../pages/Home/SectionHeading'
import Container from '../templates/Container'
import { Link } from '@remix-run/react'
import Separator from '../atoms/Separator'

export default function Footer() {
    return (
        <footer className="mx-2 mt-16">
            <Separator />
            <Container className="flex flex-col items-center justify-center gap-y-5 px-4 py-16 text-white">
                <ImageKitImage className="h-[70px] w-[70px]" src="/logo.svg" />
                <SectionHeading
                    title="Agenda tu reunión <br/><span class='font-accent'>hoy mismo</span>"
                    description="Descubre cómo podemos proveer a tu negocio de las herramientas y el software que harán que llegue a lo más alto"
                ></SectionHeading>
                <Button
                    hasIcon
                    asLink
                    to="https://cal.com/carlosmolero/30min"
                    props={
                        {
                            target: '_blank',
                        } as React.LinkHTMLAttributes<HTMLLinkElement>
                    }
                    className="-mt-14"
                    variant="accent"
                >
                    Agendar reunión
                    <CalendarDaysIcon className="size-4" />
                </Button>
                <div className="mt-5 text-gray-300 hover:text-white">
                    <Link reloadDocument to="/politica-de-privacidad">
                        Política de privacidad
                    </Link>
                </div>
                <div className="mt-3 flex items-center gap-x-3">
                    <Link
                        to="https://x.com/novascriptio"
                        className="cursor-pointer text-gray-300 hover:text-white"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <TwitterX />
                    </Link>
                    <Link
                        className="cursor-pointer text-gray-300 hover:text-white"
                        to="https://es.linkedin.com/company/novascript-io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Linkedin />
                    </Link>
                    <Link
                        className="cursor-pointer text-gray-300 hover:text-white"
                        to="https://www.facebook.com/profile.php?id=61557708621835"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Facebook />
                    </Link>
                </div>
            </Container>
        </footer>
    )
}

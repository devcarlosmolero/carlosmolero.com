import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import Button from '../atoms/Button'
import ImageKitImage from '../atoms/ImageKitImage'
import SectionHeading from '../pages/Home/SectionHeading'
import Container from '../templates/Container'
import { Link } from '@remix-run/react'

export default function Footer() {
    return (
        <footer className="mx-2 mt-16 rounded-t-[100px] border border-b-0 border-zinc-600 md:rounded-t-[150px]">
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
                <div className="mt-5 flex">
                    <p className="text-center text-sm text-gray-400">
                        NovaScript LLC | 500 4th St NW Alburquerque NM 87102,
                        USA
                    </p>
                </div>
                <div className="mt-5 text-gray-300 hover:text-white">
                    <Link reloadDocument to="/politica-de-privacidad">
                        Política de privacidad
                    </Link>
                </div>
            </Container>
        </footer>
    )
}

import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Dribbble, Facebook, Linkedin, TwitterX } from 'react-bootstrap-icons'
import Button from '../atoms/Button'
import ImageKitImage from '../atoms/ImageKitImage'
import SectionHeading from '../pages/Home/SectionHeading'
import Container from '../templates/Container'
import { Link } from '@remix-run/react'
import Separator from '../atoms/Separator'
import { ServiceCard } from '~/types/contentful'
import { SITE_TOOLS } from '~/consts'

export default function Footer({ services }: { services: ServiceCard[] }) {
    return (
        <footer className="mx-2 mt-16">
            <Separator />
            <Container className="px-4 py-16 text-white">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="flex flex-col items-start space-y-5 md:col-span-2">
                        <ImageKitImage
                            className="h-[70px] w-[70px]"
                            src="/logo.svg"
                        />
                        <SectionHeading
                            centered={false}
                            title="Agenda tu reunión <br/><span class='font-accent'>hoy mismo</span>"
                            description="Descubre cómo podemos proveer a tu negocio de las herramientas y el software que harán que llegue a lo más alto"
                        ></SectionHeading>
                        <Button
                            hasIcon
                            asLink
                            to="https://cal.com/carlosmmta/30min"
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
                        <div className="mt-5 text-sm">
                            <Link
                                className="text-gray-300 no-underline hover:text-white"
                                reloadDocument
                                to="/politica-de-privacidad"
                            >
                                Política de privacidad
                            </Link>
                        <span className="text-gray-300"> | </span>
                            <Link
                                className="text-gray-300 no-underline hover:text-white"
                                reloadDocument
                                to="/politica-de-devoluciones-y-reembolsos"
                            >
                                Política de Devoluciones y Reembolsos
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
                            <Link
                                to="https://dribbble.com/carlosmmta"
                                className="cursor-pointer text-gray-300 hover:text-white"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Dribbble />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold tracking-tighter">
                            Servicios
                        </h3>
                        {services.map((service, index) => {
                            return (
                                <Link
                                    className="flex items-start gap-x-2 py-1 font-normal text-gray-300 hover:text-white"
                                    key={index}
                                    reloadDocument
                                    to={`/${service.slug}`}
                                >
                                    {service.cardTitle}
                                </Link>
                            )
                        })}
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold tracking-tighter">
                            Herramientas
                        </h3>
                        {SITE_TOOLS.map((tool, index) => {
                            return (
                                <Link
                                    className="flex items-start gap-x-2 py-1 font-normal text-gray-300 hover:text-white"
                                    key={index}
                                    reloadDocument
                                    to={`/${tool.pathname}`}
                                >
                                    {tool.title}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </footer>
    )
}

import Button from '~/components/atoms/Button'
import SectionHeading from './SectionHeading'
import Card from '~/components/templates/Card'
import ScrollAnimation from 'react-animate-on-scroll'
import AccentCard from '~/components/templates/AccentCard'
import { Link } from '@remix-run/react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import ServicesIconMap from '~/components/atoms/ServicesIconMap'
import { ServiceCard } from '~/types/contentful'

export default function Services({ cards }: { cards: ServiceCard[] }) {
    return (
        <section id="servicios">
            <ScrollAnimation animateOnce={true} animateIn="fadeIn">
                <SectionHeading
                    badgeLabel="Servicios"
                    title="Servicios que llevarán a tu empresa <span class='font-accent tracking-normal'>a lo más alto</span>"
                    description="Descubre todo lo que podemos ofrecer a tu negocio gracias a un equipo profesional y multidisciplinar"
                />
            </ScrollAnimation>
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-3">
                {cards.map((card, index) => {
                    return (
                        <ScrollAnimation
                            animateOnce={true}
                            key={index}
                            animateIn="fadeInUp"
                        >
                            <Card className="transition-scale flex h-full flex-col items-start gap-x-3 gap-y-3 rounded-xl duration-500 hover:scale-105">
                                <div className="grid w-full grid-cols-2 items-center">
                                    <div className="w-full">
                                        {/* @ts-expect-error idk */}
                                        {ServicesIconMap[card.iconString]}
                                    </div>
                                    {card.enabled && (
                                        <div className="flex justify-end">
                                            <Link
                                                reloadDocument
                                                className="flex items-center justify-end gap-x-2 hover:text-violet-300"
                                                to={`/${card.slug}`}
                                            >
                                                <p>Saber más</p>
                                                <ArrowUpRightIcon className="size-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 flex flex-col gap-y-3">
                                    <h3 className="text-xl">
                                        {card.cardTitle}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        {card.cardDescription}
                                    </p>
                                </div>
                            </Card>
                        </ScrollAnimation>
                    )
                })}
                <AccentCard className="col-span-1 lg:col-span-2">
                    <div className="flex flex-col justify-center gap-y-3 md:max-w-[70%]">
                        <h3 className="text-2xl font-bold">
                            Contacta con nosotros y te responderémos en menos de
                            24 horas
                        </h3>
                        <p>
                            Empezar a trabajar con nosotros es tan sencillo cómo
                            enviarnos un mensaje, estamos a tu servicio.
                        </p>
                        <Button
                            asLink
                            to="#contacto"
                            className="lg:!py-2"
                            variant="accent"
                        >
                            Empezar proyecto
                        </Button>
                    </div>
                </AccentCard>
            </div>
        </section>
    )
}

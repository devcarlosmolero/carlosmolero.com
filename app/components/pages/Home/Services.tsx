import {
    ChartBarIcon,
    CloudArrowUpIcon,
    DevicePhoneMobileIcon,
    RocketLaunchIcon,
    ComputerDesktopIcon,
    CodeBracketIcon,
    Square3Stack3DIcon,
    ArrowUpRightIcon,
} from '@heroicons/react/24/outline'
import Button from '~/components/atoms/Button'
import SectionHeading from './SectionHeading'
import Card from '~/components/templates/Card'
import ScrollAnimation from 'react-animate-on-scroll'
import AccentCard from '~/components/templates/AccentCard'
import { Link } from '@remix-run/react'

export default function Services() {
    const services = [
        {
            title: 'Diseño web',
            description:
                'Creamos tu sitio web, atractivo y funcional, con Wordpress, Webflow o Framer. ¿A qué esperas para convertir a tus visitantes en clientes?',
            icon: <ComputerDesktopIcon className="size-12 text-violet-300" />,
            pathname: 'diseno-y-desarrollo-de-paginas-web',
        },
        {
            title: 'Apps móviles',
            description:
                'Desarrollamos aplicaciones iOS y Android que crean experiencias que tus usuarios querrán repetir una y otra vez. Usamos tecnologías vanguardistas como Flutter.',
            icon: <DevicePhoneMobileIcon className="size-12 text-violet-300" />,
        },
        {
            title: 'Software a medida',
            description:
                'Si no encontramos la solución perfecta para ti la fabricamos a tu medida. Tu imaginación es el límite.',
            icon: <CodeBracketIcon className="size-12 text-violet-300" />,
        },
        {
            title: 'Software empresarial',
            description:
                'Impulsa tu negocio con soluciones que mejoren la productividad de tu equipo de ventas, recursos humanos, control de stocks etc. Un sinfín de automatizaciones te esperan.',
            icon: <ChartBarIcon className="size-12 text-violet-300" />,
        },
        {
            title: 'Producto mínimo viable',
            description:
                'Desbanca a tus competidores y levanta esa ronda de financiación desarrollando un producto mínimo viable en tiempo récord.',
            icon: <RocketLaunchIcon className="size-12 text-violet-300" />,
        },
        {
            title: 'DevOps e infra',
            description:
                'Gestionamos o creamos tu infraestructura en la nube para garantizar la resiliencia y la seguridad de tus proyectos de software. Nuestros profesionales están certificados.',
            icon: <CloudArrowUpIcon className="size-12 text-violet-300" />,
        },
        {
            title: 'IA',
            description:
                'Abraza la evolución y permite a la IA automatizar los procesos tediosos y repetitivos de tu empresa, pregúntanos sin compromiso.',
            icon: <Square3Stack3DIcon className="size-12 text-violet-300" />,
        },
    ]

    return (
        <section id="servicios">
            <SectionHeading
                badgeLabel="Servicios"
                title="Servicios que llevarán a tu empresa <span class='font-accent tracking-normal'>a lo más alto</span>"
                description="Descubre todo lo que podemos ofrecer a tu negocio gracias a un equipo profesional y multidisciplinar"
            />
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-3">
                {services.map((service, index) => {
                    return (
                        <ScrollAnimation
                            animateOnce={true}
                            key={index}
                            animateIn="fadeInUp"
                        >
                            <Card className="transition-scale flex h-full flex-col items-start gap-x-3 gap-y-3 rounded-xl duration-500 hover:scale-105">
                                <div className="grid w-full grid-cols-2 items-center">
                                    <div className="w-full">{service.icon}</div>
                                    {service?.pathname && (
                                        <div className="flex justify-end">
                                            <Link
                                                reloadDocument
                                                className="flex items-center justify-end gap-x-2 hover:text-violet-300"
                                                to={`/${service.pathname}`}
                                            >
                                                <p>Saber más</p>
                                                <ArrowUpRightIcon className="size-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 flex flex-col gap-y-3">
                                    <h3 className="text-xl">{service.title}</h3>
                                    <p className="text-sm text-gray-300">
                                        {service.description}
                                    </p>
                                </div>
                            </Card>
                        </ScrollAnimation>
                    )
                })}
                <AccentCard>
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

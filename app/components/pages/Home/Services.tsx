import {
    ChartBarIcon,
    CloudArrowUpIcon,
    DevicePhoneMobileIcon,
    RocketLaunchIcon,
    ComputerDesktopIcon,
    CodeBracketIcon,
    Square3Stack3DIcon,
} from '@heroicons/react/24/outline'
import Button from '~/components/atoms/Button'
import SectionHeading from './SectionHeading'
import Card from '~/components/templates/Card'
import ScrollAnimation from 'react-animate-on-scroll'

export default function Services() {
    const services = [
        {
            title: 'Diseño web',
            description:
                'Creamos tu sitio web, atractivo y funcional, con Wordpress, Webflow o Framer. ¿A qué esperas para convertir a tus visitantes en clientes?',
            icon: <ComputerDesktopIcon className="size-12 text-violet-300" />,
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
                                {service.icon}
                                <div className="mt-3 flex flex-col gap-y-3">
                                    <h3 className="text-xl">{service.title}</h3>
                                    <p className="text-sm text-gray-300">
                                        {service.description ??
                                            `Curabitur sollicitudin suscipit arcu
                                        eget sodales. Curabitur hendrerit ipsum
                                        at sodales rhoncus. Sed vehicula lorem
                                        nec eros tempus, in placerat purus
                                        sollicitudin.`}
                                    </p>
                                </div>
                            </Card>
                        </ScrollAnimation>
                    )
                })}
                <div className="relative col-span-1 h-full min-h-[300px] w-full lg:col-span-2 lg:min-h-0">
                    <div
                        style={{
                            backgroundImage:
                                'url(https://i.postimg.cc/HsHJ9YRC/abstract-1.png)',
                        }}
                        className="h-full w-full rounded-xl bg-cover bg-right"
                    ></div>
                    <div className="absolute top-0 h-full w-full rounded-xl bg-neutral-900/30 p-5 backdrop-blur-2xl">
                        <div className="flex flex-col justify-center gap-y-3 md:max-w-[70%]">
                            <h3 className="text-2xl font-bold">
                                Contacta con nosotros y te responderémos en
                                menos de 24 horas
                            </h3>
                            <p>
                                Empezar a trabajar con nosotros es tan sencillo
                                cómo enviarnos un mensaje, estamos a tu
                                servicio.
                            </p>
                            <Button asLink to="#contacto" variant="accent">
                                Empezar proyecto
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

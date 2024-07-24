import { ArrowRightIcon } from '@heroicons/react/24/outline'
import AvatarRow from './AvatarRow'
import IntroductionVideo from './IntroductionVideo'
import LogoCarousel from './LogoCarousel'
import Card from '~/components/templates/Card'
import Review from '~/components/organisms/Review'
import Button from '~/components/atoms/Button'

const avatarImages = [
    {
        src: '/monika-milenova.jpg',
        alt: 'Monika Milenova - Abogada Málaga',
    },
    {
        src: '/rafa-torres.jpg',
        alt: 'Rafa Torres - CTO en Voicit',
    },
    {
        src: '/jordi-nyxidiom.jpg',
        alt: 'Jordi - CEO Nyxidiom',
    },
    {
        src: '/irene-leon.webp',
        alt: 'Irene León - Abogada Málaga',
    },
    {
        src: '/david-ballesteros.jpg',
        alt: 'David Ballesteros - Ingeniero de Software en Caroda',
    },
]

export default function Hero() {
    return (
        <section id="hero">
            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
                <div className="flex flex-col gap-y-3">
                    <div className="flex w-fit items-center gap-x-3 rounded-full border border-zinc-600 px-4 py-3 text-sm">
                        <div className="relative">
                            <div className="h-[10px] w-[10px] rounded-full bg-green-400"></div>
                            <div className="absolute top-0 h-[10px] w-[10px] animate-ping rounded-full bg-green-400 opacity-75"></div>
                        </div>
                        <p>Listos para tu proyecto</p>
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tighter">
                        Empresa de Software
                        <br className="hidden md:block" /> y Diseño Web
                    </h1>
                    <p>
                        Somos un equipo de desarrolladores de software,
                        diseñadores y marketers con más de 10 años de
                        experiencia.
                    </p>
                    <p>
                        Nos asociamos con empresas que buscan planear, diseñar y
                        construir soluciones tecnológicas para aumentar sus
                        ventas o mejorar su productividad.
                    </p>
                    <div className="mt-3 flex gap-x-3">
                        <Button asLink to="#contacto" variant="primary" hasIcon>
                            Trabajemos juntos
                            <ArrowRightIcon className="size-4" />
                        </Button>
                        <Button asLink to="#servicios" variant="ghost">
                            Explora
                        </Button>
                    </div>
                </div>
                <div>
                    <Card className="flex flex-col gap-y-5">
                        <Review
                            author="Stefan Dreverman"
                            jobTitle="CEO de EntreCode"
                            description={`Los recomendaría sin dudarlo. Siempre consiguen
                                          encontrar una solución perfecta para las necesidades
                                          de tu negocio. Carlos es una persona seria y
                                          responsable.`}
                            src="/stefan-dreverman.jpg"
                            alt="Stefan Dreverman - CEO de EntreCode"
                        />
                    </Card>
                    <div className="mt-5 flex flex-col items-center gap-y-3 pt-16 lg:items-start lg:pt-0">
                        <AvatarRow images={avatarImages} />
                        <p className="text-md text-center lg:text-start">
                            Stefan y más de 300 emprendedores han contratado ya
                            nuestros servicios ¿A qué estás esperando?
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-16">
                <LogoCarousel heading="Orgullosos de haber colaborado con" />
            </div>
            <div className="pt-8">
                <IntroductionVideo />
            </div>
        </section>
    )
}

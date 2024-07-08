import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Steps from './Steps'
import SectionHeading from './SectionHeading'
import Review from '~/components/organisms/Review'
import Card from '~/components/templates/Card'
import LogoCarousel from './LogoCarousel'
import Button from '~/components/atoms/Button'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import ScrollAnimation from 'react-animate-on-scroll'

export default function OurProcess() {
    return (
        <section id="proceso">
            <ScrollAnimation animateOnce={true} animateIn="fadeIn">
                <SectionHeading
                    badgeLabel="Nuestro Proceso"
                    title="Funcionamos de forma <span class='font-accent tracking-normal'>simple y transparente</span>"
                    description="Nuestro proceso de diseño y desarrollo carece de complicaciones"
                />
            </ScrollAnimation>
            <ScrollAnimation animateOnce={true} animateIn="fadeIn">
                <Steps
                    data={[
                        {
                            title: 'Breve reunión de 30 minutos',
                            description:
                                'Nos sentamos contigo para que nos cuentes los retos que enfrenta tu negocio y qué esperas de nosotros',
                        },
                        {
                            title: 'Presupuesto y plan de acción',
                            description:
                                'Te proporcionamos un presupuesto y una propuesta de acción con todo lujo de detalles',
                        },
                        {
                            title: 'Comunicación constante',
                            description:
                                'Empezamos a desarrollar tu proyecto proporcionándote herramientas para que monitorices nuestro trabajo y estés al tanto de todo',
                        },
                    ]}
                />
            </ScrollAnimation>
            <div className="pt-16">
                <LogoCarousel heading="Han confiado en nosotros" />
            </div>
            <div className="grid grid-cols-1 gap-y-16">
                <div className="grid gap-x-10 gap-y-10 pt-24 lg:grid-cols-2">
                    <div className="flex w-full items-center">
                        <ScrollAnimation animateOnce animateIn="fadeInUp">
                            <Card className="flex w-full flex-col gap-y-5">
                                <Review
                                    author="Monika Milenova"
                                    jobTitle="Directora en MMAbogada"
                                    src="/monika-milenova.jpg"
                                    alt="Monika Milenova - Directora en MMAbogada"
                                    description="Captaron mi idea a la primera y la ejecutaron a la perfección. Había pasado por un infierno tratando con agencias que solo me querían sacar el dinero, NovaScript fue la solución."
                                />
                            </Card>
                        </ScrollAnimation>
                    </div>
                    <div className="flex w-full items-center">
                        <ScrollAnimation animateOnce animateIn="fadeInUp">
                            <Card className="flex w-full flex-col gap-y-5">
                                <Review
                                    author="Rafa Torres"
                                    jobTitle="CTO en Voicit"
                                    src="/rafa-torres.jpg"
                                    alt="Rafa Torres - CTO en Voicit"
                                    description="Carlos es un excelente desarrollador. Fue capaz de cumplir con una gran variedad de tareas complejas, con una muy buena comunicación durante todo el transcurso del proyecto."
                                />
                            </Card>
                        </ScrollAnimation>
                    </div>
                </div>
                <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
                    <ScrollAnimation animateOnce animateIn="fadeInLeft">
                        <div>
                            <ImageKitImage
                                className="rounded-xl"
                                alt="App de CRM o ERP para empresas"
                                src={'/tr:ar-16-9,w-580,f-webp/crm-erp.png'}
                            />
                        </div>
                    </ScrollAnimation>
                    <div className="flex justify-center">
                        <ScrollAnimation animateOnce animateIn="fadeInUp">
                            <div className="flex flex-col items-start gap-y-3">
                                <h2 className="text-2xl tracking-tighter">
                                    Tu negocio se merece lo mejor
                                </h2>
                                <p className="text-gray-300">
                                    A día de hoy, los negocios necesitan contar
                                    con una faceta digital fuerte y no hay nada
                                    mejor que un equipo preparado para crearla y
                                    mantenerla.
                                </p>
                                <p className="mb-3 text-gray-300">
                                    En NovaScript hemos ayudado ya a más de 50
                                    pequeñas y medianas empresas a digitalizar y
                                    mejorar sus servicios para incrementar sus
                                    ventas y mejorar su productividad.
                                </p>
                                <Button
                                    asLink
                                    to="#contacto"
                                    variant="primary"
                                    hasIcon
                                >
                                    Te ayudamos
                                    <ArrowRightIcon className="size-4" />
                                </Button>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>

                <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
                    <div className="order-2 flex justify-center lg:order-first">
                        <ScrollAnimation animateOnce animateIn="fadeInUp">
                            <div className="flex flex-col items-start gap-y-3">
                                <h2 className="text-2xl tracking-tighter">
                                    Confianza, garantías y profesionalidad
                                </h2>
                                <p className="text-gray-300">
                                    Sabemos que tienes muchas agencias dónde
                                    elegir, sin embargo, nosotros somos la única
                                    que se compromete por escrito a entregar una
                                    serie de resultados en tiempo y forma.
                                </p>
                                <p className="mb-3 text-gray-300">
                                    Si no cumplimos no cobramos, tu seguridad es
                                    lo primero, así de sencillo.
                                </p>
                                <Button
                                    asLink
                                    to="#contacto"
                                    variant="primary"
                                    hasIcon
                                >
                                    Envíanos un mensaje
                                    <ArrowRightIcon className="size-4" />
                                </Button>
                            </div>
                        </ScrollAnimation>
                    </div>
                    <div>
                        <ScrollAnimation animateOnce animateIn="fadeInRight">
                            <ImageKitImage
                                className="rounded-xl"
                                alt="Aplicación web"
                                src={'/tr:ar-16-9,w-580,f-webp/web-design.jpg'}
                            />
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    )
}

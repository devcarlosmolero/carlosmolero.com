import Accordion, { AccordionPropsItem } from '~/components/organisms/Accordion'
import SectionHeading from './SectionHeading'
import Button from '~/components/atoms/Button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Faq() {
    const data: AccordionPropsItem[] = [
        {
            title: '¿Qué tipos de proyectos de software desarrolláis?',
            description: `Desarrollamos todo tipo de software, desde sitios web hasta aplicaciones móviles y software empresarial especializado para PYMES y Startups.
                La amplia experiencia, con múltiples tecnologías y lenguajes de programación, de nuestro equipo multidisciplinar nos permite afrontar cualquier
                reto que enfrente tu negocio.`,
        },
        {
            title: '¿Qué os diferencia de un equipo de desarrollo de software en plantilla?',
            description: `La principal diferencia es que con nosotros te vas a ahorrar quebraderos de cabeza. 
                Seguimos un modelo de contratación basado en el desarrollo de software como servicio,
                mediante una suscripción mensual o anual puedes disfrutar de nuestros servicios sin tener que ser nuestro empleador directo.`,
        },
        {
            title: '¿Cómo puedo contrataros?',
            description: `Empezar a trabajar con nosotros es tan fácil como enviarnos un mensaje. Al final de esta página tienes un formulario de contacto
                en el que nos puedes explicar qué necesitas, así mismo puedes utilizar el enlace de la barra de navegación para hablarnos por WhatsApp o el 
                del pie de página para agendar una videollamada.`,
        },
        {
            title: '¿Con qué tecnologías de desarrollo estáis más familiarizados?',
            description: `Somos bastante políglotas, por lo que este párrafo se nos queda algo pequeño para enumerar todas las tecnologías que manejamos. 
                Sin embargo, destacamos principalmente con React (Remix y Next.js), Go, todo tipo de CMS (Wordpress, Webflow, Framer etc.) y 
                Flutter para desarrollo móvil.`,
        },
        {
            title: '¿Ofrecéis servicios de mantenimiento y soporte post-lanzamiento?',
            description: `Por supuesto, de hecho es uno de nuestros valores fundamentales: mantener nuestro compromiso con el éxito de tu negocio a lo largo del tiempo.
                Pase lo que pase, vamos a estar ahí si necesitas cualquier tipo de actualización o si algo no funciona como debe.`,
        },
        {
            title: '¿Facturáis en base a presupuestos cerrados u horas trabajadas?',
            description: `Podemos trabajar bajo ambos modelos, siempre favoreceremos el que mejor te venga a ti como cliente. A diferencia de otras agencias, nosotros 
            sabemos estimar proyectos de forma sumamente precisa, por lo que podrás prever, de forma sencilla, cuánto costará tu desarrollo.`,
        },
    ]

    return (
        <section id="preguntas">
            <SectionHeading
                badgeLabel="Preguntas Frecuentes"
                title="Tu nos preguntas y<span class='font-accent tracking-normal'> nosotros te respondemos</span>"
                description="Te respondemos algunas preguntas que pueden estar rondándote la cabeza ahora mismo, siéntete libre de contactar si no encuentras la información que buscas"
            />
            <Accordion data={data} />
            <div className="flex items-center justify-center">
                <Button
                    className="mt-10"
                    asLink
                    to="#contacto"
                    hasIcon
                    variant="primary"
                >
                    Tengo más preguntas
                    <ArrowRightIcon className="size-4" />
                </Button>
            </div>
        </section>
    )
}

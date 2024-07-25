import Accordion, { AccordionPropsItem } from '~/components/organisms/Accordion'
import SectionHeading from './SectionHeading'
import Button from '~/components/atoms/Button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ScrollAnimation from 'react-animate-on-scroll'

export default function Faq({ data }: { data: AccordionPropsItem[] }) {
    return (
        <section id="preguntas">
            <ScrollAnimation once={true} animateIn="fadeIn">
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
            </ScrollAnimation>
        </section>
    )
}

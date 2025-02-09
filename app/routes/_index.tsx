import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_ES, SITE_TITLE_ES } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: 'Carlos Molero',
    title: 'Desarrollador y Psicólogo Clínico',
    intro: 'Estarás pensando... ¿Quién demonios es Carlos? Y aunque no lo estés pensando te lo voy a contar igual, porque mi <i>background</i> profesional es, como poco, peculiar.',
    paragraphs: [
        'Yo quería ser psicólogo, estudie <b>psicología en la Universidad de Malaga del 2016 al 2020</b> y luego obtuve el titulo de Psicólogo Clínico cursando el master por la UNED. Como algunas cosas en la vida, al final no pudo ser (spoiler: escaseaba el trabajo como psicologo).',
        'Dada esta situación, me dije: <i>"Oye, ya controlo algo de programación, es un campo que me gusta y parece que hay puestos de trabajo ¿Por qué no estudio una <b>ingeniería</b> a la vez?"</i> Y asi lo hice, a través de la <b>University of the People</b>.',
        '<b>Durante los últimos 8 años me he dedicado al desarrollo de aplicaciones y sitios web de forma <i>freelance</i></b> y es algo que me encanta, sin embargo, aun guardo la <b>esperanza de poder ejercer como psicólogo</b> y ayudar a las personas a sentirse bien.',
    ],
    button1: 'Perfil de Programador',
    button2: 'Perfil de Psicólogo',
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: `${SITE_TITLE_ES} - Carlos Molero`,
            description: SITE_DESCRIPTION_ES,
        }),
        {
            'script:ld+json': [getBusinessJsonLd('es')],
        },
    ]
}

export default function IndexPage() {
    return (
        <div className="flex w-full justify-center p-5 md:min-h-[100vh] md:items-center">
            <div className="rounded-lg p-5 shadow-lg md:p-10">
                <MultilingualIndexPage translation={translation} />
            </div>
        </div>
    )
}

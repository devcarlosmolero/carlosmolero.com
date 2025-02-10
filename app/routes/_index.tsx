import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_ES, SITE_TITLE_ES } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: 'Carlos Molero',
    title: 'Desarrollador y Psicólogo Clínico',
    intro: `Estarás pensando... ¿Quién demonios es Carlos? Y aunque no lo estés pensando te lo voy a contar igual, porque mi <i>background</i> profesional es, como poco, peculiar y porque hey, tú has decidido visitar mi página web.`,
    paragraphs: [
        `Yo quería ser psicólogo, me flipaba, sobre todo la parte relacionada con la biología y la investigación, así que estudié <b>psicología en la Universidad de Málaga del 2016 al 2020</b> y luego obtuve el título de Psicólogo Clínico cursando el máster por la UNED. Sin embargo, mi ejercicio fue breve e infructuoso, era un campo muy denostado en España y en el que escaseaban los puestos de trabajo.`,
        `Como estar en paro no me resultaba nada <i>sexy</i>, me dije: <i>"Oye, ya controlo algo de programación, es algo que disfruto y parece que hay puestos de trabajo ¿Por qué no estudio una <b>ingeniería</b> a la vez?"</i> Y así lo hice, a través de la <b>University of the People</b>.`,
        `<b>Durante los últimos 8 años me he dedicado al desarrollo de aplicaciones y sitios web de forma <i>freelance</i></b> y es algo que me encanta, pero aún guardo la <b>esperanza de poder ejercer como psicólogo</b> y ayudar a las personas a sentirse bien.`,
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

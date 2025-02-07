import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_ES, SITE_TITLE_ES } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: 'Carlos Molero',
    title: 'Desarrollador y Psicólogo Clínico',
    intro: '¡Hola! 👋 ¡Bienvenido a mi página web! 🌍✨ Me llamo Carlos y me gradué en Psicología por la Universidad de Málaga en 2020. Años más tarde, realicé un máster en Psicología Clínica online por la UNED, en el que adquirí las competencias para realizar psicoterapia. 🎓🧠',
    paragraphs: [
        'Aunque la Psicología siempre ha sido mi pasión ❤️, decidí graduarme también en Ingeniería de Software 💻 en la University of the People, un campo en el que sí encontré trabajo y al que me he dedicado durante los últimos ocho años. Sin embargo, nunca he dejado de divulgar y seguir mi camino como psicólogo.',
        'Actualmente me dedico a ambas cosas, pero te invito a conocer un poco más acerca de mis dos perfiles profesionales yendo a la página dedicada a cada uno de ellos.',
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
            'script:ld+json': [getBusinessJsonLd()],
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

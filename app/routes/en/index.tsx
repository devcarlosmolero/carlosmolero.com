import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_EN, SITE_TITLE_EN } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: 'Carlos Molero',
    title: 'Developer & Clinical Psychologist',
    intro: "Hi! 👋 Welcome to my website! 🌍✨ My name is Carlos, and I graduated in Psychology from the University of Málaga in 2020. Years later, I completed a master's degree in Clinical Psychology online at UNED, where I acquired the skills to practice psychotherapy. 🎓🧠",
    paragraphs: [
        'Although Psychology has always been my passion ❤️, I also decided to graduate in Software Engineering 💻 at the University of the People, a field in which I found a job and have been working for the past eight years. However, I have never stopped sharing knowledge and pursuing my path as a psychologist.',
        'Currently, I work in both fields, and I invite you to learn more about my two professional profiles by visiting the dedicated pages.',
    ],
    button1: 'Developer Profile',
    button2: 'Psychologist Profile',
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: `${SITE_TITLE_EN} - Carlos Molero`,
            description: SITE_DESCRIPTION_EN,
        }),
        {
            'script:ld+json': [getBusinessJsonLd('en')],
        },
    ]
}

export default function IndexPageEn() {
    return (
        <div className="flex w-full justify-center p-5 md:min-h-[100vh] md:items-center">
            <div className="rounded-lg p-5 shadow-lg md:p-10">
                <MultilingualIndexPage translation={translation} />
            </div>
        </div>
    )
}

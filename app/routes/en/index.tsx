import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_EN, SITE_TITLE_EN } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: 'Carlos Molero',
    title: 'Developer and Clinical Psychologist',
    intro: 'You might be wondering... Who on earth is Carlos? And even if you’re not wondering, I’m going to tell you anyway, because my professional background is, to say the least, peculiar.',
    paragraphs: [
        'I wanted to be a psychologist, I studied <b>psychology at the University of Malaga from 2016 to 2020</b> and then obtained the title of Clinical Psychologist by completing the master’s degree at UNED. Like some things in life, it didn’t work out in the end (spoiler: there was a lack of work as a psychologist).',
        'Given this situation, I said to myself: <i>"Hey, I already know a bit about programming, it’s a field I like, and it seems there are job opportunities. Why not study <b>engineering</b> at the same time?"</i> And so I did, through the <b>University of the People</b>.',
        '<b>For the last 8 years, I have been working as a freelance developer, creating applications and websites</b>, and it’s something I love. However, I still hold on to the <b>hope of being able to practice as a psychologist</b> and help people feel better.',
    ],
    button1: 'Programmer Profile',
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

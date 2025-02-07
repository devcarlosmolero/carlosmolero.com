import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_ZH, SITE_TITLE_ZH } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: 'Carlos Molero (卡洛斯·莫莱罗)',
    title: '软件工程师 & 临床心理学家',
    intro: '你好！👋 欢迎来到我的网站！🌍✨ 我叫卡洛斯，2020年毕业于马拉加大学心理学专业。几年后，我在UNED在线完成了临床心理学硕士学位，获得了心理治疗的专业技能。🎓🧠',
    paragraphs: [
        '虽然心理学一直是我的热情所在 ❤️，但我也决定在人民大学（University of the People）获得软件工程学位 💻，并在该领域找到了工作，过去八年来一直从事软件开发工作。然而，我从未停止传播心理学知识，并继续作为心理学家的道路。',
        '目前，我从事这两个领域的工作，欢迎你访问我的专业页面，了解更多信息。',
    ],
    button1: '开发者简介',
    button2: '心理学家简介',
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: `${SITE_TITLE_ZH} - Carlos Molero (卡洛斯·莫莱罗)`,
            description: SITE_DESCRIPTION_ZH,
        }),
        {
            'script:ld+json': [getBusinessJsonLd('zh')],
        },
    ]
}

export default function IndexPageCn() {
    return (
        <div className="flex w-full justify-center p-5 md:min-h-[100vh] md:items-center">
            <div className="rounded-lg p-5 shadow-lg md:p-10">
                <MultilingualIndexPage translation={translation} />
            </div>
        </div>
    )
}

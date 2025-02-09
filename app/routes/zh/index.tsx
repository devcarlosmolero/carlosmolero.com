import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_ZH, SITE_TITLE_ZH } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: '卡洛斯·莫莱罗',
    title: '开发者和临床心理学家',
    intro: '你可能会想……卡洛斯到底是谁？即使你不想知道，我也会告诉你，因为我的职业背景至少可以说是与众不同的。',
    paragraphs: [
        '我曾经想成为一名心理学家，<b>2016年至2020年在马拉加大学学习心理学</b>，然后通过UNED完成了临床心理学硕士课程，获得了临床心理学家的资格。但就像生活中的一些事情一样，最终没能如愿（剧透：心理学领域的工作机会很少）。',
        '鉴于这种情况，我对自己说：<i>"嘿，我已经掌握了一些编程知识，这是一个我喜欢的领域，而且似乎有很多工作机会。为什么不同时学习<b>工程学</b>呢？"</i>于是，我通过<b>人民大学</b>开始了学习。',
        '<b>在过去的8年里，我一直从事自由职业，开发应用程序和网站</b>，这是我非常热爱的工作。然而，我仍然怀有<b>希望，希望能够成为一名心理学家</b>，帮助人们感到更好。',
    ],
    button1: '程序员简介',
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

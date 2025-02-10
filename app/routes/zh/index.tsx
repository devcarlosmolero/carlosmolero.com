import { MetaFunction } from '@remix-run/cloudflare'
import MultilingualIndexPage from '~/components/pages/MultilingualIndexPage'
import { SITE_DESCRIPTION_ZH, SITE_TITLE_ZH } from '~/consts'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

const translation = {
    name: '卡洛斯·莫莱罗',
    title: '开发者和临床心理学家',
    intro: `你可能会想...卡洛斯到底是谁？即使你不想知道，我也会告诉你，因为我的职业背景至少可以说是很特别的，而且嘿，你决定访问我的网站。`,
    paragraphs: [
        `我曾经想成为一名心理学家，我对此非常着迷，尤其是与生物学和研究相关的部分，所以我从2016年到2020年在马拉加大学学习了<b>心理学</b>，然后通过UNED完成了硕士学位，获得了临床心理学家的头衔。然而，我的实践是短暂且不成功的，因为这在西班牙是一个非常不受重视的领域，工作机会很少。`,
        `由于失业对我来说并不那么<i>性感</i>，我对自己说：<i>"嘿，我已经掌握了一些编程知识，这是我喜欢的领域，而且似乎有很多工作机会。为什么不同时学习<b>工程学</b>呢？"</i> 于是我就这么做了，通过<b>人民大学</b>学习。`,
        `<b>在过去的8年里，我一直从事自由职业，开发应用程序和网站</b>，我非常喜欢这份工作，但我仍然怀有<b>希望，希望能够作为心理学家</b>帮助人们感觉更好。`,
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

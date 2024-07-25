import { MetaFunction } from '@remix-run/cloudflare'
import PostLayout from '~/components/pages/Slug/PostLayout'
import { IMAGE_KIT_BASE_URL } from '~/consts'
// @ts-expect-error vite import
import politicaDePrivacidadMd from '~/markdown/politica-de-privacidad.md?raw'
import { getBasicMetas } from '~/utils/metas'

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: 'Política de Privacidad',
            description: `Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu
información personal cuando visitas nuestro sitio web.`,
            img: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
            appendSiteName: true,
        }),
    ]
}

export default function PoliticaDePrivacidad() {
    return (
        <PostLayout
            post={{
                seoTitle: 'Política de Privacidad',
                seoDescription: `Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu
                información personal cuando visitas nuestro sitio web.`,
                content: politicaDePrivacidadMd,
                categories: [],
            }}
        />
    )
}

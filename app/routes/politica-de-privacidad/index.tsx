import { MetaFunction } from '@remix-run/cloudflare'
import PostLayout from '~/components/pages/Slug/PostLayout'
// @ts-expect-error vite import
import politicaDePrivacidadMd from '~/markdown/politica-de-privacidad.md?raw'

export const meta: MetaFunction = () => {
    return [
        { title: 'Política de Privacidad' },
        { name: 'title', content: 'Política de Privacidad' },
        {
            name: 'robots',
            content: 'noindex',
        },
    ]
}

export default function PoliticaDePrivacidad() {
    return (
        <PostLayout
            useFullWidth
            useSocialShare={false}
            post={
                {
                    seoTitle: 'Política de Privacidad',
                    seoDescription: `Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu
                información personal cuando visitas nuestro sitio web.`,
                    content: politicaDePrivacidadMd,
                    categories: [],
                } as any
            }
        />
    )
}

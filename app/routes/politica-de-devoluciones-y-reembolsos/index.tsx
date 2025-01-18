import { MetaFunction } from '@remix-run/cloudflare'
import PostLayout from '~/components/pages/Slug/PostLayout'
// @ts-expect-error vite import
import politicaDeDevolucionesYReembolsosdMd from '~/markdown/politica-de-devoluciones-y-reembolsos.md?raw'

export const meta: MetaFunction = () => {
    return [
        { title: 'Política de Devoluciones y Reembolsos' },
        { name: 'title', content: 'Política de Devoluciones y Reembolsos' },
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
                    seoTitle: 'Política de Devoluciones y Reembolsos',
                    seoDescription: `La política de devoluciones y reembolsos detalla cómo se gestionan los pagos por suscripción y las reglas aplicables.`,
                    content: politicaDeDevolucionesYReembolsosdMd,
                    categories: [],
                } as any
            }
        />
    )
}
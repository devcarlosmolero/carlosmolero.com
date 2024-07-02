import PostLayout from '~/components/templates/PostLayout'
// @ts-expect-error vite import
import politicaDePrivacidadMd from '~/markdown/politica-de-privacidad.md?raw'

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

import { redirect } from '@remix-run/cloudflare'

export function redirectWithToast(
    pathname: string,
    message: string,
    type: 'success' | 'error',
    alreadyHasParams = false
) {
    return redirect(
        `${pathname}${alreadyHasParams ? '&' : '?'}tm=${encodeURIComponent(message)}&tt=${encodeURIComponent(type)}`
    )
}

export function applyServiceRedirects(slug: string) {
    const redirects = {
        'desarrollo-de-producto-minimo-viable-mvp':
            'desarrollo-de-mvp-para-startups-y-emprendedores',
        'diseno-y-desarrollo-de-paginas-web':
            'diseno-y-desarrollo-de-paginas-web-y-tienda-online',
        'desarrollo-de-apps-ios-y-android': 'creacion-de-apps-ios-y-android',
        'software-a-medida-para-tu-negocio':
            'software-de-gestion-para-empresas',
        'creacion-de-software-para-empresas':
            'aplicaciones-a-medida-para-pequeñas-y-medianas-empresas',
    }

    //@ts-expect-error idk
    if (redirects[slug]) {
        //@ts-expect-error idk
        return redirect(`/${redirects[slug]}`, 301)
    }
}

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

export function getCacheControlHeader(
    duration: 'THREE_DAYS' | 'ONE_WEEK' | 'ONE_MONTH'
): string {
    let maxAge: number

    switch (duration) {
        case 'THREE_DAYS':
            maxAge = 60 * 60 * 24 * 3
            break
        case 'ONE_WEEK':
            maxAge = 60 * 60 * 24 * 7
            break
        case 'ONE_MONTH':
            maxAge = 60 * 60 * 24 * 30
            break
    }

    return `public, max-age=${maxAge}, s-maxage=${maxAge}`
}

export const serviceRedirects = {
    'desarrollo-de-producto-minimo-viable-mvp':
        'desarrollo-de-mvp-para-startups-y-emprendedores',
    'diseno-y-desarrollo-de-paginas-web':
        'diseno-y-desarrollo-de-paginas-web-y-tienda-online',
    'desarrollo-de-aplicaciones-ios-y-android':
        'creacion-de-apps-ios-y-android',
    'software-de-gestion-para-empresas':
        'software-a-medida-para-empresas-y-pymes',
    'software-a-medida-para-tu-negocio': 'software-de-gestion-para-empresas',
    'creacion-de-software-para-empresas':
        'aplicaciones-a-medida-para-pequenas-y-medianas-empresas',
    'software-automatizacion-procesos-pymes':
        'software-automatizacion-procesos-empresas',
    'aplicaciones-a-medida-para-pequenas-y-medianas-empresas':
        'software-de-gestion-empresarial',
    'software-a-medida-para-empresas-y-pymes':
        'desarrollo-de-software-a-medida',
    'creacion-de-aplicaciones-impulsadas-por-ia':
        'desarrollo-de-aplicaciones-impulsadas-por-ia',
    'gestion-cloud-para-empresas': 'servicios-cloud-para-empresas',
    'desarrollo-de-mvp-para-startups-y-emprendedores':
        'desarrollo-de-producto-minimo-viable',
    'creacion-de-apps-ios-y-android': 'desarrollo-de-apps-ios-y-android',
}


export const pageRedirects = {
    'nuestro-trabajo':'nuestros-clientes-y-casos-de-exito',
    'caso-de-exito-plataforma-de-agregacion-de-pagos-tuenix':'caso-de-exito-integrador-de-lenders-tuenix'
}

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

export const serviceRedirects = {
    'desarrollo-de-producto-minimo-viable-mvp':
        'desarrollo-de-mvp-para-startups-y-emprendedores',
    'diseno-y-desarrollo-de-paginas-web':
        'diseno-y-desarrollo-de-paginas-web-y-tienda-online',
    'desarrollo-de-aplicaciones-ios-y-android':
        'creacion-de-apps-ios-y-android',
    'software-a-medida-para-tu-negocio': 'software-de-gestion-para-empresas',
    'creacion-de-software-para-empresas':
        'aplicaciones-a-medida-para-pequenas-y-medianas-empresas',
    'software-automatizacion-procesos-pymes':
        'software-automatizacion-procesos-empresas',
}

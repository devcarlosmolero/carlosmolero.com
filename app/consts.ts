export const IMAGE_KIT_BASE_URL =
    'https://ik.imagekit.io/jgh04cawf/novascript-io'

export const SITE_STATIC_PATHS = [
    '',
    'politica-de-privacidad',
    'nuestro-trabajo',
    'contador-caracteres-seo',
    'generador-sitemap-url',
    'checklist-optimizacion-velocidad-web',
]
export const SITE_TITLE = 'Empresa de Software y Diseño Web'
export const SITE_DESCRIPTION = `Somos la empresa de desarrollo de software y diseño web líder en el sector, operamos en toda España, desde Málaga, 
apoyando a pequeñas y medianas empresas mediante la creación de software a medida, apps móviles iOS y Android, páginas web, tiendas online y 
el asesoramiento en materia tecnológica.`
export const SITE_NAME = 'NovaScript'
export const SITE_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://www.novascript.io'
        : 'https://www.localhost:3000'
export const SITE_EMAIL = 'hi@novascript.io'
export const SITE_PHONE_NUMBER = '+1(505)361-3359'
export const SITE_X_URL = 'https://www.x.com/novascriptio'
export const SITE_X_HANDLE = '@novascriptio'
export const SITE_FACEBOOK_URL =
    'https://www.linkedin.com/company/novascript-io/'
export const SITE_LINKEDIN_URL =
    'https://www.facebook.com/profile.php?id=61557708621835'
export const SITE_STREET_ADDRESS = 'C. Molina Lario'
export const SITE_ADDRESS_LOCALITY = 'Málaga'
export const SITE_ADDRESS_REGION = 'Málaga'
export const SITE_ADDRESS_POSTAL_CODE = '29015'

export const SITE_TOOLS = [
    {
        title: 'Contador de Caracteres SEO',
        pathname: 'contador-caracteres-seo',
    },
    {
        title: 'Generador de Sitemaps',
        pathname: 'generador-sitemap-url',
    },
    {
        title: 'Checklist Optimización Velocidad Página Web',
        pathname: 'checklist-optimizacion-velocidad-web',
    },
]

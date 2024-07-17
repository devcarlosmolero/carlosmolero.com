import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
    useSearchParams,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import Footer from './components/organisms/Footer'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import cn from 'classnames'
import { IMAGE_KIT_BASE_URL } from './consts'

//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/organisms/Navbar/Navbar'
import { getServices } from './actions/contentful'

export async function loader({ request }: LoaderFunctionArgs) {
    const isRoot = new URL(request.url).pathname === '/'

    const services = await getServices(10, [
        'fields.cardTitle',
        'fields.cardDescription',
        'fields.enabled',
        'fields.slug',
        'fields.iconString',
        'sys',
    ])

    return json({
        url: request.url,
        isRoot,
        services: services.sort((a, b) => (a === b ? 0 : a ? -1 : 1)),
    })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url, isRoot, services } = useLoaderData<typeof loader>()
    const [params, setParams] = useSearchParams()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    useEffect(() => {
        if (params.get('tt') === 'error') {
            toast.error(params.get('tm'))
        }
        if (params.get('tt') === 'success') {
            toast.success(params.get('tm'))
        }

        params.delete('tt')
        params.delete('tm')
        setParams({}, { preventScrollReset: true, replace: true })
    }, [params, setParams])

    return (
        <html lang="es">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={`${IMAGE_KIT_BASE_URL}/tr:w-28,ar-1-1/favicon.png`}
                />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:locale" content="es" />
                <Meta />
                <Links />
            </head>
            <body
                className={cn(
                    'bg-neutral-950 lg:overflow-y-auto',
                    isNavbarOpen ? 'overflow-y-hidden' : 'overflow-auto'
                )}
            >
                <main>
                    <Navbar
                        services={services}
                        onOpen={() => setIsNavbarOpen(true)}
                        onClose={() => setIsNavbarOpen(false)}
                        isRoot={isRoot}
                    />
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <Footer />
                </main>
                <ToastContainer
                    position="bottom-right"
                    limit={3}
                    stacked
                    theme="colored"
                />
            </body>
        </html>
    )
}

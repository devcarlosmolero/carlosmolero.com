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
import Navbar from '~/components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import cl from 'classnames'

import stylesheet from '~/tailwind.css?url'
import 'react-toastify/dist/ReactToastify.css'

export async function loader({ request }: LoaderFunctionArgs) {
    const isRoot = new URL(request.url).pathname === '/'

    return json({
        url: request.url,
        isRoot,
    })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url, isRoot } = useLoaderData<typeof loader>()
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
                    href="https://ik.imagekit.io/jgh04cawf/novascriptio/tr:w-16,ar-1-1,f-webp/favicon.png"
                />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:locale" content="es" />
                <Meta />
                <Links />
            </head>
            <body
                className={cl(
                    'bg-neutral-950 lg:overflow-y-auto',
                    isNavbarOpen ? 'overflow-y-hidden' : 'overflow-auto'
                )}
            >
                <main>
                    <Navbar
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

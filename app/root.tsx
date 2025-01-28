import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    redirect,
    useLoaderData,
    useSearchParams,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import Footer from './components/organisms/Footer'
import { Fragment, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import cn from 'classnames'
import { IMAGE_KIT_BASE_URL, SITE_BASE_URL } from './consts'
import Navbar from './components/organisms/Navbar'

//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'
import 'react-toastify/dist/ReactToastify.css'
import Services from './actions/services'
import { ServiceCard } from './types/contentful'
import Container from './components/templates/Container'
import Button from './components/atoms/Button'
import { ChevronLeft } from 'lucide-react'

export async function loader({ request }: LoaderFunctionArgs) {
    const pathname = new URL(request.url).pathname
    const hostname = new URL(request.url).hostname
    const isRoot = pathname === '/'
    const hasWWW = new URL(request.url).hostname.includes('www')

    if (!hasWWW) {
        return redirect(
            `${
                !hostname.includes('localhost')
                    ? SITE_BASE_URL
                    : 'http://www.localhost:3000'
            }${pathname}`,
            { status: 301 }
        )
    }

    const services = await Services.all().get()

    return json({
        url: request.url,
        isRoot,
        services: services?.sort((a, b) => (a === b ? 0 : a ? -1 : 1)),
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
        const newParams = new URLSearchParams(params)

        if (params.get('tt') === 'error') {
            toast.error(params.get('tm'))
        }
        if (params.get('tt') === 'success') {
            toast.success(params.get('tm'))
        }

        newParams.delete('tt')
        newParams.delete('tm')
        setParams(newParams, { preventScrollReset: true, replace: true })
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
                        onOpen={() => setIsNavbarOpen(true)}
                        onClose={() => setIsNavbarOpen(false)}
                        isRoot={isRoot}
                    />
                    {params.get('source') &&
                        params.get('source') === 'rank' && (
                            <Fragment>
                                {' '}
                                <div className="fixed z-50 bottom-2 left-5 text-white  py-3">
                                <a  href={params.get("prevUrl")!} className='text-xs animate-pulse !py-2 px-4 flex items-center gap-x-2 text-white bg-orange-500 rounded-full'>
                                    <ChevronLeft className='size-4'/>
                                    Volver a Rank</a>
                                </div>
                                <div className="pt-10"></div>
                            </Fragment>
                        )}
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <Footer services={services as ServiceCard[]} />
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

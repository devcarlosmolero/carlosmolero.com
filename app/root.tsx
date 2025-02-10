import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    redirect,
    useLoaderData,
} from '@remix-run/react'

//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'
import { SITE_BASE_URL } from './consts'

export async function loader({ request }: LoaderFunctionArgs) {
    const pathname = new URL(request.url).pathname
    const hostname = new URL(request.url).hostname
    const hasWWW = new URL(request.url).hostname.includes('www')
    const lang = pathname.split('/')[1] || 'es'

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

    return json({ url: request.url, lang })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url, lang } = useLoaderData<typeof loader>()

    return (
        <html lang={lang}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={`/carlos-molero.png`}
                />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:locale" content={lang} />
                <Meta />
                <Links />
            </head>
            <body>
                <main>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                </main>
            </body>
        </html>
    )
}

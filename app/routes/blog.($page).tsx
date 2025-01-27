import { Fragment } from 'react/jsx-runtime'
import Page from '~/components/templates/Page'
import { Post } from '~/types/contentful'
import BlogPost from '~/components/organisms/BlogPost'
import { getBasicMetas } from '~/utils/metas'
import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/cloudflare'
import { getCacheControlHeader } from '~/utils/server'
import Posts from '~/actions/posts'
import { useLoaderData } from '@remix-run/react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '~/components/atoms/ui/pagination'
import SectionHeading from '~/components/pages/Home/SectionHeading'

export async function loader({ request }: LoaderFunctionArgs) {
    const page: number = !isNaN(
        Number(new URL(request.url).pathname.split('/').pop())
    )
        ? Number(new URL(request.url).pathname.split('/').pop())
        : 0

    const posts = await Posts.all(9, 9 * page)
        .formatDates()
        .appendHeaderImgUrls()
        .get()

    const totalCount = await Posts.count()
    const totalPages = Math.ceil(totalCount / 9)

    return json({
        posts,
        totalPages,
        page,
        headers: {
            'Cache-Control': getCacheControlHeader('THREE_DAYS'),
        },
    })
}

// @ts-expect-error idk
export const meta: MetaFunction = (payload: { data: { page: number } }) => {
    const { page } = payload.data

    return [
        ...getBasicMetas({
            title: 'Nuestro Blog Sobre Diseño Web y Desarrollo de Software',
            description: `Explora las últimas tendencias y herramientas en diseño web y desarrollo de software. Aprende a crear sitios impactantes con WordPress, Webflow y Framer,
y descubre cómo implementar soluciones personalizadas como CRM y sistemas escalables para potenciar tu negocio.`,
            robots: page > 0 ? 'noindex' : undefined,
        }),
    ]
}

export default function BlogPage() {
    const {
        posts,
        totalPages,
        page: currentPage,
    } = useLoaderData<typeof loader>()
    const pages = Array.from(
        { length: totalPages as number },
        (_, index) => index
    )

    return (
        <Fragment>
            <Page className="gap-y-12">
                {currentPage === 0 && (
                    <div className="flex flex-col gap-y-2">
                        <SectionHeading
                            title="Nuestro Blog Sobre Diseño Web y Desarrollo de Software"
                            description="Explora las últimas tendencias y herramientas en diseño web y desarrollo de software. Aprende a crear sitios impactantes con WordPress, Webflow y Framer, y descubre cómo implementar soluciones personalizadas como CRM y sistemas escalables para potenciar tu negocio."
                        />
                    </div>
                )}

                <div id="posts" className="grid gap-5 gap-y-5 md:grid-cols-2">
                    {posts &&
                        (posts as Post[]).map((post: Post, index: number) => (
                            <BlogPost key={index} post={post} />
                        ))}
                </div>
                <Pagination className="mt-12">
                    <PaginationContent>
                        {currentPage >= 1 && (
                            <PaginationItem>
                                <PaginationPrevious
                                    href={`/blog/${currentPage - 1}`}
                                />
                            </PaginationItem>
                        )}
                        {pages.map((page, index) => {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        className="atypical-link rounded-full"
                                        isActive={currentPage === page}
                                        href={`/blog${page === 0 ? '' : `/${page}`}`}
                                    >
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}
                        {currentPage < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationNext
                                    href={`/blog/${currentPage + 1}`}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </Page>
        </Fragment>
    )
}

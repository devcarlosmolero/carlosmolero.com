import { Link } from '@remix-run/react'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Post } from '~/types/contentful'
import Contact from '../pages/shared/Contact'
import cn from 'classnames'
import Page from './Page'
import Accordion from '../organisms/Accordion'
import ImageContainer from '../atoms/ImageContainer'

export function SideBarContent({
    sections,
}: {
    sections: { id: string; text: string }[]
}) {
    return (
        <div className="flex flex-col gap-y-2 text-gray-300">
            {sections?.map((section, index) => {
                return (
                    <Link
                        className="flex items-start underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300"
                        to={`#${section.id}`}
                        key={index}
                    >
                        {section.text}
                    </Link>
                )
            })}
        </div>
    )
}

export default function PostLayout({ post }: { post: Post }) {
    function hasSidebar() {
        return Boolean(post.headerImgUrl || post.sections)
    }

    return (
        <Page
            className={cn(
                'flex flex-col items-center justify-center',
                hasSidebar() && 'md:mb-[400px]'
            )}
        >
            <div
                className={cn(
                    'grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12',
                    !hasSidebar() && '!flex'
                )}
            >
                <div
                    className={cn(
                        'md:top-[100px] lg:sticky lg:col-span-4 lg:h-[200px]',
                        !hasSidebar() && 'hidden'
                    )}
                >
                    {hasSidebar() && (
                        <div className="flex w-full flex-col gap-y-2 lg:rounded-xl lg:border lg:border-zinc-800 lg:bg-neutral-900 lg:p-5">
                            {post.headerImgUrl && (
                                <ImageContainer
                                    containerClassName="aspect-w-16 aspect-h-9 w-full rounded-xl"
                                    className="rounded-xl"
                                    alt={post.seoTitle}
                                    src={post.headerImgUrl}
                                />
                            )}
                            <div className="lg:hidden">
                                <Accordion
                                    data={[
                                        {
                                            question: 'Tabla de contenidos',
                                            answer: (
                                                <SideBarContent
                                                    sections={post.sections!}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                            <h2 className="mt-3 hidden text-2xl tracking-tighter md:block">
                                Tabla de contenidos
                            </h2>
                            <div className="hidden lg:flex">
                                <SideBarContent sections={post.sections!} />
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        'lg:col-span-8',
                        !hasSidebar() && 'max-w-[765px]'
                    )}
                >
                    <div className="mb-8 flex flex-col gap-y-3">
                        <h1 className="text-4xl font-bold">{post.seoTitle}</h1>
                        {post.createdAt && post.readingTime && (
                            <div className="flex flex-col gap-y-1 text-gray-400">
                                <p suppressHydrationWarning>
                                    Publicado el {post.formattedCreatedAt!} |{' '}
                                    {post.readingTime} min.
                                </p>
                                <p></p>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {post.categories.map(
                                (category: string, index: number) => {
                                    return (
                                        <p
                                            key={index}
                                            className="rounded-xl bg-neutral-900 px-3 py-1 text-sm"
                                        >
                                            {category}
                                        </p>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <article className="prose prose-dark w-full !max-w-none prose-img:w-full prose-img:rounded-xl [&_h2:first-of-type]:mt-0">
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSlug, rehypeRaw]}
                        >
                            {post.content}
                        </Markdown>
                    </article>
                    <div className="mt-24">
                        <Contact />
                    </div>
                </div>
            </div>
        </Page>
    )
}

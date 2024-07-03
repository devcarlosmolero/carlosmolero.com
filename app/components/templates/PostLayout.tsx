import { LinkIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Post } from '~/types/contentful'
import Contact from '../pages/shared/Contact'
import cl from 'classnames'
import Page from './Page'

export default function PostLayout({ post }: { post: Post }) {
    function hasSidebar() {
        return Boolean(post.headerImgUrl || post.sections)
    }

    return (
        <Page
            className={cl(
                'flex flex-col items-center justify-center',
                hasSidebar() && 'md:mb-[400px]'
            )}
        >
            <div
                className={cl(
                    'grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-12',
                    !hasSidebar() && '!flex'
                )}
            >
                <div
                    className={cl(
                        'md:sticky md:top-[100px] md:col-span-4 md:h-[200px]',
                        !hasSidebar() && 'hidden'
                    )}
                >
                    {hasSidebar() && (
                        <div className="flex w-full flex-col gap-y-2">
                            {post.headerImgUrl && (
                                <img
                                    className="rounded-xl"
                                    alt={post.seoTitle}
                                    src={post.headerImgUrl}
                                />
                            )}
                            <h2 className="mt-3 hidden text-2xl tracking-tighter md:block">
                                Tabla de contenidos
                            </h2>
                            <div className="hidden flex-col gap-y-1 text-gray-300 md:flex">
                                {post.sections?.map((section, index) => {
                                    return (
                                        <Link
                                            className="flex items-start gap-x-2 hover:text-violet-300"
                                            to={`#${section.id}`}
                                            key={index}
                                        >
                                            <LinkIcon className="size-4 min-w-[16px]" />
                                            {section.text}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={cl(
                        'md:col-span-8',
                        !hasSidebar() && 'max-w-[765px]'
                    )}
                >
                    <div className="mb-8 flex flex-col gap-y-3">
                        <h1 className="text-4xl font-bold">{post.seoTitle}</h1>
                        {post.createdAt && post.readingTime && (
                            <div className="flex flex-col gap-y-1 text-gray-400">
                                <p suppressHydrationWarning>
                                    Publicado el{' '}
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString()}{' '}
                                    | {post.readingTime} min.
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
                    <article className="prose prose-dark w-full !max-w-none prose-img:w-full [&_h2:first-of-type]:mt-0">
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

import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Post } from '~/types/contentful'
import cn from 'classnames'
import DashedLink from '~/components/atoms/DashedLink'
import Page from '~/components/templates/Page'
import Contact from '../shared/Contact'
import Accordion from '~/components/organisms/Accordion'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import BlogPost from '~/components/organisms/BlogPost'
import SectionHeading from '../Home/SectionHeading'
import { Facebook, Linkedin, TwitterX, Whatsapp } from 'react-bootstrap-icons'
import { SITE_BASE_URL } from '~/consts'

export function SideBarContent({
    sections,
}: {
    sections: { id: string; text: string; level: number }[]
}) {
    return (
        <div className="flex flex-col gap-y-2 text-gray-300">
            {sections?.map((section, index) => {
                return (
                    <DashedLink
                        className={cn(
                            section.level > 2 && 'ml-3 text-base',
                            section.level === 2 && 'font-semibold'
                        )}
                        to={`#${section.id}`}
                        key={index}
                    >
                        {section.text}
                    </DashedLink>
                )
            })}
        </div>
    )
}

export default function PostLayout({
    post,
    relatedPostsByCategory,
    useFullWidth = false,
    useSocialShare = true,
}: {
    post: Post
    relatedPostsByCategory?: Post[]
    useFullWidth?: boolean
    useSocialShare?: boolean
}) {
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
                                <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 w-full rounded-xl">
                                    <FakeBackgroundImagePrimitive.Image
                                        className="rounded-xl"
                                        src={post.headerImgUrl}
                                        alt={post.seoTitle}
                                    />
                                </FakeBackgroundImagePrimitive.Container>
                            )}
                            <div className="lg:hidden">
                                <Accordion
                                    defaultValue="0"
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
                        !hasSidebar() && !useFullWidth && 'max-w-[765px]'
                    )}
                >
                    <div className="mb-8 flex flex-col gap-y-3">
                        <h1 className="text-4xl font-bold">{post.seoTitle}</h1>
                        {useSocialShare && (
                            <div className="mb-2 mt-1 flex flex-wrap gap-2 text-white">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${SITE_BASE_URL}/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-blue-500 p-2"
                                >
                                    <Facebook className="size-4" />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${SITE_BASE_URL}/${post.slug}&text=${post.seoTitle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-black p-2"
                                >
                                    <TwitterX className="size-4" />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${SITE_BASE_URL}/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-blue-800 p-2"
                                >
                                    <Linkedin className="size-4" />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.seoTitle} ${SITE_BASE_URL}/${post.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-green-600 p-2"
                                >
                                    <Whatsapp className="size-4" />
                                </a>
                            </div>
                        )}
                        {post.createdAt && post.readingTime && (
                            <div className="flex flex-col gap-y-1 text-gray-400">
                                <p suppressHydrationWarning>
                                    Publicado el {post.formattedCreatedAt!} |{' '}
                                    {post.readingTime} min.
                                </p>
                            </div>
                        )}
                        {post.categories && post.categories.length > 0 && (
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
                        )}
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
                    {relatedPostsByCategory && (
                        <div className="mt-24 flex flex-col gap-y-5">
                            <SectionHeading title="Quizás te pueda interesar" />
                            <div className="grid grid-cols-1">
                                {relatedPostsByCategory.map(
                                    (relatedPost, index) => (
                                        <BlogPost
                                            key={index}
                                            post={relatedPost}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    )
}

import { Post } from '~/types/contentful'
import Card from '../templates/Card'
import Badge from '../atoms/Badge'
import { Link } from '@remix-run/react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import ImageKitImage from '../atoms/ImageKitImage'

export default function BlogPost({ post }: { post: Post }) {
    return (
        <Card className="h-full !p-0">
            <Link reloadDocument to={`/${post.slug}`}>
                <div className="grid h-full grid-cols-1 gap-x-0 rounded-xl md:grid-cols-12">
                    <div className="min-h-[180px] md:col-span-4 md:min-h-[220px]">
                        <div
                            className="h-full w-full rounded-t-xl md:rounded-l-xl md:rounded-r-none"
                            style={{
                                backgroundImage: `url(${post.headerImgUrl})`,
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    </div>
                    <div className="flex flex-col gap-y-3 p-5 md:col-span-8">
                        <div className="grid grid-cols-2">
                            <Badge className="!px-2 !py-2 md:!px-3">
                                <div className="flex gap-x-2">
                                    <ImageKitImage
                                        alt={post.seoTitle}
                                        src="/tr:f-webp,ar:1-1,w-20/carlos-molero.jpg"
                                        className="h-[20px] w-[20px] rounded-full"
                                    />
                                    <p>Carlos M.</p>
                                </div>
                            </Badge>
                            <Link
                                reloadDocument
                                className="flex items-center justify-end gap-x-2 hover:text-violet-300"
                                to={`/${post.slug}`}
                            >
                                <p>Leer artículo</p>
                                <ArrowUpRightIcon className="size-4" />
                            </Link>
                        </div>
                        <h3 className="text-xl font-semibold">
                            {post.seoTitle}
                        </h3>
                        <p className="text-gray-300">{post.seoDescription}</p>
                    </div>
                </div>
            </Link>
        </Card>
    )
}

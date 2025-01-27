import { Link } from '@remix-run/react'
import { FakeBackgroundImagePrimitive } from '../atoms/FakeBackgroundImagePrimitive'
import Overlay from '../atoms/Overlay'
import { Project } from '~/types/contentful'
import cn from 'classnames'
import { ChevronRightIcon, LinkIcon } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

export default function PortfolioProject({ project }: { project: Project }) {
    return (
        <Fragment>
            <FakeBackgroundImagePrimitive.Container
                className={cn(
                    'aspect-h-9 aspect-w-16 rounded-xl border-2',
                    project.url === '#contacto'
                        ? 'border-violet-300'
                        : 'border-transparent'
                )}
            >
                <FakeBackgroundImagePrimitive.Image
                    src={project.imgUrl}
                    alt={project.imgUrl}
                />
                <Overlay className="bg-black/80 hover:bg-black/70">
                    <div className="flex h-full w-full flex-col items-start justify-start">
                        <div className="p-5">
                            {' '}
                            <h2 className="text-start sm:text-xl">
                                {project.seoTitle}
                            </h2>
                            {project.url !== '#contacto' && (
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {project.categories.map(
                                        (category, index) => {
                                            return (
                                                <p className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1 text-[10px] sm:text-xs">
                                                    #{category}
                                                </p>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex h-full w-full items-end">
                            <div
                                className="w-full"
                                style={{ marginTop: 'auto' }}
                            >
                                {project.url === '#contacto' && (
                                    <div className="bg-violet-600/80 px-5 text-start">
                                        <Link
                                            to="#contacto"
                                            className="flex w-full items-center gap-2 py-3 text-sm transition-all duration-500 hover:translate-x-3"
                                        >
                                            <span>Contacta con nosotros</span>{' '}
                                            <ChevronRightIcon className="size-5" />
                                        </Link>
                                    </div>
                                )}
                                {project.url !== '#contacto' && (
                                    <div className="flex items-center bg-violet-700 px-5 text-start text-sm">
                                        {project.successCaseSlug && (
                                            <div className="w-full">
                                                <Link
                                                    to={`/${project.successCaseSlug}`}
                                                    className="flex w-full items-center gap-2 py-3 transition-all duration-500 hover:translate-x-3"
                                                >
                                                    <span>
                                                        Leer caso de éxito
                                                    </span>{' '}
                                                    <ChevronRightIcon className="size-5" />
                                                </Link>
                                            </div>
                                        )}
                                        {!project.successCaseSlug && (
                                            <div className="w-full h-[44px]"></div>
                                        )}
                                        <a
                                            href={project.url}
                                            target={'_blank'}
                                            className="rounded-full bg-white p-2 text-black transition-all duration-500 hover:bg-black hover:text-white"
                                        >
                                            <LinkIcon className="size-3" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Overlay>
            </FakeBackgroundImagePrimitive.Container>
        </Fragment>
    )
}

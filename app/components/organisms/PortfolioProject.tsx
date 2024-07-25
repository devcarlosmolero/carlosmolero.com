import { Link } from '@remix-run/react'
import { FakeBackgroundImagePrimitive } from '../atoms/FakeBackgroundImagePrimitive'
import Overlay from '../atoms/Overlay'
import { Project } from '~/types/contentful'
import { Fragment } from 'react/jsx-runtime'
import Button from '../atoms/Button'

export default function PortfolioProject({ project }: { project: Project }) {
    return (
        <Link
            to={project.url}
            target={project.url === '#contacto' ? '_self' : '_blank'}
            rel="noreferrer"
        >
            <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 rounded-xl">
                <FakeBackgroundImagePrimitive.Image
                    src={project.imgUrl}
                    alt={project.imgUrl}
                    className="cursor-pointer transition-all duration-500 hover:scale-105"
                />
                <Overlay className="pointer-events-none flex flex-col items-center justify-center gap-y-5 bg-black/60 p-5 text-center">
                    <h2 className="text-center text-xl">{project.seoTitle}</h2>
                    <div>
                        {project.url !== '#contacto' && (
                            <Fragment>
                                {project.categories.map((category, index) => (
                                    <p
                                        className="mx-1 my-1 inline-block w-fit rounded-xl bg-neutral-900 px-3 py-1 text-sm"
                                        key={index}
                                    >
                                        {category}
                                    </p>
                                ))}
                            </Fragment>
                        )}
                        {project.url === '#contacto' && (
                            <Button variant="accent">
                                {project.categories[0]}
                            </Button>
                        )}
                    </div>
                </Overlay>
            </FakeBackgroundImagePrimitive.Container>
        </Link>
    )
}

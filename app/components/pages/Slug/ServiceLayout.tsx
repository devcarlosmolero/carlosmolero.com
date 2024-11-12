import { Service, ServiceCard } from '~/types/contentful'
import Markdown from 'react-markdown'
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Button from '~/components/atoms/Button'
import AccentCard from '~/components/templates/AccentCard'
import Card from '~/components/templates/Card'
import Page from '~/components/templates/Page'
import SectionHeading from '../Home/SectionHeading'
import Contact from '../shared/Contact'
import Accordion from '~/components/organisms/Accordion'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import ServicesIconMap from '~/components/atoms/ServicesIconMap'
import { QuestionCircle } from 'react-bootstrap-icons'
import ImageKitImage from '~/components/atoms/ImageKitImage'

export default function ServiceLayout({
    service,
    cards,
}: {
    service: Service
    cards: ServiceCard[]
}) {
    return (
        <Page>
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex flex-col gap-y-5">
                    <p className="rounded-xl bg-neutral-800 px-2 py-3 text-white">
                        😉 Te podríamos soltar una turra insufrible en la página
                        de servicio, pero creemos que es importante respetar tu
                        tiempo.
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tighter">
                        {service.seoTitle}
                    </h1>
                    <div className="flex w-full justify-center">
                        <div className="prose prose-dark w-full max-w-full prose-img:w-full [&_h2:first-of-type]:mt-0">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeSlug, rehypeRaw]}
                            >
                                {service.content}
                            </Markdown>
                        </div>
                    </div>
                    <Button
                        className="my-3"
                        asLink
                        to="#contacto"
                        hasIcon
                        variant="primary"
                    >
                        Pide presupuesto <ArrowRightIcon className="size-4" />
                    </Button>
                    <h4 className="text-2xl font-semibold tracking-tighter">
                        🔮 Sabíamos que Tendrías Preguntas...
                    </h4>

                    <Accordion data={service.faqs as any} />
                    <a
                        className="flex items-center gap-x-2 text-gray-300 underline underline-offset-4"
                        href="#contacto"
                    >
                        <QuestionCircle className="size-4" /> Tengo más
                        preguntas
                    </a>
                </div>
                <FakeBackgroundImagePrimitive.Container className="aspect-w-9 rounded-xl md:block md:h-[900px]">
                    <FakeBackgroundImagePrimitive.Image
                        alt={service.seoTitle}
                        src={service.headerImgUrl}
                        className="rounded-xl"
                    />
                </FakeBackgroundImagePrimitive.Container>
                <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 block rounded-xl md:hidden">
                    <FakeBackgroundImagePrimitive.Image
                        alt={service.seoTitle}
                        src={service.headerImgUrl}
                        className="rounded-xl"
                    />
                </FakeBackgroundImagePrimitive.Container>
            </div>
            <div>
                <AccentCard>
                    <div className="grid h-full items-center justify-center gap-y-3 md:grid-cols-2">
                        <div className="hidden md:block">
                            <ImageKitImage
                                className="-mb-5 w-full max-w-[500px]"
                                src={'/astronaut.svg'}
                                alt="astronaut"
                            />
                        </div>
                        <div className="my-5 flex max-w-[600px] flex-col items-center gap-y-5 text-center md:items-end md:text-end">
                            <h3 className="text-3xl font-bold md:text-5xl">
                                {service.adTitle}
                            </h3>
                            <p className="text-md md:text-lg">
                                {service.adDescription}
                            </p>
                            <Button
                                hasIcon
                                asLink
                                to="https://cal.com/carlosmta/30min"
                                props={
                                    {
                                        target: '_blank',
                                    } as React.LinkHTMLAttributes<HTMLLinkElement>
                                }
                                variant="accent"
                            >
                                Agenda una videollamada
                                <CalendarDaysIcon className="size-4" />
                            </Button>
                        </div>
                    </div>
                </AccentCard>
            </div>
            <div className="flex flex-col">
                <div>
                    <SectionHeading
                        title="Descubre Más Servicios"
                        description="Date un voltio por nuestro sitio web y descubre como podemos ayudarte, te lo explicamos en un par de párrafos, sin calentarte la cabeza."
                    />
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-3">
                    {cards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                className="transition-scale flex h-full flex-col items-start gap-x-3 gap-y-3 rounded-xl duration-500 hover:scale-105"
                            >
                                <div className="grid w-full grid-cols-2 items-center">
                                    <div className="w-full">
                                        {/* @ts-expect-error idk */}
                                        {ServicesIconMap[card.iconString]}
                                    </div>
                                    {card.enabled && (
                                        <div className="flex justify-end">
                                            <Link
                                                reloadDocument
                                                className="flex items-center justify-end gap-x-2 hover:text-violet-300"
                                                to={`/${card.slug}`}
                                            >
                                                <p>Saber más</p>
                                                <ArrowUpRightIcon className="size-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 flex flex-col gap-y-3">
                                    <h3 className="text-xl">
                                        {card.cardTitle}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        {card.cardDescription}
                                    </p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
            <div>
                <Contact />
            </div>
        </Page>
    )
}

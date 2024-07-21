import { Service, ServiceCard } from '~/types/contentful'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import Badge from '~/components/atoms/Badge'
import Button from '~/components/atoms/Button'
import Separator from '~/components/atoms/Separator'
import AccentCard from '~/components/templates/AccentCard'
import Card from '~/components/templates/Card'
import Page from '~/components/templates/Page'
import SectionHeading from '../Home/SectionHeading'
import Contact from '../shared/Contact'
import Accordion from '~/components/organisms/Accordion'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import ServicesIconMap from '~/components/atoms/ServicesIconMap'

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
                <div className="flex flex-col gap-y-3">
                    <Badge label="Servicio" />
                    <h1 className="text-4xl font-semibold tracking-tighter">
                        {service.seoTitle}
                    </h1>
                    <p>{service.seoDescription}</p>
                    <Button
                        className="mt-3"
                        asLink
                        to="#contacto"
                        hasIcon
                        variant="primary"
                    >
                        Pide presupuesto <ArrowRightIcon className="size-4" />
                    </Button>
                </div>
                <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 rounded-xl">
                    <FakeBackgroundImagePrimitive.Image
                        alt={service.seoTitle}
                        src={service.headerImgUrl}
                        className="rounded-xl"
                    />
                </FakeBackgroundImagePrimitive.Container>
            </div>
            <Separator />
            <div className="flex w-full justify-center">
                <div className="prose prose-dark w-full max-w-[765px] prose-img:w-full [&_h2:first-of-type]:mt-0">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSlug, rehypeRaw]}
                    >
                        {service.content}
                    </Markdown>
                </div>
            </div>
            <div>
                <SectionHeading
                    badgeLabel="FAQs"
                    title="Preguntas Frecuentes"
                />
                <Accordion data={service.faqs} />
                <div className="flex items-center justify-center">
                    <Button
                        className="mt-10"
                        asLink
                        to="#contacto"
                        hasIcon
                        variant="primary"
                    >
                        Tengo más preguntas
                        <ArrowRightIcon className="size-4" />
                    </Button>
                </div>
            </div>
            <div>
                <AccentCard>
                    <div className="flex h-full flex-col items-center justify-center gap-y-3 text-center">
                        <div className="flex max-w-[600px] flex-col items-center gap-y-5">
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
                    <SectionHeading title="Descubre Más Servicios" />
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

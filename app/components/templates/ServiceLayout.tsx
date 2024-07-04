import { Service } from '~/types/contentful'
import Page from './Page'
import Badge from '../atoms/Badge'
import Separator from '../atoms/Separator'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Contact from '../pages/shared/Contact'
import SectionHeading from '../pages/Home/SectionHeading'
import Accordion from '../organisms/Accordion'
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Button from '../atoms/Button'
import AccentCard from './AccentCard'

export default function ServiceLayout({ service }: { service: Service }) {
    return (
        <Page>
            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
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
                <div>
                    <img
                        className="aspect-video rounded-xl"
                        alt={service.seoTitle}
                        src={service.headerImgUrl}
                    />
                </div>
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
                <AccentCard className="!min-h-[500px]">
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
                                to="https://cal.com/carlosmolero/30min"
                                props={
                                    {
                                        target: '_blank',
                                    } as React.LinkHTMLAttributes<HTMLLinkElement>
                                }
                                className="lg:!py-2"
                                variant="accent"
                            >
                                Agenda una videollamada
                                <CalendarDaysIcon className="size-4" />
                            </Button>
                        </div>
                    </div>
                </AccentCard>
            </div>
            <div>
                <Contact />
            </div>
        </Page>
    )
}

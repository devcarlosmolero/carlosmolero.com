import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Send } from 'react-bootstrap-icons'
import Markdown from 'react-markdown'
import JobOffers from '~/actions/jobOffers'
import Button from '~/components/atoms/Button'
import JobOfferForm from '~/components/organisms/JobOfferForm'
import Page from '~/components/templates/Page'
import { JobOffer } from '~/types/contentful'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'

export async function loader({ request }: LoaderFunctionArgs) {
    const slug = new URL(request.url).pathname.split('/').pop()
    const jobOffer = (
        (await JobOffers.getBySlug(slug!).formatDates().get()) as JobOffer[]
    )[0]

    return json({ jobOffer })
}

//@ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { jobOffer: JobOffer }
}) => {
    return [
        ...getBasicMetas({
            title: `${payload.data.jobOffer.seoTitle}`,
            description: payload.data.jobOffer.seoDescription,
        }),
        {
            'script:ld+json': [getBusinessJsonLd()],
        },
    ]
}

export default function JobOffersPage() {
    const { jobOffer } = useLoaderData<typeof loader>()

    return (
        <Page className="flex flex-col justify-center">
            <div className="flex flex-col">
                <div className="flex flex-col space-y-5">
                    <h1 className="w-full text-4xl font-semibold tracking-tighter md:text-6xl">
                        {jobOffer.seoTitle}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {jobOffer.skills.map((skill: string, index: number) => {
                            return (
                                <p
                                    key={index}
                                    className="rounded-xl bg-neutral-900 px-3 py-1 text-sm"
                                >
                                    {skill}
                                </p>
                            )
                        })}
                    </div>
                    <p>{jobOffer.seoDescription}</p>
                    {jobOffer.isOpen ? (
                        <Button
                            asLink
                            to="#contact"
                            hasIcon
                            variant="accent"
                            className="text-md"
                        >
                            <Send className="size-4" /> Aplicar
                        </Button>
                    ) : (
                        <p className="rounded-xl bg-neutral-800 px-2 py-3 text-white">
                            🔒 Esta vacante de empleo se ha cancelado o se ha
                            cubierto ya.
                        </p>
                    )}
                </div>
                <div className="prose prose-dark mt-12 w-full max-w-full prose-img:w-full [&_h2:first-of-type]:mt-0">
                    <Markdown>{jobOffer.content}</Markdown>
                </div>
            </div>
            {true && <JobOfferForm jobOffer={jobOffer} />}
        </Page>
    )
}

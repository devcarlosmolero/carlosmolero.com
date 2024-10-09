import { json, LoaderFunctionArgs } from '@remix-run/cloudflare'
import {
    Form,
    useLoaderData,
    useLocation,
    useSearchParams,
} from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { Send } from 'react-bootstrap-icons'
import {
    GoogleReCaptcha,
    GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3'
// import Markdown from 'react-markdown'
import JobOffers from '~/actions/jobOffers'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/Input'
import Select from '~/components/atoms/Select'
import Page from '~/components/templates/Page'
import { JobOffer } from '~/types/contentful'

export async function loader({ request }: LoaderFunctionArgs) {
    const slug = new URL(request.url).pathname.split('/').pop()
    const jobOffer = (
        (await JobOffers.getBySlug(slug!).formatDates().get()) as JobOffer[]
    )[0]

    return json({ jobOffer })
}

export default function JobOffersPage() {
    const { jobOffer } = useLoaderData<typeof loader>()

    const $form = useRef<HTMLFormElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const location = useLocation()
    const [params, setParams] = useSearchParams()

    useEffect(
        function resetFormOnSuccess() {
            if (params.get('contactFormStatus')) {
                $form.current?.reset()
                setIsLoading(false)
            }
        },

        [params, setParams]
    )

    return (
        <Page className="flex flex-col justify-center">
            <div className="flex flex-col">
                <div className="flex flex-col space-y-5">
                    <h1 className="w-full text-6xl font-semibold tracking-tighter">
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

                    <Button
                        asLink
                        to="#contact"
                        hasIcon
                        variant="accent"
                        className="text-md"
                    >
                        <Send className="size-4" /> Aplicar
                    </Button>
                </div>
                {/* <div className="prose prose-dark mt-12 w-full max-w-full prose-img:w-full [&_h2:first-of-type]:mt-0"> */}
                {/*     <Markdown>{jobOffer.content}</Markdown> */}
                {/* </div> */}
            </div>
            <div className="flex w-full flex-col justify-center gap-y-8">
                <GoogleReCaptchaProvider reCaptchaKey="6Lf2j4AjAAAAANW0-igfUz7u38VEZCjoh0WtEbLB">
                    <h2 className="w-full text-4xl font-semibold tracking-tighter">
                        Envía tu Candidatura
                    </h2>
                    <Form
                        id="contact"
                        onSubmit={() => setIsLoading(true)}
                        ref={$form}
                        preventScrollReset
                        method="POST"
                        action="/api/jobOfferForm"
                        className="w-full"
                    >
                        <h3 className="mb-5 w-full text-2xl font-semibold tracking-tighter text-gray-100">
                            Datos generales
                        </h3>
                        <div className="flex flex-col gap-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    inputProps={{
                                        name: 'name',
                                        placeholder: 'Sin apellidos',
                                        required: true,
                                    }}
                                    labelProps={{ text: 'Nombre' }}
                                />
                                <Input
                                    inputProps={{
                                        name: 'email',
                                        type: 'email',
                                        placeholder: 'nombre@gmail.com',
                                        required: true,
                                    }}
                                    labelProps={{ text: 'Correo electrónico' }}
                                />
                                <Input
                                    inputProps={{
                                        name: 'ratePerHour',
                                        type: 'number',
                                        placeholder: 'En dólares',
                                        required: true,
                                    }}
                                    labelProps={{ text: 'Tarifa por hora' }}
                                />
                                <Select
                                    options={Array.from({ length: 10 }).map(
                                        (_, index) => ({
                                            label: String(index + 1),
                                            value: String(index + 1),
                                        })
                                    )}
                                    labelProps={{ text: 'Años de experiencia' }}
                                    inputProps={{
                                        name: 'yearsOfExperience',
                                        placeholder:
                                            '¿Cuántos años de experiencia tienes?',
                                        required: true,
                                    }}
                                />
                            </div>
                            <h3 className="mb-5 w-full text-2xl font-semibold tracking-tighter text-gray-100">
                                Experiencia con las tecnología de la oferta
                            </h3>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {jobOffer.skills.map((skill, index) => (
                                    <Select
                                        key={index}
                                        options={Array.from({ length: 11 }).map(
                                            (_, index) => ({
                                                label: String(index),
                                                value: String(index),
                                            })
                                        )}
                                        labelProps={{
                                            text: skill,
                                        }}
                                        inputProps={{
                                            name: `skill${skill}`,
                                            placeholder:
                                                '¿Cuántos años de experiencia tienes?',
                                            required: true,
                                        }}
                                    />
                                ))}
                            </div>
                            <Input
                                inputProps={{
                                    name: 'pathname',
                                    type: 'hidden',
                                    value: location.pathname,
                                }}
                            />
                            <Input
                                inputProps={{
                                    name: 'offerTitle',
                                    type: 'hidden',
                                    value: jobOffer.seoTitle,
                                }}
                            />
                            <Input
                                inputProps={{
                                    name: 'recaptchaToken',
                                    type: 'hidden',
                                    value: recaptchaToken,
                                }}
                            />
                            <GoogleReCaptcha onVerify={setRecaptchaToken} />
                            <Button
                                isLoading={isLoading}
                                isDisabled={isLoading || !recaptchaToken}
                                className="mt-3 w-full"
                                variant="primary"
                                props={{
                                    type: 'submit',
                                }}
                            >
                                Enviar
                            </Button>
                        </div>
                    </Form>
                </GoogleReCaptchaProvider>
            </div>
        </Page>
    )
}

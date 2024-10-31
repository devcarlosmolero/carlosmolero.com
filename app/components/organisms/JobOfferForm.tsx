import { Form, useLocation, useSearchParams } from '@remix-run/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/Input'

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import RecaptchaContext from './RecaptchaContext'
import Select from '../atoms/Select'
import { JobOffer } from '~/types/contentful'

function JobOfferFormInner({ jobOffer }: { jobOffer: JobOffer }) {
    const $form = useRef<HTMLFormElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const location = useLocation()
    const [params] = useSearchParams()
    const { executeRecaptcha } = useGoogleReCaptcha()

    useEffect(() => {
        if (params.get('formStatus')) {
            $form.current?.reset()
        }
        setIsLoading(false)
    }, [params])

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            return
        }

        const token = await executeRecaptcha()
        setRecaptchaToken(token)
    }, [executeRecaptcha])

    useEffect(() => {
        handleReCaptchaVerify()
    }, [handleReCaptchaVerify])

    return (
        <div className="flex w-full flex-col justify-center gap-y-8">
            <h2 className="w-full text-4xl font-semibold tracking-tighter">
                Envía tu Candidatura
            </h2>
            <Form
                onSubmit={() => {
                    handleReCaptchaVerify()
                    setIsLoading(true)
                }}
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
                            labelProps={{
                                text: 'Correo electrónico',
                            }}
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
                            labelProps={{
                                text: 'Años de experiencia',
                            }}
                            inputProps={{
                                name: 'experience',
                                placeholder:
                                    '¿Cuántos años de experiencia tienes?',
                                required: true,
                            }}
                        />
                    </div>
                    <h3 className="mb-5 w-full text-2xl font-semibold tracking-tighter text-gray-100">
                        Experiencia con las tecnologías de la oferta
                    </h3>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {jobOffer.skills.map((skill, index) => (
                            <Select
                                key={index}
                                options={Array.from({
                                    length: 11,
                                }).map((_, index) => ({
                                    label: String(index),
                                    value: String(index),
                                }))}
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
        </div>
    )
}

export default function JobOfferForm({ jobOffer }: { jobOffer: JobOffer }) {
    return (
        <RecaptchaContext>
            <JobOfferFormInner jobOffer={jobOffer} />
        </RecaptchaContext>
    )
}

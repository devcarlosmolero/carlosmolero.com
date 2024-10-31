import { Form, useLocation, useSearchParams } from '@remix-run/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/Input'
import Textarea from '../atoms/Textarea'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import RecaptchaContext from './RecaptchaContext'

function ContactFormInner() {
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
        <div className="flex w-full justify-center">
            <Form
                onSubmit={() => {
                    handleReCaptchaVerify()
                    setIsLoading(true)
                }}
                ref={$form}
                preventScrollReset
                method="POST"
                action="/api/contactForm"
                className="w-full max-w-[550px]"
            >
                <div className="flex flex-col gap-y-5">
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
                            name: 'pathname',
                            type: 'hidden',
                            value: location.pathname,
                        }}
                    />
                    <Input
                        inputProps={{
                            name: 'recaptchaToken',
                            type: 'hidden',
                            value: recaptchaToken,
                        }}
                    />
                    <Textarea
                        inputProps={{
                            name: 'message',
                            rows: 5,
                            placeholder: '¿Cómo podemos ayudarte?',
                            required: false,
                        }}
                        labelProps={{ text: 'Mensaje' }}
                    />
                    <Button
                        isLoading={isLoading}
                        isDisabled={isLoading}
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

export default function ContactForm() {
    return (
        <RecaptchaContext>
            <ContactFormInner />
        </RecaptchaContext>
    )
}

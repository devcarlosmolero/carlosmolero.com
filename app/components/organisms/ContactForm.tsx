import { Form, useLocation, useSearchParams } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/Input'
import Textarea from '../atoms/Textarea'
import {
    GoogleReCaptcha,
    GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3'

export default function ContactForm() {
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
        <div className="flex w-full justify-center">
            <GoogleReCaptchaProvider reCaptchaKey="6Lf2j4AjAAAAANW0-igfUz7u38VEZCjoh0WtEbLB">
                <Form
                    onSubmit={() => setIsLoading(true)}
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
    )
}

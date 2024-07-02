import { Form, useLocation, useSearchParams } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/Input'
import Textarea from '../atoms/Textarea'

export default function ContactForm() {
    const $form = useRef<HTMLFormElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isBot, setIsBot] = useState(false)
    const location = useLocation()
    const [params, setParams] = useSearchParams()

    useEffect(
        function resetFormOnSuccess() {
            if (params.get('contactFormStatus') === 'success') {
                $form.current?.reset()
                setIsLoading(false)
            }
        },

        [params, setParams]
    )

    return (
        <div className="flex w-full justify-center">
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
                    <div className="hidden">
                        <Input
                            inputProps={{
                                name: 'bot',
                                type: 'hidden',
                                onChange: () => setIsBot(true),
                            }}
                            labelProps={{
                                text: "Don't fill this if you're human",
                            }}
                        />
                    </div>
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
                        isDisabled={isLoading || isBot}
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

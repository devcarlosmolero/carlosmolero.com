import { ActionFunctionArgs } from '@remix-run/cloudflare'
import { redirectWithToast } from '../utils/server'
import { ContactFormSubmission } from '~/types/forms'
import { sendDiscordMessage } from '~/actions/discord'
import { isRecaptchaTokenValid } from '~/actions/recaptcha'

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const submission = Object.fromEntries(
        formData
    ) as unknown as ContactFormSubmission

    const notABot = await isRecaptchaTokenValid(submission.recaptchaToken)

    if (!notABot) {
        return redirectWithToast(
            `${formData.get('pathname')}?contactFormStatus=error`,
            'Ha ocurrido un error durante el envío del formulario. Inténtalo de nuevo más tarde.',
            'error',
            true
        )
    }

    await sendDiscordMessage(
        `\n\n🪐 **${submission.name} ha escrito**: \n\n*"${submission.message}"*\n\n📝 Puedes escribirle de vuelta usando el siguiente correo: ${submission.email}`
    )

    return redirectWithToast(
        `${formData.get('pathname')}?contactFormStatus=success`,
        'Mensaje Enviado. Nos pondremos en contacto contigo lo antes posible.',
        'success',
        true
    )
}

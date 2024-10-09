import { ActionFunctionArgs } from '@remix-run/cloudflare'
import { redirectWithToast } from '../utils/server'
import { sendDiscordMessage } from '~/actions/discord'
import { isRecaptchaTokenValid } from '~/actions/recaptcha'

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const submission = Object.fromEntries(formData) as any
    submission.skillset = ``

    const notABot = await isRecaptchaTokenValid(submission.recaptchaToken)

    if (!notABot) {
        return redirectWithToast(
            `${formData.get('pathname')}?contactFormStatus=error`,
            'Ha ocurrido un error durante el envío del formulario. Inténtalo de nuevo más tarde.',
            'error',
            true
        )
    }

    const keys = Object.keys(submission)

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key.includes('skill') && key !== 'skillset') {
            submission.skillset += `${key.replace('skill', '')} (${submission[key]}) `
        }
    }

    await sendDiscordMessage(
        `\n\n🪐 **${submission.name} ha enviado su candidatura para ${submission.offerTitle}**: 
         \n**Años de experiencia**: ${submission.experience} \n**Tarifa por hora**: ${submission.ratePerHour}$ \n**Skillset y experiencia**: ${submission.skillset} 
         \n📝 Puedes escribirle de vuelta usando el siguiente correo: ${submission.email}`
    )

    return redirectWithToast(
        `${formData.get('pathname')}?contactFormStatus=success`,
        'Candidatura Enviada. Nos pondremos en contacto contigo lo antes posible.',
        'success',
        true
    )
}

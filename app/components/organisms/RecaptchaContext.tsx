import { ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function RecaptchaContext({
    children,
}: {
    children: ReactNode
}) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6Lf2j4AjAAAAANW0-igfUz7u38VEZCjoh0WtEbLB">
            {children}
        </GoogleReCaptchaProvider>
    )
}

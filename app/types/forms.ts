export interface ContactFormSubmission {
    pathname: string
    name: string
    email: string
    recaptchaToken: string
    message?: string
}

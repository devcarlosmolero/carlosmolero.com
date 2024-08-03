export async function isRecaptchaTokenValid(token: string) {
    try {
        const resp = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=6Lf2j4AjAAAAAFvGvFbJe4e03AahsM39QNowcp_n&response=${token}`,
            {
                method: 'POST',
            }
        )

        const result = (await resp.json()) as any
        return result.success
    } catch (e) {
        return false
    }
}

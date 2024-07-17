export function getPostSections(content: string) {
    const sectionRegex = /^##\s+(.*?)\s*$/gm

    const sections = content.matchAll(sectionRegex)
    const sectionsArray = Array.from(sections)

    const results = sectionsArray.map((sectionMatch: any) => {
        const originalText = sectionMatch[1].trim()
        const sectionText = originalText.toLowerCase()

        const id = sectionText
            .replace(/ /g, '-')
            .replace(/:/g, '')
            .replace(/[?¿:.()]/g, '')

        return {
            id: id,
            text: originalText,
        }
    })

    return results
}

export function getPostReadingTimeInMinutes(content: string) {
    const words = content.split(/\s+/).length
    const minutes = words / 200
    return Math.ceil(minutes)
}

export default function injectHook(content: string, hookHtml: string) {
    return content.replace(/--hook--/g, hookHtml)
}

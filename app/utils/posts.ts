export function getPostSections(content: string) {
    const sectionRegex = /^(##{1,2})\s+(.*?)\s*$/gm

    const sections = content.matchAll(sectionRegex)
    const sectionsArray = Array.from(sections)

    const results = sectionsArray.map((sectionMatch: any) => {
        const headingLevel = sectionMatch[1].length
        const originalText = sectionMatch[2].trim()
        const sectionText = originalText.toLowerCase()

        const id = sectionText
            .replace(/ /g, '-')
            .replace(/:/g, '')
            .replace(/[?¿:.()]/g, '')

        return {
            id: id,
            text: originalText,
            level: headingLevel,
        }
    })

    return results
}

export function getPostReadingTimeInMinutes(content: string) {
    const words = content.split(/\s+/).length
    const minutes = words / 200
    return Math.ceil(minutes)
}

export default function injectPostHook(content: string, hookHtml: string) {
    return content.replace(/--hook--/g, hookHtml)
}

export function getPostImageUrls(markdown: string) {
    const imgMarkdownRegex = /!\[.*?\]\(([^)]+)\)/g
    const urls = []
    let match

    while ((match = imgMarkdownRegex.exec(markdown)) !== null) {
        urls.push(`http:${match[1]}`)
    }

    return urls
}

import { renderToStaticMarkup } from 'react-dom/server'

export function injectServiceBenefits(content: string) {
    const regex = /--benefits--\n(\[.*?\])\n--benefits--/gs
    return content.replace(regex, (_, jsonString) => {
        return renderToStaticMarkup(<></>)
    })
}

import { SITE_BASE_URL } from '~/consts'
import { ServiceCard } from '~/types/contentful'
import { BreadCrumbJsonLdItem } from '~/types/metas'

export function fromServiceCardToBreadCrumbJsonLdItem(
    service: ServiceCard,
    index: number
) {
    return {
        position: index + 1,
        name: service.cardTitle,
        item: `${SITE_BASE_URL}/${service.slug}`,
    } as BreadCrumbJsonLdItem
}

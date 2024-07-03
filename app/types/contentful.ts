export interface Post {
    seoTitle: string
    seoDescription: string
    content: string
    headerImgUrl?: string
    categories: string[]
    createdAt?: string
    updatedAt?: string
    readingTime?: string
    authorName?: string
    authorAvatarUrl?: string
    slug?: string
    sections?: { id: string; text: string }[]
}

export interface Service {
    seoTitle: string
    seoDescription: string
    content: string
    headerImgUrl: string
    slug: string
    createdAt?: string
    updatedAt?: string
    adTitle: string
    adDescription: string
    faqs: {
        question: string
        answer: string
    }[]
}

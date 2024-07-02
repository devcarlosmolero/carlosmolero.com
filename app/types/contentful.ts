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

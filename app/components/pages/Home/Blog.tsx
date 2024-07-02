import { Post } from '~/types/contentful'
import SectionHeading from './SectionHeading'
import BlogRow from '../shared/BlogRow'

export default function Blog({ posts }: { posts: Post[] }) {
    return (
        <section id="blog">
            <SectionHeading
                badgeLabel="Blog"
                title="Mantente informado sobre las últimas tendencias <span class='font-accent tracking-normal'>en nuestro blog</span>"
                description="Descubre información valiosa y gratuita que te permitirá mejorar y escalar tu negocio"
            />
            <BlogRow posts={posts} />
        </section>
    )
}

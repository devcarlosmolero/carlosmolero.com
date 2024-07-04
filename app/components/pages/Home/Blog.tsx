import { Post } from '~/types/contentful'
import SectionHeading from './SectionHeading'
import BlogRow from '../shared/BlogRow'
import ScrollAnimation from 'react-animate-on-scroll'

export default function Blog({ posts }: { posts: Post[] }) {
    return (
        <section id="blog">
            <ScrollAnimation once={true} animateIn="fadeIn">
                <SectionHeading
                    badgeLabel="Blog"
                    title="Mantente informado sobre las últimas tendencias <span class='font-accent tracking-normal'>en nuestro blog</span>"
                    description="Descubre información valiosa y gratuita que te permitirá mejorar y escalar tu negocio"
                />
            </ScrollAnimation>
            <BlogRow posts={posts} />
        </section>
    )
}

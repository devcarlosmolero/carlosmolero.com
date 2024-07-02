import BlogPost from '~/components/organisms/BlogPost'
import { Post } from '~/types/contentful'
import ScrollAnimation from 'react-animate-on-scroll'

export default function BlogRow({ posts }: { posts: Post[] }) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((post, index) => {
                return (
                    <ScrollAnimation
                        key={index}
                        animateOnce
                        animateIn="fadeInUp"
                    >
                        <BlogPost post={post} />
                    </ScrollAnimation>
                )
            })}
        </div>
    )
}

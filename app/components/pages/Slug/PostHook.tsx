import Button from '~/components/atoms/Button'
import AccentCard from '~/components/templates/AccentCard'

export default function PostHook({
    title,
    description,
}: {
    title: string
    description: string
}) {
    return (
        <AccentCard className="no-prose mb-5">
            <h3 className="no-prose mt-0 text-2xl font-bold">{title}</h3>
            <p className="no-prose text-white">{description}</p>
            <a href="#contacto">
                <Button to="#contacto" className="no-prose" variant="accent">
                    Contacta con nosotros
                </Button>
            </a>
        </AccentCard>
    )
}

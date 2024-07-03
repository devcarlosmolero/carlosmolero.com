import Badge from '~/components/atoms/Badge'

export default function SectionHeading({
    badgeLabel,
    title,
    description,
}: {
    badgeLabel?: string
    title: string
    description?: string
}) {
    return (
        <div className="mb-16 flex w-full flex-col items-center gap-y-5">
            {badgeLabel && <Badge label={badgeLabel} />}
            <div className="flex max-w-[550px] flex-col gap-y-5 text-center">
                <h2
                    className="text-4xl font-semibold tracking-tighter"
                    dangerouslySetInnerHTML={{ __html: title }}
                ></h2>
                {description && <p className="text-gray-300">{description}</p>}
            </div>
        </div>
    )
}

import Badge from '~/components/atoms/Badge'

export default function SectionHeading({
    title,
    badgeLabel,
    description,
    asH1 = false,
}: {
    title: string
    badgeLabel?: string
    description?: string
    asH1?: boolean
}) {
    return (
        <div className="mb-16 flex w-full flex-col items-center gap-y-5">
            {badgeLabel && <Badge label={badgeLabel} />}
            <div className="flex max-w-[550px] flex-col gap-y-5 text-center">
                {!asH1 ? (
                    <h2
                        className="text-4xl font-semibold tracking-tighter"
                        dangerouslySetInnerHTML={{ __html: title }}
                    ></h2>
                ) : (
                    <h1
                        className="text-4xl font-semibold tracking-tighter"
                        dangerouslySetInnerHTML={{ __html: title }}
                    ></h1>
                )}
                {description && <p className="text-gray-300">{description}</p>}
            </div>
        </div>
    )
}

import StarRow from '~/components/molecules/StarRow'
import { Fragment } from 'react/jsx-runtime'
import ImageKitImage from '~/components/atoms/ImageKitImage'

interface ReviewProps {
    author: string
    jobTitle: string
    description: string
    src: string
    alt: string
}

export default function Review({
    author,
    jobTitle,
    description,
    src,
    alt,
}: ReviewProps) {
    return (
        <Fragment>
            <div className="flex gap-x-2 text-highlight-900">
                <StarRow />
            </div>
            <p className="italic">{description}</p>
            <div className="flex items-center gap-x-3">
                <ImageKitImage
                    className="h-[30px] w-[30px] rounded-full"
                    alt={alt}
                    src={`/tr:w-60,ar-1-1,f-webp${src}`}
                />
                <div className="flex flex-col text-xs">
                    <p>{author}</p>
                    <p className="text-gray-400">{jobTitle}</p>
                </div>
            </div>
        </Fragment>
    )
}

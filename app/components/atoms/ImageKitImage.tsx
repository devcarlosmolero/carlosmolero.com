import { IMAGE_KIT_BASE_URL } from '~/consts'

export default function ImageKitImage({
    src,
    alt,
    className,
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            className={className}
            src={`${IMAGE_KIT_BASE_URL}${src}`}
            alt={alt}
            {...props}
        />
    )
}

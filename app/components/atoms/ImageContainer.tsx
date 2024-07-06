import cl from 'classnames'
import ImageKitImage from './ImageKitImage'

export default function ImageContainer({
    src,
    alt,
    useImageKit = false,
    containerClassName,
    className,
}: {
    src: string
    alt: string
    useImageKit?: boolean
    containerClassName?: string
    className?: string
}) {
    return (
        <div className={cl('relative overflow-hidden', containerClassName)}>
            {useImageKit ? (
                <ImageKitImage
                    alt={alt}
                    src={src}
                    className={cl(
                        'absolute left-1/2 top-1/2 h-full max-h-none min-h-full w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 transform object-cover',
                        className
                    )}
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={cl(
                        'absolute left-1/2 top-1/2 h-full max-h-none min-h-full w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 transform object-cover',
                        className
                    )}
                />
            )}
        </div>
    )
}

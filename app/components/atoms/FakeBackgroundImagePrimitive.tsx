import cn from 'classnames'
import { Fragment, ReactNode } from 'react'
import ImageKitImage from './ImageKitImage'

function Container({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn('relative overflow-hidden', className)}>
            {children}
        </div>
    )
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    alt: string
    src: string
    useImageKit?: boolean
    className?: string
    children?: ReactNode
}

function Image({
    useImageKit = false,
    className,
    children,
    alt,
    ...props
}: ImageProps) {
    return (
        <Fragment>
            {useImageKit ? (
                <Fragment>
                    <ImageKitImage
                        {...props}
                        className={cn(
                            'absolute left-1/2 top-1/2 h-full max-h-none min-h-full w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 transform object-cover',
                            className
                        )}
                    />
                    {children}
                </Fragment>
            ) : (
                <Fragment>
                    <img
                        {...props}
                        alt={alt}
                        className={cn(
                            'absolute left-1/2 top-1/2 h-full max-h-none min-h-full w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 transform object-cover',
                            className
                        )}
                    />
                    {children}
                </Fragment>
            )}
        </Fragment>
    )
}

export const FakeBackgroundImagePrimitive = {
    Container,
    Image,
}

import { IMAGE_KIT_BASE_URL } from '~/consts'

interface AvatarRowProps {
    images: {
        src: string
        alt: string
    }[]
}

export default function AvatarRow({ images }: AvatarRowProps) {
    return (
        <div className="flex items-center">
            {images.map((image, index) => {
                return (
                    <img
                        className={`h-[30px] w-[30px] rounded-full border-2 border-violet-300 ${
                            index > 0 ? '-ml-3' : ''
                        }`}
                        key={index}
                        src={`${IMAGE_KIT_BASE_URL}/tr:w-60,ar-1-1,f-webp${image.src}`}
                        alt={image.alt}
                    />
                )
            })}
        </div>
    )
}

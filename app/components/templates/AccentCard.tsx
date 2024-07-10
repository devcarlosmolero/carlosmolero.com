import { ReactNode } from 'react'
import cn from 'classnames'
import { IMAGE_KIT_BASE_URL } from '~/consts'

export default function AccentCard({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                'relative h-full min-h-[280px] w-full rounded-xl shadow shadow-zinc-700 md:min-h-[230px] lg:min-h-0',
                className
            )}
        >
            <div
                style={{
                    backgroundImage: `url(${IMAGE_KIT_BASE_URL}/accent-background.webp)`,
                }}
                className="h-full w-full rounded-xl bg-cover bg-right"
            ></div>
            <div className="absolute top-0 h-full w-full rounded-xl bg-neutral-900/30 p-5 backdrop-blur-2xl">
                {children}
            </div>
        </div>
    )
}

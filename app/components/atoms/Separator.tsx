import cl from 'classnames'

export default function Separator({ className }: { className?: string }) {
    return (
        <div
            className={cl(
                'via-opacity-40 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent',
                className
            )}
        ></div>
    )
}

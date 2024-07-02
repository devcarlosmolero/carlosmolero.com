import { Fragment } from 'react/jsx-runtime'

interface StepsProps {
    data: {
        title: string
        description: string
    }[]
}

export default function Steps({ data }: StepsProps) {
    return (
        <main className="text-muted-foreground grid w-full grid-cols-1 place-items-center items-start gap-8 lg:grid-cols-5">
            {data.map((step, index) => (
                <Fragment key={index}>
                    <div
                        key={index}
                        className={`flex flex-col items-center justify-center space-y-4 text-center`}
                    >
                        <h3 className="text-foreground text-5xl font-bold lg:text-7xl">
                            {index + 1}
                        </h3>

                        <div className="space-y-1.5">
                            <h3 className="text-center text-xl italic text-white">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-300">
                                {step.description}{' '}
                            </p>
                        </div>
                    </div>
                    {index != data.length - 1 && (
                        <div
                            className={`h-12 w-px bg-neutral-700 lg:mt-9 lg:h-px lg:w-full`}
                        ></div>
                    )}
                </Fragment>
            ))}
        </main>
    )
}

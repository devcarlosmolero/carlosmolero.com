import { StarIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react/jsx-runtime'

export default function StarRow() {
    return (
        <Fragment>
            {[...new Array(5)].map((_, index) => (
                <StarIcon key={index} className="size-5 text-highlight-900" />
            ))}
        </Fragment>
    )
}

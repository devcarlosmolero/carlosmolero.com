import { ReactNode } from 'react'
import Container from './Container'
import PageInner from './PageInner'

export default function Page({
    children,
    className,
}: {
    children: ReactNode | ReactNode[]
    className?: string
}) {
    return (
        <div className="pt-[80px] text-white">
            <Container>
                <PageInner className={className}>{children}</PageInner>
            </Container>
        </div>
    )
}

import {
    Accordion,
    AccordionTrigger,
    AccordionContent,
    AccordionItem,
    AccordionHeader,
} from '@radix-ui/react-accordion'
import { ReactNode } from 'react'
import cn from 'classnames'

function Root({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) {
    return (
        <Accordion className={cn(className)} type="single" collapsible>
            {children}
        </Accordion>
    )
}

function Item({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) {
    return (
        <AccordionItem value="0" className={cn(className)}>
            {children}
        </AccordionItem>
    )
}

function Header({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <AccordionHeader className={cn(className)}>{children}</AccordionHeader>
    )
}

function Trigger({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <AccordionTrigger
            className={cn('group flex w-full items-center', className)}
        >
            {children}
        </AccordionTrigger>
    )
}

function Content({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) {
    return (
        <AccordionContent
            className={cn(
                'overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
                className
            )}
        >
            {children}
        </AccordionContent>
    )
}

const DropdownPrimitive = {
    Root,
    Item,
    Header,
    Trigger,
    Content,
}
export default DropdownPrimitive

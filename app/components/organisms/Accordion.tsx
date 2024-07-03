import React from 'react'
import cl from 'classnames'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

export interface AccordionProps {
    data: AccordionPropsItem[]
}

export interface AccordionPropsItem {
    question: string
    answer: string
}

const Accordion = ({ data }: AccordionProps) => (
    <RadixAccordion.Root
        className="flex flex-col gap-y-3"
        type="single"
        collapsible
    >
        {data.map((item, index) => {
            return (
                <AccordionItem key={index} value={String(index)}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
            )
        })}
    </RadixAccordion.Root>
)

interface AccordionItemProps
    extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
    className?: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Item
            className={cl('', className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </RadixAccordion.Item>
    )
)

AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps
    extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger> {
    className?: string
}

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger
            className={cl(
                'group flex w-full items-center rounded-xl border border-zinc-800 bg-neutral-900 p-5 text-start text-lg',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="w-full">{children}</div>
            <PlusIcon className="size-6 group-data-[state=open]:hidden" />
            <MinusIcon className="hidden size-6 group-data-[state=open]:block" />
        </RadixAccordion.Trigger>
    </RadixAccordion.Header>
))

AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps
    extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Content> {
    className?: string
}

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Content
        className={cl(
            'overflow-hidden text-gray-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className="px-5 py-[15px]">{children}</div>
    </RadixAccordion.Content>
))

AccordionContent.displayName = 'AccordionContent'

export default Accordion

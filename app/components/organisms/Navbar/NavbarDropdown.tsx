import { ReactNode } from 'react'
import DropdownPrimitive from '../../atoms/DropdownPrimitive'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface NavbarDropdownProps {
    title: string
    children: ReactNode
}

export default function NavbarDropdown({
    title,
    children,
}: NavbarDropdownProps) {
    return (
        <DropdownPrimitive.Root>
            <DropdownPrimitive.Item>
                <DropdownPrimitive.Header>
                    <DropdownPrimitive.Trigger className="uppercase text-white">
                        <ChevronRightIcon className="mr-1 size-4 group-data-[state=open]:hidden" />
                        <ChevronDownIcon className="mr-1 hidden size-4 group-data-[state=open]:block" />
                        {title}
                    </DropdownPrimitive.Trigger>
                </DropdownPrimitive.Header>
                <DropdownPrimitive.Content className="py-2 text-white">
                    <div className="w-full font-normal normal-case">
                        {children}
                    </div>
                </DropdownPrimitive.Content>
            </DropdownPrimitive.Item>
        </DropdownPrimitive.Root>
    )
}

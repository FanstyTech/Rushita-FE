"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function ComboboxDemo({ items, label
    , onchange, value2, setValue2
}: { value2?: boolean, setValue2?: React.Dispatch<React.SetStateAction<boolean>>, label: string, items: { value: string, label: string }[], onchange: (value: string) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    React.useEffect(() => {
        if (value2 && setValue2) {
            setValue("")
            setValue2(false)
        }
    }, [value2])
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outlinetow"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full py-5 justify-between"
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : `Select ${label}...`}
                    <ChevronsUpDown className="opacity-50 " />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={label} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No {label} found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        onchange(value)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

import { useState, useMemo } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface FuzzySearchSelectProps {
  options: Option[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  multiple?: boolean
  values?: string[]
  onValuesChange?: (values: string[]) => void
}

export function FuzzySearchSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  multiple = false,
  values = [],
  onValuesChange,
}: FuzzySearchSelectProps) {
  const [open, setOpen] = useState(false)

  const fuzzySearch = (query: string, text: string) => {
    const queryLower = query.toLowerCase()
    const textLower = text.toLowerCase()

    if (textLower.includes(queryLower)) return true

    let queryIndex = 0
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++
      }
    }
    return queryIndex === queryLower.length
  }

  const handleSelect = (selectedValue: string) => {
    if (multiple && onValuesChange) {
      const newValues = values.includes(selectedValue)
        ? values.filter((v) => v !== selectedValue)
        : [...values, selectedValue]
      onValuesChange(newValues)
    } else {
      onValueChange(selectedValue === value ? "" : selectedValue)
      setOpen(false)
    }
  }

  const displayValue = useMemo(() => {
    if (multiple) {
      if (values.length === 0) return placeholder
      if (values.length === 1) {
        const option = options.find((opt) => opt.value === values[0])
        return option?.label || values[0]
      }
      return `${values.length} selected`
    }

    const option = options.find((opt) => opt.value === value)
    return option?.label || placeholder
  }, [value, values, options, placeholder, multiple])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command filter={(value, search) => (fuzzySearch(search, value) ? 1 : 0)}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.label} onSelect={() => handleSelect(option.value)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      (multiple ? values.includes(option.value) : value === option.value) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

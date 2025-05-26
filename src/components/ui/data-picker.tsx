import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, className, placeholder, ...props }, ref) => {
    const selectedDate = value ? new Date(value) : undefined

    return (
      <div ref={ref}>
        <Popover>
          <PopoverTrigger asChild>
           <Button
            variant="outline"
            className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",  
             !value && "text-muted-foreground", 
              className
              )}
            {...props}
          >
           <CalendarIcon className="mr-2 h-4 w-4" />
           {value ? format(new Date(value), "PPP") : <span>{placeholder}</span>}
          </Button>

          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}  
              onSelect={(date) => {
                if (date) {
                  let selectedDate= format(date, "yyyy-MM-dd")
                  onChange(selectedDate)  
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

export { DatePicker }

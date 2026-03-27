"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentProps<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer border-input ring-offset-background focus-visible:border-ring focus-visible:ring-ring/50 data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary data-disabled:opacity-50 data-disabled:cursor-not-allowed flex size-4 shrink-0 items-center justify-center rounded-[4px] border bg-background transition-colors outline-none focus-visible:ring-3",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <Check className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }

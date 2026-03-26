"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  React.ElementRef<typeof InputPrimitive>,
  React.ComponentProps<typeof InputPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <InputPrimitive
      ref={ref}
      data-slot="input"
      className={cn(
        "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }

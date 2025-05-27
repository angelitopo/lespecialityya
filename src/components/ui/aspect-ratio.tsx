"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * AspectRatio component that maintains a specific width/height ratio.
 * Useful for maintaining consistent image dimensions, video containers, etc.
 * 
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="image.jpg" alt="A 16:9 image" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={className}
    data-slot="aspect-ratio"
    {...props}
  />
))

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName

export { AspectRatio }

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center duration-300  font-normal cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'bg-transparent hover:bg-secend  hover:text-white  text-gray-700 border-gray-700 border',
        outlinetow:
          'bg-transparent     text-foreground border-foreground border',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'bg-white text-gray-700 hover:opacity-90 hover:bg-gray-50  ',
        link: 'text-gray-color/50 underline-offset-4 hover:text-secend  ',
        lineargradian:
          'bg-gradient-to-r from-primary to-secend text-white    hover:opacity-80   ',
        none: 'block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300',
        PlanButton: 'text-white bg-secend',
        editButton: "text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm",
        SaveButton: "bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: ' rounded-lg gap-1.5 px-4 py-2.5 has-[>svg]:px-2.5',
        lg: 'px-8 py-3  rounded-md  sm:text-lg text-sm has-[>svg]:px-4 ',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

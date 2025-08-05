import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center duration-300  font-normal cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/80 dark:hover:bg-destructive',
        outline:
          'bg-transparent border text-xs border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300',
        outlinetow:
          'bg-transparent  hover:bg-foreground hover:text-primary-foreground text-foreground border-foreground border',

        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 dark:bg-secondary/80 dark:text-secondary-foreground/90 dark:hover:bg-secondary',
        ghost:
          'bg-white text-gray-700 hover:bg-gray-50 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800',
        link: 'text-gray-color/50 underline-offset-4 hover:text-secend dark:text-gray-400 dark:hover:text-secend/90',
        lineargradian:
          'bg-gradient-to-r from-primary to-secend text-white hover:opacity-80 dark:from-primary/90 dark:to-secend/90',
        none: 'block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 dark:text-gray-300',
        PlanButton:
          'text-white bg-secend dark:bg-secend/90 dark:hover:bg-secend',
        SaveButton: 'border-primary border bg-primary',
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
  isLoading = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        props.children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };

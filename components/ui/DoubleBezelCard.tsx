import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface DoubleBezelCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function DoubleBezelCard({
  children,
  className,
  innerClassName,
  ...props
}: DoubleBezelCardProps) {
  return (
    <motion.div
      className={cn("doppelrand-shell relative group", className)}
      {...props}
    >
      <div className={cn("doppelrand-core h-full w-full overflow-hidden", innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
}

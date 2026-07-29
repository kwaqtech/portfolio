"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: React.ElementType;
  once?: boolean;
}

export function AnimatedText({ text, className, el: Wrapper = "p", once = true }: AnimatedTextProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        className="flex flex-wrap"
      >
        {text.split(" ").map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1">
            <motion.span variants={child} className="inline-block mr-1 lg:mr-2">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}

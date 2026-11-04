'use client';

import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

// Fades in and slides up when scrolled into view
export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 20,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; duration?: number; y?: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={reduceMotion ? { duration: 0 } : { duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Container for staggered children animations
export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}: HTMLMotionProps<"div"> & { staggerDelay?: number; delayChildren?: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : staggerDelay,
            delayChildren: reduceMotion ? 0 : delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// A child item of StaggerContainer
export const StaggerItem = ({
  children,
  className,
  y = 20,
  ...props
}: HTMLMotionProps<"div"> & { y?: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      // No `initial` here on purpose: the parent StaggerContainer owns the
      // hidden/visible variant state and propagates it to these children.
      // Setting `initial` on the child breaks that propagation, leaving every
      // card stuck at opacity:0.
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Types out text letter by letter
export const TypingText = ({
  text,
  className,
  as: Component = 'p',
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: any;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();
  const letters = Array.from(text);

  if (reduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: { type: 'spring' as const, damping: 12, stiffness: 100 },
    },
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      style={{ display: 'inline-block', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

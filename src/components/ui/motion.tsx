'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
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
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
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
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
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
  const letters = Array.from(text);

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
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  const MotionComponent = motion(Component as any);

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

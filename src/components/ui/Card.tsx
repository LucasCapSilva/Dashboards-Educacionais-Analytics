import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export function Card({ children, className, delay = 0, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'bg-white dark:bg-[#1a1c23] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

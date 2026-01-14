/**
 * Animation Components
 * Reusable Framer Motion animation wrappers
 */
import { motion } from 'framer-motion';
import { Box, Flex } from '@chakra-ui/react';

// Create motion components from Chakra
export const MotionBox = motion(Box);
export const MotionFlex = motion(Flex);

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

// Stagger children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -8,
  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)',
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const tapScale = {
  scale: 0.95,
};

// Page transition wrapper
export const PageTransition = ({ children }) => (
  <MotionBox
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={fadeIn}
  >
    {children}
  </MotionBox>
);

// Animated card wrapper
export const AnimatedCard = ({ children, delay = 0, ...props }) => (
  <MotionBox
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: 'easeOut' },
      },
    }}
    whileHover={hoverLift}
    whileTap={tapScale}
    {...props}
  >
    {children}
  </MotionBox>
);

// Animated list container
export const AnimatedList = ({ children, ...props }) => (
  <MotionBox
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    {...props}
  >
    {children}
  </MotionBox>
);

// Animated list item
export const AnimatedListItem = ({ children, ...props }) => (
  <MotionBox variants={staggerItem} {...props}>
    {children}
  </MotionBox>
);

// Floating animation (for decorative elements)
export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Pulse animation (for buttons, notifications)
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Spin animation (for loading)
export const spinAnimation = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear',
  },
};

// Shake animation (for errors)
export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 },
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  tapScale,
};

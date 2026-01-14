/**
 * Modern Chakra UI Theme
 * Good Bowl - A fresh, healthy design system
 */
import { extendTheme } from '@chakra-ui/react';

// Custom color palette - fresh, healthy tones
const colors = {
  brand: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Primary - fresh green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Light green accent
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  earth: {
    50: '#faf5f0',
    100: '#f5ebe0',
    200: '#e8d5b7',
    300: '#d4bc91',
    400: '#c4a373',
    500: '#b08d57',  // Warm earth brown
    600: '#96744a',
    700: '#7a5d3d',
    800: '#5e4730',
    900: '#423224',
  },
  fresh: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',  // Teal green
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
};

// Modern fonts
const fonts = {
  heading: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"JetBrains Mono", Menlo, monospace',
};

// Font sizes
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
};

// Shadows with fresh tones
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  warm: '0 10px 40px -10px rgba(34, 197, 94, 0.3)',
  glow: '0 0 20px rgba(34, 197, 94, 0.4)',
};

// Border radius
const radii = {
  none: '0',
  sm: '0.25rem',
  base: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '3rem',
  full: '9999px',
};

// Component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'lg',
      transition: 'all 0.3s ease',
    },
    variants: {
      primary: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          transform: 'translateY(-2px)',
          boxShadow: 'warm',
        },
        _active: {
          bg: 'brand.700',
          transform: 'translateY(0)',
        },
      },
      secondary: {
        bg: 'transparent',
        color: 'brand.500',
        border: '2px solid',
        borderColor: 'brand.500',
        _hover: {
          bg: 'brand.50',
          transform: 'translateY(-2px)',
        },
      },
      ghost: {
        color: 'gray.600',
        _hover: {
          bg: 'gray.100',
          color: 'brand.500',
        },
      },
      accent: {
        bg: 'accent.500',
        color: 'gray.900',
        _hover: {
          bg: 'accent.400',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: 'lg',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: '2xl',
        },
      },
    },
  },
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      px: 3,
      py: 1,
      fontWeight: '600',
      textTransform: 'uppercase',
      fontSize: 'xs',
    },
    variants: {
      subtle: {
        bg: 'brand.100',
        color: 'brand.700',
      },
      solid: {
        bg: 'brand.500',
        color: 'white',
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'gray.50',
          borderRadius: 'lg',
          border: '2px solid transparent',
          _hover: {
            bg: 'gray.100',
          },
          _focus: {
            bg: 'white',
            borderColor: 'brand.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Select: {
    variants: {
      filled: {
        field: {
          bg: 'gray.50',
          borderRadius: 'lg',
          border: '2px solid transparent',
          _hover: {
            bg: 'gray.100',
          },
          _focus: {
            bg: 'white',
            borderColor: 'brand.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
};

// Global styles
const styles = {
  global: {
    'html, body': {
      bg: 'gray.50',
      color: 'gray.800',
      lineHeight: 'tall',
    },
    '*::selection': {
      bg: 'brand.200',
      color: 'brand.900',
    },
    // Smooth scrolling
    html: {
      scrollBehavior: 'smooth',
    },
  },
};

// Animation config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Transitions
const transition = {
  property: {
    common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    colors: 'background-color, border-color, color, fill, stroke',
    dimensions: 'width, height',
    position: 'left, right, top, bottom',
    background: 'background-color, background-image, background-position',
  },
  easing: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  duration: {
    'ultra-fast': '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    'ultra-slow': '500ms',
  },
};

const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  shadows,
  radii,
  components,
  styles,
  config,
  transition,
});

export default theme;

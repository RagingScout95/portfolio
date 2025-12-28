/**
 * Red-Black Theme Configuration
 * Centralized color theme data for the portfolio
 */

export const Theme = {
  // Background Colors
  background: {
    primary: 'bg-black',
    secondary: 'bg-black',
    card: 'bg-black',
    input: 'bg-black',
    hover: 'bg-black',
  },

  // Text Colors
  text: {
    primary: 'text-gray-100',
    secondary: 'text-gray-200',
    tertiary: 'text-gray-300',
    muted: 'text-gray-400',
    mutedDark: 'text-gray-500',
    accent: 'text-red-500',
    accentHover: 'text-red-400',
    white: 'text-white',
  },

  // Border Colors
  border: {
    default: 'border-red-900/50',
    hover: 'border-red-600',
    focus: 'border-red-600',
    accent: 'border-red-500',
  },

  // Red Color Palette
  red: {
    400: 'text-red-400',
    500: 'text-red-500',
    600: 'bg-red-600',
    700: 'hover:bg-red-700',
    600Border: 'border-red-600',
    900Border: 'border-red-900/50',
    600Shadow: 'shadow-red-600/50',
    600Shadow20: 'shadow-red-600/20',
    600Ring: 'ring-red-600/50',
    950Gradient: 'from-red-950/30',
  },

  // Gradient Classes
  gradient: {
    hero: 'bg-gradient-to-b from-black via-black to-black',
    card: 'bg-gradient-to-br from-red-950/30 to-black',
  },

  // Button Styles
  button: {
    primary: 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-red-600/50',
    secondary: 'border-2 border-gray-600 text-gray-100 hover:border-red-600 hover:text-red-500 hover:scale-105',
  },

  // Component Specific Classes
  components: {
    navbar: {
      background: 'bg-black/90',
      border: 'border-red-900/50',
      link: 'text-gray-300 hover:text-red-500',
      linkActive: 'text-red-500',
      linkActiveUnderline: 'after:bg-red-600',
      mobileMenu: 'bg-black',
    },
    skillTag: {
      background: 'bg-black',
      border: 'border-red-900/50',
      text: 'text-gray-200',
      hover: 'hover:border-red-600',
    },
    projectCard: {
      background: 'bg-black',
      border: 'border-red-900/50',
      hover: 'hover:border-red-600 hover:shadow-red-600/20',
      techTag: {
        background: 'bg-black',
        border: 'border-red-900/50',
        text: 'text-gray-300',
      },
    },
    contactForm: {
      background: 'bg-black',
      border: 'border-red-900/50',
      input: {
        background: 'bg-black',
        border: 'border-red-900/50',
        focus: 'focus:border-red-600 focus:ring-2 focus:ring-red-600/50',
        text: 'text-gray-100',
      },
    },
    experience: {
      timeline: {
        line: 'bg-red-900/50',
        dot: 'bg-red-600',
        dotRing: 'ring-black',
      },
      card: {
        background: 'bg-black',
        border: 'border-red-900/50',
        hover: 'hover:border-red-600',
        role: 'text-red-500',
        bullet: 'text-red-500',
      },
    },
    socialIcon: {
      background: 'bg-black',
      border: 'border-red-900/50',
      hover: 'hover:border-red-600',
      text: 'text-gray-100',
    },
    backToTop: {
      background: 'bg-red-600',
      hover: 'hover:bg-red-700',
    },
  },

  // Utility Classes
  utilities: {
    transition: 'transition-all duration-300',
    transitionColors: 'transition-colors duration-300',
    rounded: {
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    shadow: {
      lg: 'shadow-lg',
      xl: 'shadow-2xl',
      red: 'shadow-red-600/50',
      red20: 'shadow-red-600/20',
    },
  },
} as const;


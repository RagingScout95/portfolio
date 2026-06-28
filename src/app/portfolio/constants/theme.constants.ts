/**
 * Premium dark theme — glassmorphism, indigo/violet accents, smooth motion
 * Design direction: modern developer portfolio (default until user picks references)
 */

export const Theme = {
  background: {
    primary: 'bg-slate-950',
    secondary: 'bg-slate-900/50',
    mesh: 'hero-mesh',
    card: 'glass-card',
  },

  text: {
    primary: 'text-slate-100',
    secondary: 'text-slate-300',
    muted: 'text-slate-400',
    accent: 'text-indigo-400',
    gradient: 'bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent',
  },

  border: {
    default: 'border-white/10',
    hover: 'border-indigo-500/40',
    focus: 'border-indigo-500',
  },

  accent: {
    indigo: 'text-indigo-400',
    violet: 'text-violet-400',
    glow: 'shadow-indigo-500/20',
    ring: 'ring-indigo-500/30',
  },

  gradient: {
    hero: 'hero-mesh',
    button: 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500',
    card: 'bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/80',
  },

  button: {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5',
    secondary: 'border border-white/20 text-slate-200 hover:border-indigo-500/50 hover:text-indigo-300 hover:-translate-y-0.5',
  },

  components: {
    navbar: {
      background: 'bg-slate-950/80 backdrop-blur-xl',
      border: 'border-white/10',
      link: 'text-slate-400 hover:text-indigo-300',
      linkActive: 'text-indigo-400',
    },
    section: {
      padding: 'py-20 md:py-28',
      heading: 'text-3xl md:text-4xl font-bold tracking-tight text-slate-100',
      subheading: 'text-slate-400 text-lg max-w-2xl mx-auto text-center',
    },
    skillTag: {
      base: 'px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300',
    },
    projectCard: {
      base: 'glass-card rounded-2xl p-6 h-full flex flex-col hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300',
      techTag: 'px-2.5 py-1 rounded-md text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
    },
    experience: {
      dot: 'bg-indigo-500 ring-4 ring-indigo-500/20',
      line: 'bg-gradient-to-b from-indigo-500/50 to-transparent',
    },
    socialIcon: {
      base: 'flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 hover:-translate-y-0.5 transition-all duration-300',
    },
    backToTop: {
      base: 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/30',
    },
  },

  motion: {
    transition: 'transition-all duration-300 ease-out',
    reveal: 'transition-all duration-700 ease-out',
    stagger: 60,
  },
} as const;

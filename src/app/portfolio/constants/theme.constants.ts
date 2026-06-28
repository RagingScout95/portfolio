/**
 * Neon Cockpit theme — game HUD, eye-soothing dark, cyan/teal neon + amber retro
 */

export const Theme = {
  background: {
    primary: 'cockpit-bg',
    panel: 'hud-panel',
  },
  text: {
    primary: 'text-slate-200',
    muted: 'text-slate-400',
    accent: 'text-teal-400',
    amber: 'text-amber-400',
    heading: 'hud-heading',
    label: 'hud-title',
  },
  button: {
    default: 'hud-btn',
    primary: 'hud-btn hud-btn-primary',
  },
  motion: {
    transition: 'transition-all duration-300 ease-out',
    stagger: 60,
  },
} as const;

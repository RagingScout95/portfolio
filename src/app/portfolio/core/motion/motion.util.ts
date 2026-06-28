export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;
}

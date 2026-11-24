/**
 * Styles for the "404" digits. They are rendered with the page as a React <style>
 * (hoisted into <head>, deduplicated by `href`) instead of a CSS Module: app/not-found.tsx
 * belongs to the root layout, so a module stylesheet would be preloaded on every route.
 *
 * The digits drop in with a spring, then float gently out of step; with a mouse they lean
 * away from the pointer (each digit at its own depth, see DigitsParallax) and the "0"
 * spins a full turn when hovered. Reduced motion: static.
 */
export const notFoundCss = `
.nf-digit, .nf-float, .nf-glyph { display: inline-block; }
.nf-glyph { padding-inline: 0.01em; }
@media (prefers-reduced-motion: no-preference) {
  .nf-digit {
    animation: nf-drop 1s cubic-bezier(0.34, 1.45, 0.64, 1) calc(0.1s + var(--i) * 0.09s) both;
    translate: calc(var(--px, 0) * (var(--i) - 1 + 1.6) * 1px) calc(var(--py, 0) * (1.2 + var(--i) * 0.4) * 1px);
    transition: translate 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .nf-float { animation: nf-float 5.5s ease-in-out calc(1.1s + var(--i) * -1.3s) infinite; }
  .nf-code[data-paused] .nf-float { animation-play-state: paused; }
  .nf-glyph { transition: rotate 0.9s cubic-bezier(0.34, 1.45, 0.64, 1); }
  .nf-digit:nth-child(2):hover .nf-glyph { rotate: 360deg; }
}
@keyframes nf-drop {
  from { opacity: 0; transform: translateY(-60px) scale(0.85) rotate(calc((var(--i) - 1) * 8deg)); }
}
@keyframes nf-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(calc((var(--i) - 1) * 1.5deg + 0.5deg)); }
}
`;

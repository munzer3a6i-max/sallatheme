/**
 * Zirar — reveal home blocks as they scroll into view.
 * Disabled when the merchant turns motion off, or when the visitor asks the
 * operating system to reduce motion.
 */
export default function initReveal() {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.zirar_enable_motion || reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.js-reveal').forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
  );

  document.querySelectorAll('.js-reveal').forEach((el) => observer.observe(el));

  // Blocks rendered later (ajax product lists, more pages…) opt in too.
  document.addEventListener('zirar::reveal', () =>
    document.querySelectorAll('.js-reveal:not(.is-revealed)').forEach((el) => observer.observe(el))
  );
}

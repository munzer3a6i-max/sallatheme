/**
 * Zirar — light / dark scheme controller.
 *
 * The merchant picks the default scheme from the theme settings
 * (`color_scheme`: light | dark | auto) and may allow visitors to override it.
 * The visitor's own choice is remembered in localStorage and re-applied before
 * paint by the inline snippet in `layouts/master.twig`.
 */
const STORAGE_KEY = 'zirar::color-scheme';

export const getStoredScheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

export const storeScheme = (scheme) => {
  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch (error) {
    /* private mode — the choice simply won't persist */
  }
};

export const systemPrefersDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const resolveScheme = () => {
  const stored = getStoredScheme();
  if (stored === 'dark' || stored === 'light') return stored;

  const preferred = window.zirar_color_scheme || 'light';
  if (preferred === 'auto') return systemPrefersDark() ? 'dark' : 'light';
  return preferred === 'dark' ? 'dark' : 'light';
};

export const applyScheme = (scheme) => {
  const isDark = scheme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.dataset.scheme = isDark ? 'dark' : 'light';
  document
    .querySelectorAll('.scheme-toggle')
    .forEach((btn) => btn.setAttribute('aria-pressed', isDark ? 'true' : 'false'));
  return scheme;
};

export default function initColorScheme() {
  applyScheme(resolveScheme());

  document.querySelectorAll('.scheme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      storeScheme(next);
      applyScheme(next);
    });
  });

  // Follow the OS while the merchant default is `auto` and the visitor never chose.
  if (window.matchMedia && window.zirar_color_scheme === 'auto' && !getStoredScheme()) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (getStoredScheme()) return;
      applyScheme(event.matches ? 'dark' : 'light');
    });
  }
}

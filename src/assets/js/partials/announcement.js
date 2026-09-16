/**
 * Zirar — dismissible announcement bar. The dismissal is keyed by the bar's
 * content hash so a new announcement shows again for everyone.
 */
export default function initAnnouncement() {
  const bar = document.querySelector('#announcement-bar');
  if (!bar) return;

  const storageKey = 'zirar::announcement::' + (bar.dataset.hash || '0');

  try {
    if (localStorage.getItem(storageKey) === 'dismissed') {
      bar.remove();
      return;
    }
  } catch (error) {
    /* storage unavailable — always show the bar */
  }

  bar.classList.remove('is-hidden');

  bar.querySelector('.announcement-bar__close')?.addEventListener('click', () => {
    bar.classList.add('is-dismissing');
    try {
      localStorage.setItem(storageKey, 'dismissed');
    } catch (error) {
      /* ignore */
    }
    setTimeout(() => bar.remove(), 300);
  });
}

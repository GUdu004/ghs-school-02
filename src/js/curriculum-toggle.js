/**
 * Dual Curriculum Interactive Filter/Toggle Controller
 */
export function initCurriculumToggle() {
  const toggleButtons = document.querySelectorAll('.curriculum-tab-btn');
  const cards = document.querySelectorAll('.curriculum-card');

  if (!toggleButtons.length) return;

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.getAttribute('data-curriculum-filter');

      toggleButtons.forEach(b => {
        b.classList.remove('btn--accent');
        b.classList.add('btn--outline');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.remove('btn--outline');
      btn.classList.add('btn--accent');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const cardTrack = card.getAttribute('data-track');
        if (targetFilter === 'all' || cardTrack === targetFilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Accessible FAQ & Content Accordion Controller
 */
export function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const targetId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);

      // Toggle current trigger
      trigger.setAttribute('aria-expanded', !isExpanded);
      if (panel) {
        if (!isExpanded) {
          panel.classList.add('is-open');
        } else {
          panel.classList.remove('is-open');
        }
      }
    });
  });
}

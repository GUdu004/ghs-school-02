import { initNavigation } from './navigation.js';
import { initWhatsAppFunnel } from './whatsapp-funnel.js';
import { initAccordion } from './accordion.js';
import { initCurriculumToggle } from './curriculum-toggle.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initWhatsAppFunnel();
  initAccordion();
  initCurriculumToggle();
});

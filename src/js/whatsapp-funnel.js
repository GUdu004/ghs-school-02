import { SITE_CONFIG } from './config.js';

/**
 * Initializes all WhatsApp Conversion Buttons and Widgets across the page
 */
export function initWhatsAppFunnel() {
  const whatsappButtons = document.querySelectorAll('[data-whatsapp-intent]');
  
  whatsappButtons.forEach(button => {
    const intent = button.getAttribute('data-whatsapp-intent') || 'general';
    const message = SITE_CONFIG.whatsAppMessages[intent] || SITE_CONFIG.whatsAppMessages.general;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsAppNumber}?text=${encodedMessage}`;
    
    if (button.tagName === 'A') {
      button.setAttribute('href', whatsappUrl);
      button.setAttribute('target', '_blank');
      button.setAttribute('rel', 'noopener noreferrer');
    } else {
      button.addEventListener('click', () => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      });
    }
  });

  // Inject or update persistent floating widget
  const floatingWidget = document.querySelector('.whatsapp-widget');
  if (floatingWidget) {
    const pageIntent = document.body.getAttribute('data-page-intent') || 'general';
    const message = SITE_CONFIG.whatsAppMessages[pageIntent] || SITE_CONFIG.whatsAppMessages.general;
    floatingWidget.setAttribute('href', `https://wa.me/${SITE_CONFIG.whatsAppNumber}?text=${encodeURIComponent(message)}`);
    floatingWidget.setAttribute('target', '_blank');
    floatingWidget.setAttribute('rel', 'noopener noreferrer');
  }
}

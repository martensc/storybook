/** @type { import('@storybook/html').Preview } */

import '../assets/scss/styles.scss';

// Inject uswds-init.min.js dynamically
if (typeof window !== 'undefined') {
  const existingScript = document.querySelector('script[data-uswds-init]');
  
  if (!existingScript) {
    const initScript = document.createElement('script');
    initScript.src = '/uswds/js/uswds-init.min.js';
    initScript.defer = true;
    initScript.dataset.uswdsInit = true; // Prevent duplicate injection
    document.head.appendChild(initScript);
  }
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Elements', 'Components'],
      },
    },
  },
};

export default preview;

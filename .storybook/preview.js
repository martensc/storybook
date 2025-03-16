/** @type { import('@storybook/html').Preview } */

import '../src/scss/styles.scss';

// Dynamically inject uswds-init.min.js served directly from node_modules
if (typeof window !== 'undefined') {
  const existingScript = document.querySelector('script[data-uswds-init]');
  
  if (!existingScript) {
    const initScript = document.createElement('script');
    initScript.src = 'uswds/js/uswds-init.min.js';
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

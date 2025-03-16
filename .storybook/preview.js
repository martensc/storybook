/** @type { import('@storybook/html').Preview } */

import '../src/scss/styles.scss';

// Global decorator for injecting USWDS init JS (non-hashed filename)
export const decorators = [
  (Story) => {
    if (typeof window !== 'undefined') {
      const existingScript = document.querySelector('script[data-uswds-init]');

      if (!existingScript) {
        const initScript = document.createElement('script');
        initScript.src = 'uswds/js/uswds-init.min.js';
        initScript.defer = true;
        initScript.dataset.uswdsInit = true;
        document.head.appendChild(initScript);
      }
    }

    return Story();
  },
];

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
    a11y: {
      config: {},
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
      },
    },
  },
};

export default preview;

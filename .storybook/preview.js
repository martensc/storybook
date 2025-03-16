/** @type { import('@storybook/html').Preview } */

import '../src/scss/styles.scss';

if (typeof window !== 'undefined') {
  // Fetch manifest and inject correct hashed JS
  fetch('asset-manifest.json')
    .then(response => response.json())
    .then(manifest => {
      // Find the hashed JS filename
      const jsFile = Object.values(manifest).find(path => path.includes('uswds-init') && path.endsWith('.js'));

      if (jsFile) {
        const existingScript = document.querySelector('script[data-uswds-init]');
        if (!existingScript) {
          const initScript = document.createElement('script');
          initScript.src = jsFile;
          initScript.defer = true;
          initScript.dataset.uswdsInit = true;
          document.head.appendChild(initScript);
        }
      }
    });
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

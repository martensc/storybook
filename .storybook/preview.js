/** @type { import('@storybook/html').Preview } */

// Import main SCSS styles for Storybook
import '../src/scss/styles.scss';

// Dynamically load hashed USWDS init JS script from manifest
if (typeof window !== 'undefined') {
  fetch('asset-manifest.json')
    .then(response => response.json())
    .then(manifest => {
      // Locate the hashed USWDS init JS file from manifest entries
      const jsFile = Object.values(manifest).find(path => path.includes('uswds-init') && path.endsWith('.js'));

      if (jsFile) {
        // Prevent duplicate injection of the init script
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

// Configure Storybook preview parameters
const preview = {
  parameters: {
    // Define how Storybook controls behave (color/date matchers)
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Define Story sorting order in UI
    options: {
      storySort: {
        order: ['Elements', 'Components'],
      },
    },
    // Enable and configure accessibility checks (a11y addon)
    a11y: {
      config: {},
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
      },
    },
  },
};

export default preview;

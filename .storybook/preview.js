/** @type { import('@storybook/html').Preview } */

import '../assets/scss/styles.scss';
import { useEffect } from '@storybook/client-api';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'uswds.min.js';
        document.body.appendChild(script);

        const initScript = document.createElement('script');
        initScript.src = 'uswds-init.min.js';
        document.body.appendChild(initScript);

        return () => {
          // Cleanup if needed
        };
      }, []);

      return Story();
    },
  ],
};

export default preview;

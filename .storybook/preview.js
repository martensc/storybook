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
    options: {
      storySort: {
        order: ['Elements', 'Components'],
      },
    },
  },
  decorators: [
    (Story) => {
      console.log('Decorator running');

      useEffect(() => {
        console.log('useEffect running');
        const initScript = document.createElement('script');
        initScript.src = 'uswds-init.min.js';
        document.head.appendChild(initScript);

        const script = document.createElement('script');
        script.src = 'uswds.min.js';
        document.body.appendChild(script);

        return () => {
          console.log('useEffect cleanup');
          // Cleanup if needed
        };
      }, []);

      return Story();
    },
  ],
};

export default preview;

/** @type { import('@storybook/html').Preview } */

import '../assets/scss/styles.scss';
import { useEffect } from '@storybook/preview-api';

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

      useEffect(() => {
        const initScript = document.createElement('script');
        initScript.src = 'uswds-init.min.js';
        initScript.id = 'uswds-init-script';
        document.head.appendChild(initScript);
        
        const script = document.createElement('script');
        script.src = 'uswds.min.js';
        script.id = 'uswds-script';
        document.body.appendChild(script);

        return () => {
          const initScript = document.getElementById('uswds-init-script');
          if (initScript) {
            initScript.remove();
          }
        
          const script = document.getElementById('uswds-script');
          if (script) {
            script.remove();
          }
        };
      }, []);

      return Story();
    },
  ],
};

export default preview;

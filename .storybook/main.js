/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  "stories": ['../src/**/*.stories.js'],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/html-webpack5",
    "options": {
      builder: {
          useSWC: true,
      },
      fastRefresh: false,
    }
  },
  staticDirs: ['../node_modules/@uswds/uswds/dist/js'],
};
export default config;

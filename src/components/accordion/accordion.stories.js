import accordionTwig from './accordion.twig';
import data from './accordion.yml';
import borderedData from './accordion~bordered.yml';
import './accordion.js';
import uswdsAccordion from '@uswds/uswds/js/usa-accordion';

export default {
  title: 'Components/Accordion',
};

const Default = {
  render: args => {
    const html = accordionTwig(args);

    // After DOM render, initialize Accordion behavior
    setTimeout(() => {
      uswdsAccordion.on(document.body);
    }, 0);

    return html;
  },
  args: { ...data },
};

export const Accordion = {
  ...Default,
  args: {
    ...data,
  },
};

export const Bordered = {
  ...Default,
  args: {
    ...borderedData,
  },
};

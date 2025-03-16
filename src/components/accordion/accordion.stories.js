import accordionTwig from './accordion.twig';
import data from './accordion.yml';
import borderedData from './accordion~bordered.yml';
import './accordion.js';
import uswdsAccordion from '@uswds/uswds/js/usa-accordion';
import { initUswdsComponent } from '../../utils/uswds-init';

export default {
  title: 'Components/Accordion',
};

const Default = {
  render: args => accordionTwig(args),
  args: { ...data },
  play: async () => {
    initUswdsComponent(uswdsAccordion);
  },
};

export const Accordion = {
  ...Default,
  args: { ...data },
};

export const Bordered = {
  ...Default,
  args: { ...borderedData },
};

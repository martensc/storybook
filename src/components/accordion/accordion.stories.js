import accordionTwig from './accordion.twig';
import data from './accordion.yml';
import borderedData from './accordion~bordered.yml';
import './accordion.js';

export default {
  title: 'Components/Accordion',
};

const Default = {
  render: args => accordionTwig(args),
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

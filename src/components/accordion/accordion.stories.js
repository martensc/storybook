import accordionTwig from './accordion.twig';
import data from './accordion.yml';

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

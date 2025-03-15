import accordionTwig from './modal.twig';
import data from './modal.yml';
import focedActiondData from './modal~forced-action.yml';
import largeData from './modal~large.yml';

export default {
  title: 'Components/Modal',
};

const Default = {
  render: args => accordionTwig(args),
  args: { ...data },
};

export const Modal = {
  ...Default,
  args: {
    ...data,
  },
};

export const ForcedAction = {
  ...Default,
  args: {
    ...focedActiondData,
  },
};

export const Large = {
  ...Default,
  args: {
    ...largeData,
  },
};

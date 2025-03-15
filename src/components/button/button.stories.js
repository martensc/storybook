import buttonTwig from './button.twig';
import data from './button.yml';
import secondaryData from './button~secondary.yml';

export default {
  title: 'Components/Button',
};

const Default = {
  render: args => buttonTwig(args),
  args: { ...data },
};

export const Primary = {
  ...Default,
  args: {
    ...data,
  },
};

export const Secondary = {
  ...Default,
  args: {
    ...data,
    ...secondaryData,
  },
};

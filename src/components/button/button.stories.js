import buttonTwig from './button.twig';
import buttonData from './button.yml';

export default {
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(buttonData.variants),
    },
  },
};

const Template = ({ variant }) => {
  const data = buttonData.variants[variant];
  return buttonTwig(data);
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

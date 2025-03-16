import modalTwig from './modal.twig';
import data from './modal.yml';
import forcedActionData from './modal~forced-action.yml';
import largeData from './modal~large.yml';
import uswdsModal from '@uswds/uswds/js/usa-modal';

export default {
  title: 'Components/Modal',
};

const Default = {
  render: args => modalTwig(args),
  args: { ...data },
  play: async () => {
    // Initialize Modal behavior after render
    uswdsModal.on(document.body);
  },
};

export const Modal = {
  ...Default,
  args: { ...data },
};

export const Large = {
  ...Default,
  args: { ...largeData },
};

export const ForcedAction = {
  ...Default,
  args: { ...forcedActionData },
};

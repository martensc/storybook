import modalTwig from './modal.twig';
import data from './modal.yml';
import forcedActionData from './modal~forced-action.yml';
import largeData from './modal~large.yml';
import uswdsModal from '@uswds/uswds/js/usa-modal';
import { initUswdsComponent } from '../../utils/uswds-init';

export default {
  title: 'Components/Modal',
};

// Shared base config
const baseStory = {
  render: args => modalTwig(args),
  args: { ...data },

  play: async ({ canvasElement }) => {
    const modalTrigger = canvasElement.querySelector('[data-open-modal]');
    if (modalTrigger) {
      initUswdsComponent(uswdsModal, canvasElement);
    }
  },
};

// Default modal
export const Default = {
  ...baseStory,
  args: { ...data },
};

// Large variant
export const Large = {
  ...baseStory,
  args: { ...largeData },
};

// Forced action variant
export const ForcedAction = {
  ...baseStory,
  args: { ...forcedActionData },
};

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
  play: async () => {
    initUswdsComponent(uswdsModal);
  },
};

// Export Default as the primary story
export const Default = {
  ...baseStory,
  args: { ...data },
};

// Other variants
export const Large = {
  ...baseStory,
  args: { ...largeData },
};

export const ForcedAction = {
  ...baseStory,
  args: { ...forcedActionData },
};

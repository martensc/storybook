import modalTwig from './modal.twig';
import data from './modal.yml';
import forcedActionData from './modal~forced-action.yml';
import largeData from './modal~large.yml';
import uswdsModal from '@uswds/uswds/js/usa-modal';

export default {
  title: 'Components/Modal',
};

const Default = {
  render: args => {
    const html = modalTwig(args);

    // After DOM injection, initialize Modal JS
    setTimeout(() => {
      uswdsModal.on(document.body);
    }, 0);

    return html;
  },
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
    ...forcedActionData,
  },
};

export const Large = {
  ...Default,
  args: {
    ...largeData,
  },
};

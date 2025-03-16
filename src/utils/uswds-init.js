/**
 * Initializes a USWDS component after Storybook story renders.
 * @param {Object} component - Imported USWDS component (e.g., uswdsAccordion)
 * @param {HTMLElement} target - The DOM element to initialize on (default: document.body)
 */
export function initUswdsComponent(component, target = document.body) {
  if (component && typeof component.on === 'function') {
    component.on(target);
  } else {
    console.warn('Invalid USWDS component passed to initUswdsComponent');
  }
}

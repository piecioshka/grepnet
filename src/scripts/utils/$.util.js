/**
 * @param {string} selector
 * @param {Element} $where
 * @returns {HTMLElement}
 */
export function $(selector, $where = document.body) {
  /**
   * @type {HTMLElement|null}
   */
  const $element = $where.querySelector(selector);
  if (!$element) {
    throw new Error(`no element was found by "${selector}"`);
  }
  return $element;
}

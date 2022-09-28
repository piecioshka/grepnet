export const clearElement = ($element) => {
  while ($element.firstElementChild) {
    $element.firstElementChild.remove();
  }
};

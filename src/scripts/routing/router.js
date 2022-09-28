/**
 * @typedef RouterStrategy
 * @property {Function} getUrl
 * @property {Function} open
 */

export class Router {
  /**
   * @type {RouterStrategy|null}
   */
  strategy = null;

  setStrategy(strategy) {
    this.strategy = strategy;
  }
  use(routes) {
    this.routes = routes;
  }
  #resolveRoute($outlet) {
    const currentUrl = this.strategy?.getUrl();
    const route = this.routes[currentUrl];
    if (!route) {
      console.warn(`not supported url "${currentUrl}"`);
      return;
    }
    route($outlet);
  }
  start($outlet) {
    this.#resolveRoute($outlet);
    window.addEventListener(
      'hashchange',
      this.#resolveRoute.bind(this, $outlet),
    );
  }
  go(hash) {
    this.strategy?.open(hash);
  }
}

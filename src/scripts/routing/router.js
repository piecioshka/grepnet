export class Router {
  routes = {};

  use(routes) {
    this.routes = routes;
  }

  #resolveRoute($outlet) {
    const path = location.hash.slice(1) || '/';
    const route = this.routes[path];
    if (!route) {
      console.warn(`not supported url "${path}"`);
      return;
    }
    route($outlet);
  }

  start($outlet) {
    this.#resolveRoute($outlet);
    window.addEventListener('hashchange', () => {
      this.#resolveRoute($outlet);
    });
  }
}

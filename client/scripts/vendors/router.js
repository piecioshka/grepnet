import { EventEmitter } from './event-emitter';

export class Router extends EventEmitter {
  #config = {
    defaultPath: '/',
    prefix: '#',
  };

  routes = {};

  constructor(settings = {}) {
    super();
    Object.assign(this.#config, settings);
  }

  use(routes) {
    this.routes = routes;
  }

  start($outlet) {
    this.#resolveRoute($outlet);
    window.addEventListener('hashchange', () => {
      this.#resolveRoute($outlet);
    });
  }

  /**
   * @param {string} route
   * @returns {string}
   */
  #replaceParamToGroup(route) {
    return route.replace(/:(\w*)/g, (_a, group) => `(?<${group}>.*)`);
  }

  /**
   * @param {string} path
   * @returns {{route: Function, params: Record<string, string>}|null}
   */
  #getRoute(path) {
    let foundRoute = null;
    Object.keys(this.routes).forEach((route) => {
      const regexp = new RegExp(`^${this.#replaceParamToGroup(route)}$`);
      const match = regexp.test(path);
      const params = path.match(regexp)?.groups;
      if (match) {
        foundRoute = {
          route: this.routes[route],
          params,
        };
      }
    });
    return foundRoute;
  }

  #resolveRoute($outlet) {
    const path =
      location.hash.replace(this.#config.prefix, '') ||
      this.#config.defaultPath;
    const foundRoute = this.#getRoute(path);
    if (!foundRoute) {
      console.warn(`not supported url "${path}"`);
      return;
    }
    foundRoute.route($outlet, foundRoute.params);
    this.emit('loaded:url', { path });
  }
}

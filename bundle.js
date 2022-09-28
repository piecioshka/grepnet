/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/Component.js":
/*!*********************************************!*\
  !*** ./src/scripts/components/Component.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _utils_clearElement_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/clearElement.util */ "./src/scripts/utils/clearElement.util.js");

class Component {
  template() {
    return '';
  }

  compile() {
    const parse = new DOMParser();
    const document = parse.parseFromString(this.template(), 'text/html');
    return document.body.firstElementChild;
  }

  render($outlet) {
    this.$el = this.compile();
    (0,_utils_clearElement_util__WEBPACK_IMPORTED_MODULE_0__.clearElement)($outlet);
    $outlet.append(this.$el);
  }

}

/***/ }),

/***/ "./src/scripts/components/TaskEdit.component.js":
/*!******************************************************!*\
  !*** ./src/scripts/components/TaskEdit.component.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskEdit": () => (/* binding */ TaskEdit)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/scripts/components/Component.js");

class TaskEdit extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {
  template() {
    return `
      <div class="update-task-form">
        <form
          class="col-sm-6"
          ng-submit="submit({ title: title, url: url, phrase: phrase, delay: delay })"
        >
          <fieldset class="form-group">
            <input
              id="grepnet-task-title"
              class="form-control"
              type="text"
              ng-model="title"
              ng-required="true"
              placeholder="Task title"
            />
          </fieldset>

          <fieldset class="form-group">
            <input
              id="grepnet-task-url"
              class="form-control"
              type="url"
              ng-model="url"
              ng-required="true"
              placeholder="URL: Where to grep?"
            />
          </fieldset>

          <fieldset class="form-group">
            <input
              id="grepnet-task-phrase"
              class="form-control"
              type="text"
              ng-model="phrase"
              ng-required="true"
              placeholder="Phrase: grep param?"
            />
          </fieldset>

          <fieldset class="form-group">
            <div class="input-group">
              <input
                id="grepnet-task-delay"
                class="form-control"
                type="number"
                ng-model="delay"
                min="2"
                max="86400"
                ng-required="true"
                placeholder="Delay: time for interval"
              />

              <div class="input-group-addon">seconds</div>
            </div>
          </fieldset>

          <fieldset>
            <button
              class="btn btn-primary add-task"
              type="submit"
              ng-if="mode === 'add'"
            >
              Add task
            </button>

            <button
              class="btn btn-primary add-task"
              type="submit"
              ng-if="mode === 'edit'"
            >
              Edit task
            </button>
          </fieldset>
        </form>
      </div>
    `;
  }

  constructor(taskId) {
    super();
    console.debug('piecioshka', {
      taskId
    });
  }

}

/***/ }),

/***/ "./src/scripts/components/TaskList.component.js":
/*!******************************************************!*\
  !*** ./src/scripts/components/TaskList.component.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskList": () => (/* binding */ TaskList)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/scripts/components/Component.js");

class TaskList extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    this.tasks = [];
  }

  template() {
    return `
      <div class="row">
        <div class="task-list"></div>

        <div class="col-sm-12">
          <p class="alert alert-warning">
            Task list is empty.
          </p>
          <p>
            Please <a class="btn btn-success" href="#/add">add</a> a task.
          </p>
        </div>
      </div>
    `;
  }

  render($outlet) {
    super.render($outlet);
  }

}

/***/ }),

/***/ "./src/scripts/routing/location.strategy.js":
/*!**************************************************!*\
  !*** ./src/scripts/routing/location.strategy.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationHashStrategy": () => (/* binding */ LocationHashStrategy)
/* harmony export */ });
class LocationHashStrategy {
  getUrl() {
    return location.hash.slice(1) || '/';
  }

  open(url) {
    location.hash = url;
  }

}

/***/ }),

/***/ "./src/scripts/routing/router.js":
/*!***************************************!*\
  !*** ./src/scripts/routing/router.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _resolveRoute = /*#__PURE__*/_classPrivateFieldLooseKey("resolveRoute");

/**
 * @typedef RouterStrategy
 * @property {Function} getUrl
 * @property {Function} open
 */
class Router {
  constructor() {
    Object.defineProperty(this, _resolveRoute, {
      value: _resolveRoute2
    });
    this.strategy = null;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  use(routes) {
    this.routes = routes;
  }

  start($outlet) {
    _classPrivateFieldLooseBase(this, _resolveRoute)[_resolveRoute]($outlet);

    window.addEventListener('hashchange', _classPrivateFieldLooseBase(this, _resolveRoute)[_resolveRoute].bind(this, $outlet));
  }

  go(hash) {
    this.strategy?.open(hash);
  }

}

function _resolveRoute2($outlet) {
  const currentUrl = this.strategy?.getUrl();
  const route = this.routes[currentUrl];

  if (!route) {
    console.warn(`not supported url "${currentUrl}"`);
    return;
  }

  route($outlet);
}

/***/ }),

/***/ "./src/scripts/routing/routes.js":
/*!***************************************!*\
  !*** ./src/scripts/routing/routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _components_TaskList_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/TaskList.component */ "./src/scripts/components/TaskList.component.js");
/* harmony import */ var _components_TaskEdit_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/TaskEdit.component */ "./src/scripts/components/TaskEdit.component.js");


const routes = {
  '/': $outlet => {
    const component = new _components_TaskList_component__WEBPACK_IMPORTED_MODULE_0__.TaskList();
    component.render($outlet);
  },
  '/add': $outlet => {
    const component = new _components_TaskEdit_component__WEBPACK_IMPORTED_MODULE_1__.TaskEdit();
    component.render($outlet);
  },
  '/edit/:id': ($outlet, params) => {
    const component = new _components_TaskEdit_component__WEBPACK_IMPORTED_MODULE_1__.TaskEdit(params.id);
    component.render($outlet);
  }
};

/***/ }),

/***/ "./src/scripts/utils/$.util.js":
/*!*************************************!*\
  !*** ./src/scripts/utils/$.util.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $)
/* harmony export */ });
/**
 * @param {string} selector
 * @param {Element} $where
 * @returns {HTMLElement}
 */
function $(selector, $where = document.body) {
  /**
   * @type {HTMLElement|null}
   */
  const $element = $where.querySelector(selector);

  if (!$element) {
    throw new Error(`no element was found by "${selector}"`);
  }

  return $element;
}

/***/ }),

/***/ "./src/scripts/utils/clearElement.util.js":
/*!************************************************!*\
  !*** ./src/scripts/utils/clearElement.util.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearElement": () => (/* binding */ clearElement)
/* harmony export */ });
const clearElement = $element => {
  while ($element.firstElementChild) {
    $element.firstElementChild.remove();
  }
};

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _routing_location_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routing/location.strategy */ "./src/scripts/routing/location.strategy.js");
/* harmony import */ var _routing_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routing/router */ "./src/scripts/routing/router.js");
/* harmony import */ var _routing_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routing/routes */ "./src/scripts/routing/routes.js");
/* harmony import */ var _utils_$_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/$.util */ "./src/scripts/utils/$.util.js");






function setupNotifications() {
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission(status => {
      console.log('requestPermission', Notification.permission, status);
    });
  }
}

function main() {
  console.debug('piecioshka, main');
  const $outlet = (0,_utils_$_util__WEBPACK_IMPORTED_MODULE_4__.$)('#outlet');
  setupNotifications();
  const router = new _routing_router__WEBPACK_IMPORTED_MODULE_2__.Router();
  router.use(_routing_routes__WEBPACK_IMPORTED_MODULE_3__.routes);
  router.setStrategy(new _routing_location_strategy__WEBPACK_IMPORTED_MODULE_1__.LocationHashStrategy());
  router.start($outlet);
}

window.addEventListener('DOMContentLoaded', main);
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
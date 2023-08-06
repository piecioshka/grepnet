import '../styles/main.css';
import { setupNotifications } from './helpers/notification.helper';
// import { Router } from './routing/router';
import { Router } from './vendors/router';
import { routes } from './routing/routes';
import { $ } from './utils/$.util';

function main() {
  setupNotifications();

  const router = new Router();
  router.use(routes);
  router.start($('#outlet'));
}

window.addEventListener('DOMContentLoaded', main);

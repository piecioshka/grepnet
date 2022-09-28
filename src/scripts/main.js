import '../styles/main.css';

import { LocationHashStrategy } from './routing/location.strategy';
import { Router } from './routing/router';
import { routes } from './routing/routes';
import { $ } from './utils/$.util';

function setupNotifications() {
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission((status) => {
      console.log('requestPermission', Notification.permission, status);
    });
  }
}

function main() {
  console.debug('piecioshka, main');
  const $outlet = $('#outlet');
  setupNotifications();
  const router = new Router();
  router.use(routes);
  router.setStrategy(new LocationHashStrategy());
  router.start($outlet);
}

window.addEventListener('DOMContentLoaded', main);

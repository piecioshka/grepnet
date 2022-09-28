import { config } from '../config';

export class GrepnetNotificationFactory {
  /**
   * @type {Notification|null}
   */
  notification = null;

  spawn(title, url) {
    if (window.Notification && Notification.permission === 'granted') {
      this.notification = new Notification(`Task '${title}' completed!`, {
        body: `We found your phrase.\nPlease visit: ${url}`,
        icon: './images/gear-64x64.png',
      });

      setTimeout(() => {
        this.notification?.close();
      }, config.CLOSE_NOTIFICATION_DELAY);
    }
  }
}

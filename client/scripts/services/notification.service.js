import { config } from '../config';

export const NotificationService = {
  spawn(title, url) {
    if (window.Notification && Notification.permission === 'granted') {
      const notification = new Notification(`Task '${title}' completed!`, {
        body: `We found your phrase.\nPlease visit: ${url}`,
        icon: './images/gear-64x64.png',
      });

      setTimeout(() => {
        notification?.close();
      }, config.CLOSE_NOTIFICATION_DELAY);
    }
  },
};

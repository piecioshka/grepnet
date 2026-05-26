import { config } from '../config';

export const NotificationService = {
  spawn(title, url) {
    if (window.Notification && Notification.permission === 'granted') {
      const notification = new Notification(`${title}`, {
        body: `✅ Task completed!\nWe found your phrase.\nSee: ${url}`,
        icon: './images/gear-64x64.png',
      });

      setTimeout(() => {
        notification?.close();
      }, config.CLOSE_NOTIFICATION_DELAY);
    }
  },
};

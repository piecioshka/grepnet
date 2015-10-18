const CLOSE_DELAY = 10 * 1000;

class GrepnetNotificationFactory {
    notification = null;

    spawn(title, url) {
        if (window.Notification && Notification.permission === 'granted') {
            this.notification = new Notification(`Task '${title}' completed!`, {
                body: `We found your phrase.\nPlease visit: ${url}`,
                icon: './images/gear-64x64.png'
            });

            setTimeout(() => {
                this.notification.close();
            }, CLOSE_DELAY);
        }
    }
}

export default GrepnetNotificationFactory;

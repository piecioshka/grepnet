const CLOSE_DELAY = 10 * 1000;

export default () => {

    /**
     * @param {string} title Task title.
     * @param {string} url URL for send request.
     */
    function spawn(title, url) {
        if (window.Notification && Notification.permission === 'granted') {
            let notification = new Notification(`Task '${title}' completed!`, {
                body: `We found your phrase.\nPlease visit: ${url}`,
                icon: './images/gear-64x64.png'
            });

            setTimeout(() => {
                notification.close();
            }, CLOSE_DELAY);
        }
    }

    return spawn;
};

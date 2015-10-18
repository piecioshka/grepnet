export default () => {

    /**
     * @param {string} title Task title.
     * @param {string} url URL for send request.
     * @returns {*}
     */
    function spawn(title, url) {
        if (window.Notification && Notification.permission === 'granted') {
            return new Notification(`Task '${title}' completed!`, {
                body: `We found your phrase.\nPlease visit: ${url}`,
                icon: './images/gear-64x64.png'
            });
        }
    }

    return spawn;
};

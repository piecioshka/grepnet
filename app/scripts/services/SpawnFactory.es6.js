export default () => {

    /**
     * @param {string} title Task title.
     * @param {string} url URL for send request.
     * @returns {*}
     */
    let spawn = (title, url) => {
        console.info('spawn:', title, url);

        if (window.Notification && Notification.permission === 'granted') {
            return new Notification(`'${title}' completed!`, {
                body: `We found your phrase. Please visit your URL: ${url}.`,
                icon: './images/gear-64x64.png'
            });
        }
    };

    return spawn;
};

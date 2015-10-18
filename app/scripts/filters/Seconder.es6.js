export default () => {
    return (number) => {
        let hours = Math.floor(number / 3600);
        let minutes = Math.floor((number - (hours * 3600)) / 60);
        let seconds = number - (hours * 3600) - (minutes * 60);

        hours = String(hours).padLeft(2, '0');
        minutes = String(minutes).padLeft(2, '0');
        seconds = String(seconds).padLeft(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };
};

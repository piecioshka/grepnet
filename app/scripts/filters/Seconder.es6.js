export default () => {
    return (number) => {
        let minutes = String(Math.floor(number / 60)).padLeft(2, '0');
        let seconds = String(number % 60).padLeft(2, '0');

        return `${minutes}:${seconds}`;
    };
};

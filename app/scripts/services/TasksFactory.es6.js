export default () => {
    let tasks = [];

    return {
        add: ({ title, url, phrase, delay }) => {
            tasks.unshift({ title, url, phrase, delay, status: 'started' });
        },

        remove(index) {
            tasks.splice(index, 1);
        },

        getAll: () => {
            return tasks;
        }
    };
};

export default () => {
    let tasks = [];

    return {
        add: (task) => {
            task.status = 'started';
            tasks.unshift(task);
        },

        edit: (index, task) => {
            task.status = 'started';
            tasks[index] = task;
        },

        remove(index) {
            tasks.splice(index, 1);
        },

        getAll: () => {
            return tasks;
        },

        at: (index) => {
            return tasks[index];
        }
    };
};

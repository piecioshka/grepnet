export default () => {
    let tasks = [];

    return {
        add: (task) => {
            task.status = 'new';
            tasks.unshift(task);
        },

        edit: (index, task) => {
            task.status = 'new';
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

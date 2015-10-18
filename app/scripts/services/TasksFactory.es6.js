let save = (item) => {
    try {
        localStorage.setItem('grepnet-tasks', JSON.stringify(item));
    } catch (ignore) {
    }
};

let load = () => {
    var tasks = null;

    try {
        tasks = JSON.parse(localStorage.getItem('grepnet-tasks'));
    } catch (ignore) {
    }

    return tasks || [];
};

export default () => {
    let tasks = load();

    return {
        add: (task) => {
            task.status = 'new';
            tasks.unshift(task);

            save(tasks);
        },

        edit: (index, task) => {
            task.status = 'new';
            tasks[index] = task;

            save(tasks);
        },

        remove(index) {
            tasks.splice(index, 1);

            save(tasks);
        },

        getAll: () => {
            return tasks;
        },

        at: (index) => {
            return tasks[index];
        }
    };
};

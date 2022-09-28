export class GrepnetTasksFactory {
  tasks = [];
  /**
   * @type {GrepnetStorage|null}
   */
  storage = null;

  constructor(storage) {
    this.tasks = storage.load('grepnet-tasks') || [];
    this.storage = storage;
  }

  add(task) {
    task.state = 'new';
    this.tasks.unshift(task);
    this.storage?.save('grepnet-tasks', this.tasks);
  }

  edit(index, task) {
    task.state = 'new';
    this.tasks[index] = task;
    this.storage?.save('grepnet-tasks', this.tasks);
  }

  remove(index) {
    this.tasks.splice(index, 1);
    this.storage?.save('grepnet-tasks', this.tasks);
  }

  getAll() {
    return this.tasks;
  }

  at(index) {
    return this.tasks[index];
  }
}

import { StorageService } from './storage.service';
import { uuidv4 } from '../utils/uuidv4.util';
import { config } from '../config';

/**
 * @type {import('../types').Task[]}
 */
let tasks = [];

export const TasksService = {
  getById(id) {
    return tasks.find((task) => task.id === id);
  },

  add(newTask) {
    newTask.state = 'new';
    newTask.id = uuidv4();
    newTask.delay = Number(newTask.delay);
    tasks.unshift(newTask);
    StorageService.save(config.STORAGE_KEY, tasks);
  },

  edit(id, newTask) {
    newTask.state = 'new';
    const index = tasks.findIndex((task) => task.id === id);
    newTask.delay = Number(newTask.delay);
    tasks[index] = { ...tasks[index], ...newTask };
    StorageService.save(config.STORAGE_KEY, tasks);
  },

  removeById(id) {
    tasks = tasks.filter((task) => task.id !== id);
    StorageService.save(config.STORAGE_KEY, tasks);
  },

  setAll(newTasks) {
    tasks = newTasks;
  },

  getAll() {
    return tasks;
  },
};

import { TaskAddPage } from '../pages/task-add.page';
import { TaskEditPage } from '../pages/task-edit.page';
import { TaskListPage } from '../pages/task-list.page';
import { TasksService } from '../services/tasks.service';

function renderPage(constructor) {
  return ($outlet, params) => {
    // console.debug(`piecioshka, new ${constructor.name}`, { params });
    const page = new constructor(params);
    page.render($outlet);
  };
}

export const routes = {
  '/add': renderPage(TaskAddPage),
  '/remove/:id': ($outlet, params) => {
    TasksService.removeById(params.id);
    location.hash = '/';
  },
  '/edit/:id': renderPage(TaskEditPage),
  '/': renderPage(TaskListPage),
};

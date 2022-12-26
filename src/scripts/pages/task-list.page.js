import { EmptyTasksComponent } from '../components/empty-tasks.component';
import { Task } from '../components/task.component';
import { config } from '../config';
import { StorageService } from '../services/storage.service';
import { TasksService } from '../services/tasks.service';
import { Page } from './page';

export class TaskListPage extends Page {
  template() {
    return `
      <div class="page">
        <div id="messages"></div>
        <div id="task-list" class="row"></div>
      </div>
    `;
  }

  render($outlet) {
    super.render($outlet);

    const tasks = StorageService.load(config.STORAGE_KEY) || [];
    TasksService.setAll(tasks);

    if (tasks.length === 0) {
      const empty = new EmptyTasksComponent();
      empty.render(this.$el?.querySelector('#messages'));
    } else {
      const $list = this.$el?.querySelector('#task-list');
      tasks.forEach((task) => {
        const item = new Task({ task });
        item.render($list);
      });
    }
  }
}

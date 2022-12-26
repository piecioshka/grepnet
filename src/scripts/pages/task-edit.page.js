import { TaskFormComponent } from '../components/task-form.component';
import { TasksService } from '../services/tasks.service';
import { Page } from './page';

export class TaskEditPage extends Page {
  /**
   * @type {string|null}
   */
  taskId = null;

  template() {
    return `
      <div class="page">
        <form class="col-sm-6">
          <div id="fields"></div>
          <button class="btn btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    `;
  }

  constructor({ id }) {
    super();
    this.taskId = id;
  }

  render($outlet) {
    super.render($outlet);

    const task = TasksService.getById(this.taskId);

    if (!task) {
      location.hash = '/';
      return;
    }

    const component = new TaskFormComponent({ task });
    component.render(this.$el?.querySelector('#fields'));

    const $form = this.$el?.querySelector('form');
    $form?.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData($form);
      const fields = Object.fromEntries(new Map(formData));
      TasksService.edit(task.id, fields);
      location.hash = '/';
    });
  }
}

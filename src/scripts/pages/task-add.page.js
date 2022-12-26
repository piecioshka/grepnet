import { TaskFormComponent } from '../components/task-form.component';
import { TasksService } from '../services/tasks.service';
import { Page } from './page';

export class TaskAddPage extends Page {
  template() {
    return `
      <div class="page">
        <form class="col-sm-6">
          <div id="fields"></div>
          <button class="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </div>
    `;
  }

  render($outlet) {
    super.render($outlet);

    const fakeTask = {
      url: 'http://piecioshka.pl',
      delay: 123,
      title: 'przykładowe zadanie',
      phrase: 'Kowalski',
      unit: 'seconds',
    };

    const component = new TaskFormComponent({ task: fakeTask });
    component.render(this.$el?.querySelector('#fields'));

    const $form = this.$el?.querySelector('form');
    $form?.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData($form);
      const fields = Object.fromEntries(new Map(formData));
      TasksService.add(fields);
      location.hash = '/';
    });
  }
}

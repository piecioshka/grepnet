import { Component } from './component';

export class EmptyTasksComponent extends Component {
  template() {
    return `
      <div class="col-sm-12">
        <p class="alert alert-warning">
          Task list is empty. Please add a task.
        </p>
      </div>
      `;
  }
}

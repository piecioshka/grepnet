import { Component } from './Component';

export class TaskList extends Component {
  tasks = [];

  template() {
    return `
      <div class="row">
        <div class="task-list"></div>

        <div class="col-sm-12">
          <p class="alert alert-warning">
            Task list is empty.
          </p>
          <p>
            Please <a class="btn btn-success" href="#/add">add</a> a task.
          </p>
        </div>
      </div>
    `;
  }
  render($outlet) {
    super.render($outlet);
  }
}

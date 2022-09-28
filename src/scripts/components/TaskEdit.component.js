import { Component } from './Component';

export class TaskEdit extends Component {
  template() {
    return `
      <div class="update-task-form">
        <form
          class="col-sm-6"
          ng-submit="submit({ title: title, url: url, phrase: phrase, delay: delay })"
        >
          <fieldset class="form-group">
            <input
              id="grepnet-task-title"
              class="form-control"
              type="text"
              ng-model="title"
              ng-required="true"
              placeholder="Task title"
            />
          </fieldset>

          <fieldset class="form-group">
            <input
              id="grepnet-task-url"
              class="form-control"
              type="url"
              ng-model="url"
              ng-required="true"
              placeholder="URL: Where to grep?"
            />
          </fieldset>

          <fieldset class="form-group">
            <input
              id="grepnet-task-phrase"
              class="form-control"
              type="text"
              ng-model="phrase"
              ng-required="true"
              placeholder="Phrase: grep param?"
            />
          </fieldset>

          <fieldset class="form-group">
            <div class="input-group">
              <input
                id="grepnet-task-delay"
                class="form-control"
                type="number"
                ng-model="delay"
                min="2"
                max="86400"
                ng-required="true"
                placeholder="Delay: time for interval"
              />

              <div class="input-group-addon">seconds</div>
            </div>
          </fieldset>

          <fieldset>
            <button
              class="btn btn-primary add-task"
              type="submit"
              ng-if="mode === 'add'"
            >
              Add task
            </button>

            <button
              class="btn btn-primary add-task"
              type="submit"
              ng-if="mode === 'edit'"
            >
              Edit task
            </button>
          </fieldset>
        </form>
      </div>
    `;
  }

  constructor(taskId) {
    super();
    console.debug('piecioshka', { taskId });
  }
}

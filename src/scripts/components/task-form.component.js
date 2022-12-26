import { Component } from './component';
import { $ } from '../utils/$.util';

export class TaskFormComponent extends Component {
  /**
   * @type {import('../types').Task|null}
   */
  task = null;

  template() {
    const { title, url, phrase, delay } = this.task || {};
    return `
      <div>
        <div class="mb-3">
          <input
            name="title"
            class="form-control"
            type="text"
            placeholder="Task title"
            value="${title || ''}"
          />
        </div>

        <div class="mb-3">
          <input
            name="url"
            class="form-control"
            type="url"
            placeholder="URL: Where to grep?"
            value="${url || ''}"
          />
        </div>

        <div class="mb-3">
          <input
            name="phrase"
            class="form-control"
            type="text"
            placeholder="Phrase: grep param?"
            value="${phrase || ''}"
          />
        </div>

        <div class="row mb-3">
          <div class="col-8">
            <input
              name="delay"
              class="form-control"
              type="number"
              min="2"
              placeholder="Delay: time for interval"
              value="${delay || ''}"
            />
          </div>

          <div class="col-4">
            <select class="form-select" name="unit">
              <option value="hours">hours</option>
              <option value="minutes">minutes</option>
              <option value="seconds">seconds</option>
            </select>
          </div>
        </div>
      </div>
      `;
  }

  constructor({ task }) {
    super();
    this.task = task;
  }

  render($outlet) {
    super.render($outlet);

    const $select = $('select', this.$el);
    $select.value = this.task?.unit;
  }
}

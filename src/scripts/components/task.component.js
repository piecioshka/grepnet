/* eslint-disable max-statements */
import { config } from '../config';
import { Component } from './component';
import { TasksService } from '../services/tasks.service';
import { StorageService } from '../services/storage.service';
import { NotificationService } from '../services/notification.service';
import { GrepService } from '../services/grep.service';

export class Task extends Component {
  /**
   * @type {import('../types').Task|null}
   */
  #task = null;

  /**
   * @type {number|null}
   */
  #countdownInterval = null;

  /**
   * @type {number|null}
   */
  #grepInterval = null;

  template() {
    const task = this.#task;
    if (!task) {
      return '';
    }
    return `
      <div class="col-sm-4 mb-4">
        <div class="card">
          <div class="card-header">
            <h4 class="mb-0">${task.title}</h4>
          </div>
          <div class="card-body">
            <dl class="mb-0">
              <dt>url</dt>
              <dd><a href="${task.url}">${task.url}</a></dd>

              <dt>phrase</dt>
              <dd><code>${task.phrase}</code></dd>

              <dt>interval</dt>
              <dd class="mb-0"><em>${task.delay} ${task.unit}</em></dd>
            </dl>
          </div>

          <div class="card-footer">
            <a class="btn btn-sm btn-primary pause-button">Pause</a>
            <a class="btn btn-sm btn-primary start-button">Start</a>
            <a class="btn btn-sm btn-warning edit-button"">Edit</a>
            <a class="btn btn-sm btn-danger remove-button"">Remove</a>
            <a class="btn btn-sm btn-secondary check-button">Check now</a>
          </div>
        </div>
      </div>
    `;
  }

  constructor({ task }) {
    super();
    this.#task = task;
    this.#tryStartCountdown();
  }

  #pause() {
    this.#stopCountdown();
    this.#task.state = 'paused';
    this.#updateCardStyle();
    this.#save();
  }

  #start() {
    this.#startCountdown();
    this.#task.state = 'started';
    this.#updateCardStyle();
    this.#save();
  }

  #edit() {
    this.#stopCountdown();
    location.hash = `/edit/${this.#task?.id}`;
  }

  #remove() {
    this.#stopCountdown();
    location.hash = `/remove/${this.#task?.id}`;
  }

  #check() {
    this.#startGrepping();
  }

  #is(state) {
    return this.#task?.state === state;
  }

  #tryStartCountdown() {
    if (this.#is('new')) {
      this.#startCountdown();
      this.#task.state = 'started';
      this.#updateCardStyle();
      this.#save();
    }
  }

  #save() {
    StorageService.save(config.STORAGE_KEY, TasksService.getAll());
  }

  #stopCountdown() {
    if (this.#countdownInterval) {
      clearInterval(this.#countdownInterval);
    }
    this.#countdownInterval = null;

    if (this.#grepInterval) {
      clearInterval(this.#grepInterval);
    }
    this.#grepInterval = null;
  }

  #resetCountdown() {
    // this.#task.countdown = this.#task.delay;
  }

  async #startGrepping() {
    this.#task.state = 'grepping';
    this.#updateCardStyle();

    const { url, phrase, title } = this.#task;

    try {
      const response = await GrepService.grep(url, phrase);
      this.#resetCountdown();

      if (response.found) {
        this.#stopCountdown();
        this.#task.state = 'completed';
        this.#updateCardStyle();
        NotificationService.spawn(title, url);
      } else {
        this.#task.state = 'started';
        this.#updateCardStyle();
      }
      this.#save();
    } catch (err) {
      this.#resetCountdown();
      this.#task.state = 'error';
      this.#updateCardStyle();
    }
  }

  #startCountdown() {
    this.#resetCountdown();

    if (!this.#task) {
      return;
    }

    this.#countdownInterval = setInterval(() => {
      // this.#task.countdown--;
    }, config.MILLISECONDS_IN_SECOND);

    this.#grepInterval = setInterval(
      () => this.#startGrepping(),
      this.#task.delay * config.MILLISECONDS_IN_SECOND,
    );
  }

  #addClassAndRemove($card, style) {
    if (style) {
      $card?.classList.add(style);
      setTimeout(() => {
        $card?.classList.remove(style);
      }, config.REVERT_STYLE_DELAY);
    }
  }

  #updateCardStyle() {
    const $card = this.$el?.querySelector('.card');

    let style;

    if (this.#is('error')) {
      style = 'bg-danger';
      this.#addClassAndRemove($card, style);
    }

    if (this.#is('grepping')) {
      style = 'bg-warning';
      this.#addClassAndRemove($card, style);
    }

    if (this.#is('completed')) {
      style = 'bg-success';
      $card?.classList.add(style);
    }
  }

  render($outlet) {
    super.render($outlet);

    if (!this.#task) {
      throw new Error('task is not defined');
    }

    this.#updateCardStyle();

    const $pauseButton = this.$el?.querySelector('.pause-button');
    $pauseButton?.addEventListener('click', () => this.#pause());
    if (this.#is('started')) {
      $pauseButton?.remove();
    }

    const $startButton = this.$el?.querySelector('.start-button');
    $startButton?.addEventListener('click', () => this.#start());
    if (this.#is('paused') || this.#is('completed') || this.#is('error')) {
      $startButton?.remove();
    }

    const $editButton = this.$el?.querySelector('.edit-button');
    $editButton?.addEventListener('click', () => this.#edit());

    const $removeButton = this.$el?.querySelector('.remove-button');
    $removeButton?.addEventListener('click', () => this.#remove());

    const $checkButton = this.$el?.querySelector('.check-button');
    $checkButton?.addEventListener('click', () => this.#check());
  }
}

import { Component } from './Component';

export class Task extends Component {
  task = null;

  template() {
    return `
      <div class="col-sm-4">
        <div class="card text-center" ng-class="{
            'card-danger': is('error'),
            'card-success': is('completed'),
            'card-warning': is('grepping')
        }">
          <div class="card-header">
            <h4><span class="label label-default">{{ task.countdown | seconder }}</span></h4>
          </div>
          <div class="card-block">
            <h4>{{ ::task.title }}</h4>

            <p class="card-text">
                <a ng-href="{{ ::task.url }}">{{ ::task.url }}</a>
            </p>

            <code>{{ ::task.phrase }}</code>

            <hr/>

            <a class="btn btn-warning"
              ng-click="pause()"
              ng-show="is('started')"
            >Pause</a>

            <a class="btn btn-primary"
              ng-click="start()"
              ng-show="is('paused') || is('completed') || is('error')"
            >Start</a>

            <a class="btn btn-info"ng-click="edit()">Edit</a>
            <a class="btn btn-danger" ng-click="remove()">Remove</a>
            <a class="btn btn-secondary" ng-click="check()">Check now</a>
          </div>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    this._tryStartCountdown();
  }

  pause() {
    this.stopCountdown();
    this.task.state = 'paused';
    this._save();
  }

  start() {
    this.startCountdown();
    this.task.state = 'started';
    this._save();
  }

  edit() {
    this.stopCountdown();
    // $state.go('edit-task', {
    //   index: this.$index,
    // });
  }

  remove() {
    this.stopCountdown();
    tasks.remove(this.$index);
  }

  check() {
    this.startGrepping();
  }

  is(state) {
    return this.task.state === state;
  }

  _tryStartCountdown() {
    if (this.is('new')) {
      this.startCountdown();
      this.task.state = 'started';
      this._save();
    }
  }

  _save() {
    this.storage.save('grepnet-tasks', this.tasks.getAll());
  }

  stopCountdown() {
    this.$interval.cancel(this.countdownInterval);
    this.countdownInterval = null;

    this.$interval.cancel(this.grepInterval);
    this.grepInterval = null;
  }

  resetCountdown() {
    this.task.countdown = this.task.delay;
  }

  grep(url, phrase) {
    const host = window.location.hostname;
    const options = { url, phrase };
    const fullUrl = `http://${host}:3000`;
    console.log('make a request', fullUrl);

    return this.$http.post(fullUrl, options).then((response) => {
      return {
        status: Boolean(response.data.status),
      };
    });
  }

  startGrepping() {
    this.task.state = 'grepping';

    this.grep(this.task.url, this.task.phrase).then(
      (response) => {
        this.resetCountdown();

        if (response.status) {
          this.stopCountdown();
          this.task.state = 'completed';
          this.notification.spawn(this.task.title, this.task.url);
        } else {
          this.task.state = 'started';
        }

        this._save();
      },
      () => {
        this.resetCountdown();
        this.task.state = 'error';
      },
    );
  }

  startCountdown() {
    this.resetCountdown();

    this.countdownInterval = this.$interval(() => {
      this.task.countdown--;
    }, MILLISECONDS_IN_SECOND);

    this.grepInterval = this.$interval(
      () => this.startGrepping(),
      this.task.delay * MILLISECONDS_IN_SECOND,
    );
  }
}

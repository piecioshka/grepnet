import { clearElement } from '../utils/clearElement.util';

export class Component {
  template() {
    return '';
  }

  compile() {
    const parse = new DOMParser();
    const document = parse.parseFromString(this.template(), 'text/html');
    return document.body.firstElementChild;
  }

  render($outlet) {
    this.$el = this.compile();
    clearElement($outlet);
    $outlet.append(this.$el);
  }
}

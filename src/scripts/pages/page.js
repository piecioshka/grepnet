import { clearElement } from '../utils/dom.util';

import { Component } from '../components/component';

export class Page extends Component {
  render($outlet) {
    clearElement($outlet);
    super.render($outlet);
  }
}

import { Locator } from '@playwright/test';
import Component from './component';

export default class Sidebar extends Component {
  readonly dashboards: Locator;

  constructor(readonly locator: Locator) {
    super(locator);

    this.dashboards = this.rootEl.locator('[href="#default_personal/dashboard"]');
  }
}

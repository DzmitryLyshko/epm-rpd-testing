import { Locator } from '@playwright/test';
import Component from './component';

export default class Header extends Component {
  readonly breadcrumbs: Locator;

  readonly addNewDashboardButton: Locator;

  constructor(readonly locator: Locator) {
    super(locator);

    this.breadcrumbs = this.rootEl.locator('ul[class*=pageBreadcrumbs] > li:nth-child(2) > span');
    this.addNewDashboardButton = this.rootEl.locator('button:has-text("Add New Dashboard")');
  }
}

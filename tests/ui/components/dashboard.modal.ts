import { Locator } from '@playwright/test';
import Component from './component'

export default class DashboardModal extends Component {
  readonly nameInput: Locator;

  readonly descriptionInput: Locator;

  readonly addButton: Locator;

  readonly updateButton: Locator;

  constructor(readonly locator: Locator) {
    super(locator);

    this.nameInput = this.rootEl.locator('[placeholder="Enter dashboard name"]');
    this.descriptionInput = this.rootEl.locator('[placeholder="Enter dashboard description"]');
    this.addButton = this.rootEl.locator('button:text("Add")');
    this.updateButton = this.rootEl.locator('button:text("Update")');
  }
}

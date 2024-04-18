import { Page, ElementHandle } from '@playwright/test';
import BasePage from './base.page';

export default class DashboardsPage extends BasePage {
  public listItems: ElementHandle[];

  constructor(
    page: Page,
    readonly url: string = '/ui/#default_personal/dashboard/',
  ) {
    super(page);
  }

  async addNewDashboard(name: string): Promise<void> {
    await this.header.addNewDashboardButton.click();
    await this.dashboardModal.nameInput.pressSequentially(name);
    await this.dashboardModal.descriptionInput.pressSequentially(`${name} Dashboard for automated testing`);
    await this.dashboardModal.addButton.click();
  }

  async getDashboardsList(): Promise<string[]> {
    await this.page.waitForSelector('[class*=dashboard-table]');
    const dashboardsItems = await this.page.$$('[class*=dashboard-table]');
    const dashboardsNames: string[] = [];
  
    for (let item of dashboardsItems) {
      const name = await item.textContent();
      if (name !== null) dashboardsNames.push(name);
    }
  
    return dashboardsNames;
  }
}

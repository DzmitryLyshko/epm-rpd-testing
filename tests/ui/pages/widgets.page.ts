import { Locator, Page } from '@playwright/test';
import WidgetsGrid from '../components/widgets.grid';
import BasePage from './base.page';

export default class WidgetsPage extends BasePage {
  readonly widgetsGrid: WidgetsGrid;

  readonly deleteButton: Locator;

  readonly confirmDeletionButton: Locator;

  readonly editButton: Locator;

  constructor(
    page: Page,
    readonly url: string = 'ui/#default_personal/dashboard/',
  ) {
    super(page);
    this.widgetsGrid = new WidgetsGrid(this.page.locator('.react-grid-layout'));
    this.deleteButton = this.page.locator('button > span:text("Delete")');
    this.confirmDeletionButton = this.page.locator('button:text("Delete")');
    this.editButton = this.page.locator('button > span:text("Edit")');
  }

  async deleteDashboard(): Promise<void> {
    await this.deleteButton.click();
    await this.confirmDeletionButton.click();
  }

  async updateDashboard(newName: string): Promise<void> {
    await this.editButton.click();
    await this.dashboardModal.nameInput.fill(newName);
    await this.dashboardModal.descriptionInput.fill(`${newName} Dashboard for automated testing`);
    await this.dashboardModal.updateButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.reload();
  }
}

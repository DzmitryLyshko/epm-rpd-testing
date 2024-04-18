import { test as baseTest } from '@playwright/test';
import LoginPage from '../../../ui/pages/login.page';
import HomePage from '../../../ui/pages/home.page';
import DashboardsPage from '../../../ui/pages/dashboards.page';
import WidgetsPage from '../../../ui/pages/widgets.page';

export type MyFixtures = typeof baseTest & {
  loginPage: LoginPage;
  homePage: HomePage;
  dashboardsPage: DashboardsPage;
  widgetsPage: WidgetsPage;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  dashboardsPage: async ({ page }, use) => {
    await use(new DashboardsPage(page));
  },
  widgetsPage: async ({ page }, use) => {
    await use(new WidgetsPage(page));
  }
});

export { expect } from '@playwright/test';

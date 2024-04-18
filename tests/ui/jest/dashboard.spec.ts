import { chromium, Page, Browser } from 'playwright';
import LoginPage from '../../../ui/pages/login.page';
import HomePage from '../../../ui/pages/home.page';
import DashboardsPage from '../../../ui/pages/dashboards.page';
import WidgetsPage from '../../../ui/pages/widgets.page';

describe('Dashboards', () => {
  const defaultUser = {
    user: 'default',
    password: '1q2w3e',
  }
  let dashboardName: string;
  let page: Page;
  let browser: Browser;
  let loginPage: LoginPage;
  let homePage: HomePage;
  let dashboardsPage: DashboardsPage;
  let widgetsPage: WidgetsPage;

  beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    dashboardsPage = new DashboardsPage(page);
    widgetsPage = new WidgetsPage(page);
    await loginPage.goto();
    await loginPage.login(defaultUser);
    await homePage.sidebar.dashboards.click();
  });

  afterEach(async () => {
    await page.close();
    await browser.close();
  });

  test('user is able to create a dashboard via UI', async () => {
    dashboardName = 'Test_Create';
    await dashboardsPage.addNewDashboard(dashboardName);

    const text = await widgetsPage.header.breadcrumbs.innerText();
    expect(text).toMatch(dashboardName.toUpperCase());
  });

  test('user is able to remove a dashboard via UI', async () => {
    dashboardName = 'Test_Delete';
    await dashboardsPage.addNewDashboard(dashboardName);

    await widgetsPage.deleteDashboard();

    const dashboardsNames = await dashboardsPage.getDashboardsList();
    expect(dashboardsNames).not.toContain(dashboardName);
  });

  test('user is able to edit dashboard via UI', async () => {
    dashboardName = 'Test_Edit';
    const dashboardNewName = 'Test_Update';
    await dashboardsPage.addNewDashboard(dashboardName);

    await widgetsPage.updateDashboard(dashboardNewName);
    const text = await widgetsPage.header.breadcrumbs.innerText();
    expect(text).toMatch(dashboardNewName.toUpperCase());
  });
});
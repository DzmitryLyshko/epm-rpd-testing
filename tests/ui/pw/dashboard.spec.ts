import { test, expect } from './setup';

test.describe('Dashboards', () => {
  const defaultUser = {
    user: 'default',
    password: '1q2w3e',
  }
  let dashboardName: string;

  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.goto();
    await loginPage.login(defaultUser);
    await homePage.sidebar.dashboards.click();
  });

  // test.afterEach(async () => {
  //   // here will be the deletion of the test dashboards via API
  // });

  test('user is able to create a dashboard via UI', async ({ dashboardsPage, widgetsPage }) => {
    dashboardName = 'Test_Create';
    await dashboardsPage.addNewDashboard(dashboardName);

    await expect(widgetsPage.header.breadcrumbs).toHaveText(dashboardName);
  });

  test('user is able to remove a dashboard via UI', async ({ dashboardsPage, widgetsPage }) => {
    dashboardName = 'Test_Delete';
    await dashboardsPage.addNewDashboard(dashboardName);

    await widgetsPage.deleteDashboard();

    const dashboardsNames = await dashboardsPage.getDashboardsList();
    expect(dashboardsNames).not.toContain(dashboardName);
  });

  test('user is able to edit dashboard via UI', async ({ dashboardsPage, widgetsPage }) => {
    dashboardName = 'Test_Edit';
    const dashboardNewName = 'Test_Update';
    await dashboardsPage.addNewDashboard(dashboardName);

    await widgetsPage.updateDashboard(dashboardNewName);
    await expect(widgetsPage.header.breadcrumbs).toHaveText(dashboardNewName);
  });
});

import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Page, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import DashboardsPage from '../pages/dashboards.page';
import WidgetsPage from '../pages/widgets.page';

let loginPage: LoginPage;
let dashboardsPage: DashboardsPage;
let widgetsPage: WidgetsPage;

const defaultUser = {
    user: process.env.USER,
    password: process.env.PASSWORD,
  }

Before({ tags: '@dashboards' }, async function () {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    loginPage = new LoginPage(page);
    dashboardsPage = new DashboardsPage(page);
    widgetsPage = new WidgetsPage(page);
});

// After(async function () {
//     // here will be deletion of test dashboards via API
// });

Given(/^I initialize the test environment$/, async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    loginPage = new LoginPage(page);
    dashboardsPage = new DashboardsPage(page);
    widgetsPage = new WidgetsPage(page);
});

Given(/^I open Login page$/, async () => {
    await loginPage.goto();
});

Given(/^I log in with default credentials$/, async () => {
    await loginPage.login(defaultUser);
});

When(/^I create a dashboard with name "(.+)"$/, async (dashboardName: string) => {
    await dashboardsPage.addNewDashboard(dashboardName);
});

Then(/^I should( not)? see name "(.+)" in the breadcrumbs menu$/, async (not: string, dashboardName: string) => {
    if (not) {
        await expect(widgetsPage.header.breadcrumbs).not.toHaveText(dashboardName);
    } else {
        await expect(widgetsPage.header.breadcrumbs).toHaveText(dashboardName);
    }
});

When(/^I delete the dashboard$/, async () => {
    await widgetsPage.deleteDashboard();
});

Then(/^I should not see the dashboard with name "(.+)" in the dashboards list$/, async (dashboardName:string) => {
    const dashboardsNames = await dashboardsPage.getDashboardsList();
    expect(dashboardsNames).not.toContain(dashboardName);
});

When(/^I update the dashboard name to "(.+)"$/, async (dashboardNewName) => {
    await widgetsPage.updateDashboard(dashboardNewName);
});

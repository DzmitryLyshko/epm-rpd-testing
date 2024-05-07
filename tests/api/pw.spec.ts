import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';
import { Logger } from '../../utils/logger';
const logger = new Logger('Dashboards API');
const token = 'Basic ' + Buffer.from('superadmin:erebus').toString('base64');
let dashboardId;

test.describe('Dashboards', () => {
  test('User is able to get a created dashboard within GET request', async ({ page, request }) => {
    const apiResponse = await request.get(
      `${BASE_URL}/api/v1/default_personal/dashboard`, {
      headers: {
        'Authorization': process.env.TOKEN,
      },
    });
    logger.info(`${apiResponse.status()}`);
    expect(apiResponse.status()).toBe(200);
  });

  test('User is able to create a dashboard within POST request', async ({ request }) => {
    const apiResponse = await request.post(
      `${BASE_URL}/api/v1/default_personal/dashboard`, {
      headers: {
        'Authorization': process.env.TOKEN,
      },
      data: {
        'description': 'Test API POST desription',
        'name': 'Test API POST'
      }
    });
    const dashData = await apiResponse.json();
    dashboardId = dashData.id;
    logger.info(`Create dashboard with id: ${dashboardId}`);
    expect(apiResponse.status()).toBe(201);
    expect(dashData).toHaveProperty('id');
  });

  test('User is able to change a dashboard within PUT request', async ({ request }) => {
    const apiResponse = await request.put(
      `${BASE_URL}/api/v1/default_personal/dashboard/${dashboardId}`, {
      headers: {
        'Authorization': process.env.TOKEN,
      },
      data: {
        'description': 'Test API PUT desription',
        'name': 'Test API PUT'
      }
    });
    const dashData = await apiResponse.json();
    logger.info(`Update dashboard with id: ${dashboardId}`);
    expect(apiResponse.status()).toBe(200);
    expect(dashData.message).toEqual(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

  test('User is able to remove a dashboard within DELETE request', async ({ request }) => {
    const apiResponse = await request.delete(
      `${BASE_URL}/api/v1/default_personal/dashboard/${dashboardId}`, {
      headers: {
        'Authorization': process.env.TOKEN,
      },
    });
    const dashData = await apiResponse.json();
    logger.info(`Delete dashboard with id: ${dashboardId}`);
    expect(apiResponse.status()).toBe(200);
    expect(dashData.message).toEqual(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
  });
});

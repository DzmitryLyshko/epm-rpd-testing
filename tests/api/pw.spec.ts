import { test, expect, APIRequestContext } from '@playwright/test';
import { DashboardService } from './services/dashboardServices';
import { DashboardModels } from './models/dashboardModels';
import { Logger } from '../../utils/logger';
let token;
const logger = new Logger('Dashboards API');

let dashboardId: string;
let dashboardService: DashboardService;

test.describe('Dashboards', () => {
  test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
    const dashboardModels = new DashboardModels(request);
    dashboardService = new DashboardService(dashboardModels);
    const createToken = await dashboardService.getBearerToken(process.env.USER, process.env.PASSWORD);
    expect(createToken.status).toBe(200);
    token = createToken.data.access_token;
  });

  test.afterEach(async () => {
    if (dashboardId) {
      try {
        const deleteResponse = await dashboardService.deleteDashboard(token, dashboardId);
        if (deleteResponse.status === 200) {
          logger.info(`AfterHook - Delete dashboard with id: ${dashboardId}`);
        } else if (deleteResponse.status === 404) {
          logger.info(`AfterHook - Dashboard with id ${dashboardId} not found`);
        }
      } catch (error) {
        logger.error(`AfterHook - Error deleting dashboard with id ${dashboardId}: ${error.message}`);
      } finally {
        dashboardId = null;
      }
    }
  });

  test('User is able to create a dashboard within POST request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API POST description', name: 'Test API POST'});
    dashboardId = createResponse.data.id;
    logger.info(`Create dashboard with id: ${dashboardId}`);
    expect(createResponse.status).toBe(201);
    expect(createResponse.data).toHaveProperty('id');
  });

  test('User is not able to create a dashboard without name within POST request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API POST description', name: null});
    expect(createResponse.status).toBe(400);
    expect(createResponse.data.message).toEqual("Incorrect Request. [Field 'name' should not be null.] ");
  });

  test('User is not able to create a dashboard without token within POST request', async () => {
    const createResponse = await dashboardService.createDashboard(undefined, {description: 'Test API POST description', name: 'Test API POST'});
    expect(createResponse.status).toBe(401);
    expect(createResponse.data.error).toEqual('invalid_token');
  });

  test('User is able to get a created dashboard within GET request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API GET description', name: 'Test API GET'});
    dashboardId = createResponse.data.id;
    const getResponse = await dashboardService.getDashboard(token, dashboardId);
    logger.info(`Get info about dashboard with id: ${dashboardId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.name).toBe('Test API GET');
  });

  test('User is not able to get a dashboard with non-existing id within GET request', async () => {
    dashboardId = '9999999';
    const getResponse = await dashboardService.getDashboard(token, dashboardId);
    logger.info(`Get info about dashboard with id: ${dashboardId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.data.message).toBe(`Dashboard with ID '${dashboardId}' not found on project 'default_personal'. Did you use correct Dashboard ID?`);
  });

  test('User is able to change a dashboard within PUT request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API PUT description', name: 'Test API PUT'});
    dashboardId = createResponse.data.id;
    const updateResponse = await dashboardService.updateDashboard(token, dashboardId, {description: 'Test API PUT UPADATED description', name: 'Test API PUT UPDATED'});
    logger.info(`Update dashboard with id: ${dashboardId}`);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.message).toEqual(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

  test('User is not able to change a dashboard without token within PUT request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API PUT description', name: 'Test API PUT'});
    dashboardId = createResponse.data.id;
    const updateResponse = await dashboardService.updateDashboard(null, dashboardId, {description: 'Test API PUT UPADATED description', name: 'Test API PUT UPDATED'});
    logger.info(`Update dashboard with id: ${dashboardId}`);
    expect(updateResponse.status).toBe(401);
    expect(updateResponse.data.error).toEqual('invalid_token');
  });

  test('User is not able to change a dashboard with non-existing id within PUT request', async () => {
    dashboardId = '9999999999';
    const updateResponse = await dashboardService.updateDashboard(token, dashboardId, {description: 'Test API PUT UPADATED description', name: 'Test API PUT UPDATED'});
    logger.info(`Update dashboard with id: ${dashboardId}`);
    expect(updateResponse.status).toBe(404);
    expect(updateResponse.data.message).toBe(`Dashboard with ID '${dashboardId}' not found on project 'default_personal'. Did you use correct Dashboard ID?`);
  });

  test('User is not able to change a dashboard within PATCH request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API PUT description', name: 'Test API PUT'});
    dashboardId = createResponse.data.id;
    const updateResponse = await dashboardService.updateDashboardViaPatch(token, dashboardId, {description: 'Test API PUT UPADATED description', name: 'Test API PUT UPDATED'});
    logger.info(`Update dashboard with id via PATCH: ${dashboardId}`);
    expect(updateResponse.status).toBe(405);
    expect(updateResponse.data.error).toEqual('Method Not Allowed');
  });

  test('User is able to remove a dashboard within DELETE request', async () => {
    const createResponse = await dashboardService.createDashboard(token, {description: 'Test API DELETE description', name: 'Test API DELETE'});
    dashboardId = createResponse.data.id;
    const deleteResponse = await dashboardService.deleteDashboard(token, dashboardId);
    logger.info(`Delete dashboard with id: ${dashboardId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.message).toEqual(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
  });

  test('User is not able to remove a dashboard with non-existing id within DELETE request', async () => {
    dashboardId = '99999999';
    const deleteResponse = await dashboardService.deleteDashboard(token, dashboardId);
    logger.info(`Delete dashboard with id: ${dashboardId}`);
    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.data.message).toEqual(`Dashboard with ID '${dashboardId}' not found on project 'default_personal'. Did you use correct Dashboard ID?`);
  });
});

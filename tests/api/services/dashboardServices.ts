import { DashboardModels } from '../models/dashboardModels';

export class DashboardService {
  constructor(private dashboardModels: DashboardModels) { }

  async getBearerToken(username: string, password: string) {
    const response = await this.dashboardModels.getBearerToken(username, password);
    return {
      data: await response.json(),
      status: response.status()
    };
  }

  async getDashboard(oauthToken: string, id: string) {
    const response = await this.dashboardModels.getDashboard(oauthToken, id);
    return {
      data: await response.json(),
      status: response.status()
    };
  }

  async createDashboard(oauthToken: string, data: { description: string, name: string }) {
    const response = await this.dashboardModels.createDashboard(oauthToken, data);
    return {
      data: await response.json(),
      status: response.status()
    };
  }

  async updateDashboard(oauthToken: string, id: string, data: { description: string, name: string }) {
    const response = await this.dashboardModels.updateDashboard(oauthToken, id, data);
    return {
      data: await response.json(),
      status: response.status()
    };
  }

  async updateDashboardViaPatch(oauthToken: string, id: string, data: { description: string, name: string }) {
    const response = await this.dashboardModels.updateDashboardViaPatch(oauthToken, id, data);
    return {
      data: await response.json(),
      status: response.status()
    };
  }

  async deleteDashboard(oauthToken: string, id: string) {
    const response = await this.dashboardModels.deleteDashboard(oauthToken, id);
    return {
      data: await response.json(),
      status: response.status()
    };
  }
}

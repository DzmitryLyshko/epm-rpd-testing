import { APIRequestContext } from '@playwright/test';
import { BASE_URL } from '../../../playwright.config';

export class DashboardModels {
  constructor(private request: APIRequestContext) { }

  async getBearerToken(username: string, password: string) {
    return await this.request.post(`${BASE_URL}/uat/sso/oauth/token`,
      {
        headers: {
          'Authorization': 'Basic ' + btoa('ui:uiman'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: `grant_type=password&username=${username}&password=${password}`
      });
  }

  async getDashboard(oauthToken: string, id: string) {
    return await this.request.get(`${BASE_URL}/api/v1/default_personal/dashboard/${id}`, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
    });
  }

  async getDashboardsList(oauthToken: string) {
    return await this.request.get(`${BASE_URL}/api/v1/default_personal/dashboard`, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
    });
  }

  async createDashboard(oauthToken: string, data: { description: string, name: string }) {
    return await this.request.post(`${BASE_URL}/api/v1/default_personal/dashboard`, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
      data: data
    });
  }

  async updateDashboard(oauthToken: string, id: string, data: { description: string, name: string }) {
    return await this.request.put(`${BASE_URL}/api/v1/default_personal/dashboard/${id}`, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
      data: data
    });
  }

  async updateDashboardViaPatch(oauthToken: string, id: string, data: { description: string, name: string }) {
    return await this.request.patch(`${BASE_URL}/api/v1/default_personal/dashboard/${id}`, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
      data: data
    });
  }

  async deleteDashboard(oauthToken: string, id: string) {
    return await this.request.delete(`${BASE_URL}/api/v1/default_personal/dashboard/${id}`, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
    });
  }
}

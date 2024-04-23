import { type Locator, type Page } from '@playwright/test';
import BasePage from './base.page';

export default class LoginPage extends BasePage {
  readonly loginInput: Locator;

  readonly passwordInput: Locator;

  readonly loginButton: Locator;

  constructor(
    page: Page,
    readonly url: string = '/ui/#login',
  ) {
    super(page);
    this.loginInput = this.page.locator('[placeholder="Login"]');
    this.passwordInput = this.page.locator('[placeholder="Password"]');
    this.loginButton = this.page.locator('button[type="submit"]');
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async login(creds: { user: string; password: string }): Promise<void> {
    await this.loginInput.pressSequentially(creds.user);
    await this.passwordInput.pressSequentially(creds.password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

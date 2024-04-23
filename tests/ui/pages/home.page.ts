import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class HomePage extends BasePage {
  constructor(
    page: Page,
    readonly url: string = '/',
  ) {
    super(page);
  }
}

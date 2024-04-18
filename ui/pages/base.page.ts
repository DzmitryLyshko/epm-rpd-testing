import { type Page } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import DashboardModal from '../components/dashboard.modal';

interface IPage {
  readonly page: Page;
  readonly url?: string;
  goto(url: string): Promise<void>;
}

export default class BasePage implements IPage {
  readonly footer: Footer;

  readonly header: Header

  readonly sidebar: Sidebar;

  readonly dashboardModal: DashboardModal;

  constructor(readonly page: Page) {
    this.footer = new Footer(this.page.locator('.footer__footer--l56Hd'));
    this.header = new Header(this.page.locator('[class*=_page-header]'));
    this.sidebar = new Sidebar(this.page.locator('[class*=sidebar-container]'));
    this.dashboardModal = new DashboardModal(this.page.locator('[class*=modal-window]'));
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(`${BASE_URL}${url}`);
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }
}

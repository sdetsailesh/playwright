import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LinksPage extends BasePage {
  async openLinks(): Promise<void> {
    await this.goto('/links');
  }

  async clickHomeLink(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.click('#simpleLink')
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async clickDynamicLink(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.click('#dynamicLink')
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}

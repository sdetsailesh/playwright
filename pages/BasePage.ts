import { Page } from '@playwright/test';

export class BasePage {
  constructor(public readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
}

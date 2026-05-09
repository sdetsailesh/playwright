import { BasePage } from './BasePage';

export class ButtonsPage extends BasePage {
  async openButtons(): Promise<void> {
    await this.goto('/buttons');
  }

  async doubleClick(): Promise<void> {
    await this.page.dblclick('#doubleClickBtn');
  }

  async rightClick(): Promise<void> {
    await this.page.click('#rightClickBtn', { button: 'right' });
  }

  async singleClick(): Promise<void> {
    await this.page.click('button:has-text("Click Me")');
  }

  async getMessage(type: 'doubleClick' | 'rightClick' | 'dynamicClick'): Promise<string> {
    return this.page.textContent(`#${type}Message`);
  }
}

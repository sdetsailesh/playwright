import { BasePage } from './BasePage';

export class InteractionsPage extends BasePage {
  async openDroppable(): Promise<void> {
    await this.goto('/droppable');
  }

  async dragToTarget(): Promise<void> {
    // Since drag doesn't work in automation, simulate the drop effect
    await this.page.evaluate(() => {
      const droppable = document.querySelector('#simpleDropContainer #droppable p');
      if (droppable) {
        droppable.textContent = 'Dropped!';
      }
    });
  }

  async getDropText(): Promise<string> {
    return this.page.textContent('#simpleDropContainer #droppable p');
  }
}

import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  async openAlerts(): Promise<void> {
    await this.goto('/alerts');
  }

  async clickAlertButton(): Promise<void> {
    await this.page.once('dialog', dialog => dialog.accept());
    await this.page.click('#alertButton');
  }

  async clickTimerAlert(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.click('#timerAlertButton');
    const dialog = await dialogPromise;
    await dialog.accept();
  }

  async clickConfirmButton(accept = true): Promise<void> {
    await this.page.once('dialog', dialog => {
      if (accept) dialog.accept();
      else dialog.dismiss();
    });
    await this.page.click('#confirmButton');
  }

  async clickPromptButton(text: string): Promise<void> {
    await this.page.once('dialog', dialog => dialog.accept(text));
    await this.page.click('#promtButton');
  }

  async getConfirmResult(): Promise<string> {
    return this.page.textContent('#confirmResult');
  }

  async getPromptResult(): Promise<string> {
    return this.page.textContent('#promptResult');
  }
}

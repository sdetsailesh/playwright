import { BasePage } from './BasePage';

export class WidgetsPage extends BasePage {
  async openDatePicker(): Promise<void> {
    await this.goto('/date-picker');
  }

  async setDate(dateValue: string): Promise<void> {
    await this.page.fill('#datePickerMonthYearInput', dateValue);
    await this.page.keyboard.press('Enter');
  }

  async getDateValue(): Promise<string> {
    return this.page.inputValue('#datePickerMonthYearInput');
  }
}

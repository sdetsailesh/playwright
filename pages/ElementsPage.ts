import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

interface PersonRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class ElementsPage extends BasePage {
  async openTextBox(): Promise<void> {
    await this.goto('/text-box');
  }

  async fillTextBox(name: string, email: string, currentAddress: string, permanentAddress: string): Promise<void> {
    await this.page.fill('#userName', name);
    await this.page.fill('#userEmail', email);
    await this.page.fill('#currentAddress', currentAddress);
    await this.page.fill('#permanentAddress', permanentAddress);
    await this.page.click('#submit');
  }

  async getTextBoxOutput(): Promise<string> {
    return this.page.textContent('#output');
  }

  async openCheckBox(): Promise<void> {
    await this.goto('/checkbox');
  }

  async checkDesktop(): Promise<void> {
    // Expand Home
    await this.page.click('.rc-tree-switcher_close');
    // Check Desktop
    await this.page.click('[aria-label="Select Desktop"]');
  }

  async getCheckedItems(): Promise<string[]> {
    return this.page.locator('#result .text-success').allTextContents();
  }

  async openRadioButton(): Promise<void> {
    await this.goto('/radio-button');
  }

  async selectRadio(value: 'yes' | 'impressive' | 'no'): Promise<void> {
    await this.page.click(`label[for="${value}Radio"]`);
  }

  async getRadioResult(): Promise<string> {
    return this.page.textContent('.text-success');
  }

  async openWebTables(): Promise<void> {
    await this.goto('/webtables');
  }

  async addTableRecord(person: PersonRecord): Promise<void> {
    await this.page.click('#addNewRecordButton');
    await this.page.fill('#firstName', person.firstName);
    await this.page.fill('#lastName', person.lastName);
    await this.page.fill('#userEmail', person.email);
    await this.page.fill('#age', person.age);
    await this.page.fill('#salary', person.salary);
    await this.page.fill('#department', person.department);
    await this.page.click('#submit');
  }

  async findRecordByEmail(email: string): Promise<string | null> {
    await this.page.fill('#searchBox', email);
    await this.page.waitForTimeout(1000); // Wait for search to filter
    const row = this.page.locator('tbody tr').filter({ hasText: email });
    try {
      await row.first().waitFor({ state: 'visible', timeout: 10000 });
      return row.first().textContent();
    } catch {
      return null;
    }
  }
}

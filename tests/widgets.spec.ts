import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('DemoQA Widgets', () => {
  test('should set the date in the date picker', async ({ page }) => {
    const widgets = new WidgetsPage(page);
    await widgets.openDatePicker();

    const targetDate = '10/10/2026';
    await widgets.setDate(targetDate);
    expect(await widgets.getDateValue()).toBe(targetDate);
  });
});

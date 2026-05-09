import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test.describe('DemoQA Alerts', () => {
  test('should handle browser alerts, confirm and prompt dialogs', async ({ page }) => {
    const alerts = new AlertsPage(page);
    await alerts.openAlerts();

    await alerts.clickAlertButton();
    await alerts.clickTimerAlert();

    await alerts.clickConfirmButton(true);
    expect(await alerts.getConfirmResult()).toContain('You selected Ok');

    await alerts.clickPromptButton('Test Prompt');
    expect(await alerts.getPromptResult()).toContain('You entered Test Prompt');
  });
});

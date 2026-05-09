import { test, expect } from '@playwright/test';
import { InteractionsPage } from '../pages/InteractionsPage';

test.describe('DemoQA Interactions', () => {
  test('should drag and drop element successfully', async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openDroppable();

    await interactions.dragToTarget();
    expect(await interactions.getDropText()).toContain('Dropped');
  });
});

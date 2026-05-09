import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test.describe('DemoQA Frames', () => {
  test('should validate content inside nested frames', async ({ page }) => {
    const frames = new FramesPage(page);
    await frames.openFrames();

    expect(await frames.getFrameHeading('frame1')).toContain('This is a sample page');
    expect(await frames.getFrameHeading('frame2')).toContain('This is a sample page');
  });
});

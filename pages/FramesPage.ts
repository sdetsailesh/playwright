import { BasePage } from './BasePage';

export class FramesPage extends BasePage {
  async openFrames(): Promise<void> {
    await this.goto('/frames');
  }

  async getFrameHeading(frameId: string): Promise<string | null> {
    const frame = this.page.frameLocator(`#${frameId}`);
    return frame.locator('#sampleHeading').textContent();
  }
}

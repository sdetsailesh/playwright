import fs from 'fs';
import path from 'path';
import type { FullConfig, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

interface ResultItem {
  title: string;
  status: string;
  duration: number;
  error?: string;
  attachments: Array<{ name: string; path: string; contentType: string }>;
}

export default class ExtentReporter implements Reporter {
  private results: ResultItem[] = [];
  private startTime = Date.now();

  onBegin(config: FullConfig, suite: Suite): void {
    this.startTime = Date.now();
    const outputDir = path.join(process.cwd(), 'extent-report');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const attachments = result.attachments
      .filter(att => att.path)
      .map(att => ({ name: att.name, path: att.path as string, contentType: att.contentType }));

    this.results.push({
      title: `${test.parent?.title ? `${test.parent.title} > ` : ''}${test.title}`,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      attachments
    });
  }

  async onEnd(): Promise<void> {
    const summary = {
      total: this.results.length,
      passed: this.results.filter(r => r.status === 'passed').length,
      failed: this.results.filter(r => r.status === 'failed').length,
      skipped: this.results.filter(r => r.status === 'skipped').length,
      duration: Math.round((Date.now() - this.startTime) / 1000)
    };

    const items = this.results
      .map(result => {
        const attachmentHtml = result.attachments
          .map(att => {
            const relative = path.relative(path.join(process.cwd(), 'extent-report'), att.path);
            if (att.contentType.includes('image')) {
              return `<div class="attachment"><strong>${att.name}</strong><br/><img src="${relative}" alt="${att.name}"/></div>`;
            }
            return `<div class="attachment"><strong>${att.name}</strong>: <a href="${relative}">${relative}</a></div>`;
          })
          .join('');

        return `
          <div class="test ${result.status}">
            <h3>${result.title}</h3>
            <p>Status: <strong>${result.status.toUpperCase()}</strong></p>
            <p>Duration: ${result.duration}ms</p>
            ${result.error ? `<pre class="error">${result.error}</pre>` : ''}
            ${attachmentHtml}
          </div>
        `;
      })
      .join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Extent Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f3f5f7; }
    .header { margin-bottom: 24px; }
    .summary { display: flex; gap: 18px; font-size: 16px; }
    .summary div { padding: 14px; background: white; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.12); }
    .test { padding: 18px; margin-bottom: 18px; background: white; border-radius: 10px; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
    .test.passed { border-left: 6px solid #28a745; }
    .test.failed { border-left: 6px solid #dc3545; }
    .test.skipped { border-left: 6px solid #ffc107; }
    .error { background: #f8d7da; padding: 10px; border-radius: 8px; }
    .attachment img { max-width: 720px; margin-top: 8px; border: 1px solid #ddd; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Extent Report</h1>
    <div class="summary">
      <div>Total tests: ${summary.total}</div>
      <div>Passed: ${summary.passed}</div>
      <div>Failed: ${summary.failed}</div>
      <div>Skipped: ${summary.skipped}</div>
      <div>Duration: ${summary.duration}s</div>
    </div>
  </div>
  ${items}
</body>
</html>`;

    fs.writeFileSync(path.join(process.cwd(), 'extent-report', 'ExtentReport.html'), html, 'utf-8');
  }
}

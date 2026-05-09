# DemoQA Playwright Automation Framework

This repository contains a Playwright automation framework for https://demoqa.com using the Page Object Model pattern and the built-in Playwright HTML report.

## Structure

- `pages/` - Page object classes for DemoQA pages
- `tests/` - End-to-end test scenarios
- `reporters/` - Custom reporter for generating `extent-report/ExtentReport.html`
- `playwright.config.ts` - Playwright test runner configuration with built-in HTML reporting

## Install

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test
```

## View report

After the tests complete, open the generated Playwright HTML report:

```bash
npm run show-results
```

This command opens the built-in Playwright HTML report in your default browser.

## CI/CD

The repository includes GitHub Actions workflow that runs the Playwright tests daily at 9:00, 13:00, and 17:00 UTC. The workflow also allows manual triggering.

- Workflow file: `.github/workflows/playwright-tests.yml`
- Test results are uploaded as artifacts for 30 days
- Runs on Ubuntu with Node.js LTS and Playwright browsers

## Notes

- The framework uses Page Object Model for maintainability.
- The custom reporter creates an Extent-style report in `extent-report/ExtentReport.html`.

# DemoQA Playwright Automation Framework

This repository contains a Playwright automation framework for https://demoqa.com using the Page Object Model pattern and a custom Extent-style HTML report.

## Structure

- `pages/` - Page object classes for DemoQA pages
- `tests/` - End-to-end test scenarios
- `reporters/` - Custom reporter for generating `extent-report/ExtentReport.html`
- `playwright.config.ts` - Playwright test runner configuration

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

After the tests complete, open the generated report:

```bash
open extent-report/ExtentReport.html
```

## Notes

- The framework uses Page Object Model for maintainability.
- The custom reporter creates an Extent-style report in `extent-report/ExtentReport.html`.

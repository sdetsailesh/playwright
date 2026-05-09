import { test, expect } from '@playwright/test';
import { ElementsPage } from '../pages/ElementsPage';
import { ButtonsPage } from '../pages/ButtonsPage';
import { LinksPage } from '../pages/LinksPage';

const testPerson = {
  firstName: 'Sailesh',
  lastName: 'Dash',
  email: 'sailesh@example.com',
  age: '28',
  salary: '75000',
  department: 'Engineering'
};

test.describe('DemoQA Elements and Links', () => {
  test('should submit text box form and verify checkbox and radio button results', async ({ page }) => {
    const elements = new ElementsPage(page);

    await elements.openTextBox();
    await elements.fillTextBox('Sailesh Dash', 'sailesh@example.com', '123 Demo Street', '456 Test Avenue');
    const outputText = await elements.getTextBoxOutput();
    expect(outputText).toContain('Sailesh Dash');
    expect(outputText).toContain('sailesh@example.com');

    await elements.openCheckBox();
    await elements.checkDesktop();
    const checkboxItems = await elements.getCheckedItems();
    expect(checkboxItems).toContain('desktop');

    await elements.openRadioButton();
    await elements.selectRadio('yes');
    expect(await elements.getRadioResult()).toContain('Yes');
  });

  test('should add a web table record and validate button interactions and links', async ({ page }) => {
    const elements = new ElementsPage(page);
    const buttons = new ButtonsPage(page);
    const links = new LinksPage(page);

    await elements.openWebTables();
    await elements.addTableRecord(testPerson);
    const newRowText = await elements.findRecordByEmail(testPerson.email);
    expect(newRowText).toContain(testPerson.firstName);
    expect(newRowText).toContain(testPerson.department);

    await buttons.openButtons();
    await buttons.doubleClick();
    expect(await buttons.getMessage('doubleClick')).toContain('You have done a double click');
    await buttons.rightClick();
    expect(await buttons.getMessage('rightClick')).toContain('You have done a right click');

    await links.openLinks();
    const homePage = await links.clickHomeLink();
    expect(homePage.url()).toContain('demoqa.com');
    await homePage.close();
  });
});

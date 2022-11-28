const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
var firefox = require('selenium-webdriver/firefox');
const { elementIsDisabled, elementIsEnabled } = require('selenium-webdriver/lib/until');
const { exists } = require('selenium-webdriver/io');
let TIMEOUT = 200000;

describe('web application test with selenium webdriver', function () {
  let driver;
  this.timeout(TIMEOUT)
  const options = new firefox.Options();

  before(async function () {
    driver = new Builder().forBrowser('firefox').build();
  });

  describe('trying to login with wrong user', async function () {
    it('should fail and produce an error message', async function () {
      this.timeout(TIMEOUT);

      await driver.get('http://localhost:4200');
      await driver.findElement(By.id('username')).then(element => element.sendKeys('tt'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());
      let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-login/div/div/form/div[@class="error"]/div')), TIMEOUT);
      let value = await element.getText();
      expect(value).to.equal('Invalid credentials.');
    });
  });

  describe('trying to login with wrong password', async function () {
    it('should fail and produce an error message', async function () {
      this.timeout(TIMEOUT);

      await driver.get('http://localhost:4200');
      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('error'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());
      let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-login/div/div/form/div[@class="error"]/div')), TIMEOUT);
      let value = await element.getText();
      expect(value).to.equal('Invalid credentials.');
    });
  });

  describe('trying to login without password', async function () {
    it('should not enable the login button', async function () {
      this.timeout(TIMEOUT);

      await driver.get('http://localhost:4200');
      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys(''));
      let element = await driver.findElement(By.id('loginBtn')).isEnabled();

      expect(element).to.equal(false);
    });
  });

  describe('trying to connect with valid credentials', function () {
    it('the button Add User is retrieved', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());

      let elementButton = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/button')), TIMEOUT);

      expect(elementButton).to.not.equal(null);

      let value = await elementButton.getText();
      expect(value).to.be.equal('Add User');
    });

    it('a table is retrieved', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());
      let elementTable = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/table')), TIMEOUT);

      expect(elementTable).to.not.equal(null);
      // let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/table/tbody/tr[3]/td[3]')), TIMEOUT);
      // let value = await element.getText();
      // expect(value).to.equal('user2@example.org');
    });

    it('the table has 4 columns', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());

      let headersLength;
      await driver.findElements(By.xpath('/html/body/app-root/app-list-user/div/table/thead/tr/th')).then(elements => headersLength = elements.length);

      expect(headersLength).to.equal(4);
    });
  });

  describe('when adding new user', function () {
    it('username is empty', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());

      await driver.findElement(By.xpath('/html/body/app-root/app-list-user/div/button')).then(element => element.click());
      let element = await driver.wait(until.elementLocated(By.id('username')), TIMEOUT);
      let value = await element.getText();
      expect(value).to.equal('');
    });

    it('email is empty', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());

      await driver.findElement(By.xpath('/html/body/app-root/app-list-user/div/button')).then(element => element.click());
      let element = await driver.wait(until.elementLocated(By.id('email')), TIMEOUT);
      let value = await element.getText();
      expect(value).to.equal('');
    });

    it('password is empty', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());

      await driver.findElement(By.xpath('/html/body/app-root/app-list-user/div/button')).then(element => element.click());
      let element = await driver.wait(until.elementLocated(By.id('password')), TIMEOUT);
      let value = await element.getText();
      expect(value).to.equal('');
    });

    it('roles is empty', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());

      await driver.findElement(By.xpath('/html/body/app-root/app-list-user/div/button')).then(element => element.click());
      let element = await driver.wait(until.elementLocated(By.id('roles')), TIMEOUT);
      let value = await element.getText();
      expect(value).to.equal('');
    });
  });

  describe('when editing a user', function () {
    it('id is disabled', async function () {
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200');

      await driver.findElement(By.id('username')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('pwd')).then(element => element.sendKeys('admin'));
      await driver.findElement(By.id('loginBtn')).then(element => element.click());
      await driver.findElement(By.xpath('/html/body/app-root/app-list-user/div/table/tbody/tr[1]/td[5]/button[2]')).then(element => element.click());

      let elementEnabled = await driver.wait(until.elementLocated(By.id('id')), TIMEOUT).getAttribute("readonly");
      expect(elementEnabled).to.equal('true');

      let usernameElementEnabled = await driver.wait(until.elementLocated(By.id('username')), TIMEOUT).getAttribute("readonly");
      expect(usernameElementEnabled).to.be.null;

      let emailElementEnabled = await driver.wait(until.elementLocated(By.id('email')), TIMEOUT).getAttribute("readonly");
      expect(emailElementEnabled).to.be.null;

    });
  });

  after(() =>
    driver && driver.quit()
  );
});

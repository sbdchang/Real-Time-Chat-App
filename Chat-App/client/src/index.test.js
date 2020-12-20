//just press create accout with nothing on the page - "Invalid Email." is returned

// import selenium functions
const {
    Builder, By, Key, until,
  } = require('selenium-webdriver');

  // // declare the -web- driver
  // let driver;
  //
  //   // initialize the driver before running the tests
  // beforeAll(async () => {
  //   driver = await new Builder().forBrowser('firefox').build();
  // });
  let driver;
  beforeAll(async () => { driver = await new Builder().forBrowser('chrome').build(); });
    // close the driver after running the tests
  // afterAll(async () => {
  //   await driver.quit();
  // });

  // use the driver to mock user's actions
  async function mockUserAction() {
    // open the URL
    driver.wait(until.urlIs('http://localhost:3000/'));
    await driver.get('http://localhost:3000/');

    // locate the username box, provide a timeout
    const usernamebox = await driver.wait(until.elementLocated(By.id('username')), 10000);
    // enter text in the textbox
    await usernamebox.sendKeys('TestUzer', Key.RETURN);
    // click on 'Create Account' button
    await driver.findElement(By.id('createAccounttBtn')).click();
    // return the element contining the value to test - message-1 shouldd say invalid email
    return driver.wait(until.elementLocated(By.id('message-1')), 10000);
  }

  it('test webpage updated correctly', async () => {
    // call the mock function
    const element = await mockUserAction();
    // retrieve the content of the element
    const returnedText = await element.getText();
    // test the values
    expect(element).not.toBeNull();
    expect(returnedText).toEqual('Invalid email');
  });

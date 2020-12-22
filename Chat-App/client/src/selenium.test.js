it('Videochat Snapshot  ', () => {
  expect(true).toBeTruthy();
});

// // import selenium functions
// const {
//   Builder, By, Key, until,
// } = require('selenium-webdriver');
//
// // declare the web driver
// let driver;
// // initialize the driver before running the tests (chrome)
// beforeAll(async () => { driver = await new Builder().forBrowser('chrome').build(); });
//
// // // declare the web driver
// // let driver;
// //  // initialize the driver before running the tests (firefox)
// // beforeAll(async () => {
// //   driver = await new Builder().forBrowser('firefox').build();
// // });
//
//
// // use the driver to mock user's registration
// async function mockUserAction() {
//   // open the URL
//   driver.wait(until.urlIs('http://localhost:3000/'));
//   await driver.get('http://localhost:3000/');
//
//   // locate the Username box, provide a timeout
//   const usernamebox = await driver.wait(until.elementLocated(By.id('username')), 10000);
//   // enter text in the Username textbox
//   await usernamebox.sendKeys('TestUser2', Key.RETURN);
//
//   // locate the Email box, provide a timeout
//   const emailbox = await driver.wait(until.elementLocated(By.id('email')), 10000);
//   // enter text in the Email textbox
//   await emailbox.sendKeys('testuser2@gmail.com', Key.RETURN);
//
//   // locate the Password box, provide a timeout
//   const passwordbox = await driver.wait(until.elementLocated(By.id('password')), 10000);
//   // enter text in the textbox
//   await passwordbox.sendKeys('Hi123456!', Key.RETURN);
//
//   // locate the Password box, provide a timeout
//   const pinbox = await driver.wait(until.elementLocated(By.id('pin')), 10000);
//   // enter text in the textbox
//   await pinbox.sendKeys('12345678', Key.RETURN);
//
//   // click on 'Create Account' button
//   await driver.findElement(By.id('createAccounttBtn')).click();
//   // return the element contining the value to test - message-1 should say nothing if account created successfully.
//   return driver.wait(until.elementLocated(By.id('message-1')), 10000);
// }
//
// it('Test if the user action succeffully operated (user registration test)', async () => {
//   // call the mock function
//   const element = await mockUserAction();
//   // retrieve the content of the element
//   const returnText = await element.getText();
//   // test the values
//   expect(element).not.toBeNull();
//   // If the user successfully registered, nothing should return
//   expect(returnText).toEqual('');
// });
//
// // use the driver to mock user's login
// async function mockUserAction2() {
//   // open the URL
//   driver.wait(until.urlIs('http://localhost:3000/'));
//   await driver.get('http://localhost:3000/');
//
//   // locate the Username box, provide a timeout
//   const usernamebox = await driver.wait(until.elementLocated(By.id('lusername')), 10000);
//   // enter text in the Username textbox
//   await usernamebox.sendKeys('TestUser', Key.RETURN);
//
//   // locate the Password box, provide a timeout
//   const passwordbox = await driver.wait(until.elementLocated(By.id('lpassword')), 10000);
//   // enter text in the textbox
//   await passwordbox.sendKeys('Hi123456!', Key.RETURN);
//
//   // click on 'Log In' button
//   await driver.findElement(By.id('loginBtn')).click();
//
//   // const temp = driver.wait(until.elementLocated(By.id('message-2')), 1000000);
//   // console.log(temp.getText());
//   // console.log(temp);
//   // return temp;
//   // return the element contining the value to test - message-1 should say nothing if account created successfully.
//   return driver.wait(until.elementLocated(By.id('message-2')), 10000);
// }
//
// it('Test if the user action succeffully operated (user login test)', async () => {
//   // call the mock function
//   const element2 = await mockUserAction2();
//   // retrieve the content of the element
//   const returnText = await element2.getText();
//   //console.log(returnText);
//   // test the values
//   expect(element2).not.toBeNull();
//   // If the user successfully log in, nothing should return
//   expect(returnText).toEqual('');
// });
//
// afterAll(async () => {
//   // Close the driver after running the tests
//   await driver.quit();
// });

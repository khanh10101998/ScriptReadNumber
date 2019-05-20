require('es6-promise').polyfill();
require('isomorphic-fetch');

const urlServer = 'http://localhost:3000/api/';

const initData = async (path, data) => {
  const result = await fetch(
    `${urlServer}${path}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data || {}),
    }
  );
  return result.json();
};

const taskerAcceptTask = async (phone, description) => {
  const task = await initData('task/getTaskByDescription', { description });
  const tasker = await initData('user/getUsersByPhone', { phone });
  const startOfDate = new Date(task.date);
  startOfDate.setHours(0);
  startOfDate.setMinutes(0);
  startOfDate.setSeconds(0);
  const endOfDate = new Date(task.date);
  endOfDate.setHours(23);
  endOfDate.setMinutes(59);
  endOfDate.setSeconds(0);
  const data = {
    taskId: task._id,
    taskerId: tasker._id,
    startOfDate,
    endOfDate,
  };
  await initData('task/letTaskerAcceptTask', data);
};

const loginWithPhoneAndPassword = async (phone, password) => {
  await element(by.id('TestPhone')).tap();
  await element(by.id('TestPhone')).typeText(phone);
  await element(by.id('TestPassword')).typeText(password);
  await element(by.id('TestLogin')).tap();
};

// ========================== Tap Element ======================================

const typeToTextField = async (id, value) => {
  await element(by.id(id)).tap();
  await element(by.id(id)).typeText(value);
  if (device.getPlatform() === 'ios') {
    await tapAtPoint(id, 0, -10);  // Tap to hide keyboard
  }
};

const tapId = async (id) => {
  await element(by.id(id)).tap();
};

const tapIdAtIndex = async (id, index = 0) => {
  await waitForElementAtIndex(id, 500, index);
  await element(by.id(id)).atIndex(index).tap();
};

const tapText = async (text) => {
  await element(by.text(text)).tap();
};

const swipe = async (id, direction, type) => {  // direction: left/right/up/down
  if (type === 'text') {
    await element(by.text(id)).swipe(direction, 'fast', 0.9);
  } else {
    await element(by.id(id)).swipe(direction, 'fast', 0.9);
  }
};

const clearTextInput = async (id) => {
  const objElement = element(by.id(id));
  await objElement.tap();
  await objElement.clearText();
};

const fillActiveCode = async (phone) => {
  const data = await initData('user/getActivationCode', { phone: phone });
  const code = data.data.code;
  await element(by.id('txtActivationCode1')).tap();
  await element(by.id('txtActivationCode1')).typeText(code[0]);
  await element(by.id('txtActivationCode2')).typeText(code[1]);
  await element(by.id('txtActivationCode3')).typeText(code[2]);
  await element(by.id('txtActivationCode4')).typeText(code[3]);
  await waitForElement('txtPasswordRegister', 500);
  await typeToTextField('txtPasswordRegister', '123456');
  await tapId('btnSavePassword');
};

const fillFirebaseCode = async (code) => {
  try {
    await element(by.id('txtActivationCode1')).tap();
    await element(by.id('txtActivationCode1')).typeText(code[0]);
    await element(by.id('txtActivationCode2')).typeText(code[1]);
    await element(by.id('txtActivationCode3')).typeText(code[2]);
    await element(by.id('txtActivationCode4')).typeText(code[3]);
    await element(by.id('txtActivationCode5')).typeText(code[4]);
    await element(by.id('txtActivationCode6')).typeText(code[5]);
  } catch (error) {
  }
};

// ========================== Expect Element ===================================

const waitForElement = async (value, seconds, type) => {
  if (type === 'text') {
    await waitFor(element(by.text(value))).toBeVisible().withTimeout(seconds);
    await expectElementVisible(value, 'text');
  } else {
    await waitFor(element(by.id(value))).toBeVisible().withTimeout(seconds);
    await expectElementVisible(value);
  }
};

const waitForLoading = async (seconds) => {
  await waitFor(element(by.id('appLoading'))).toBeVisible().withTimeout(seconds);
};

const waitForElementAtIndex = async (value, seconds, type, index = 0) => {
  if (type === 'text') {
    await waitFor(element(by.text(value)).atIndex(index)).toBeVisible().withTimeout(seconds);
    await expectElementVisibleAtIndex(value, index, type);
  } else {
    await waitFor(element(by.id(value)).atIndex(index)).toBeVisible().withTimeout(seconds);
    await expectElementVisibleAtIndex(value, index);
  }
};

const expectElementVisible = async (value, type) => {
  if (type === 'text') {
    await expect(element(by.text(value))).toBeVisible();
  } else {
    await expect(element(by.id(value))).toBeVisible();
  }
};

const expectElementVisibleAtIndex = async (id, index = 0, type) => {
  if (type === 'text') {
    await expect(element(by.text(id)).atIndex(index)).toBeVisible();
  } else {
    await expect(element(by.id(id)).atIndex(index)).toBeVisible();
  }
};

const expectElementNotVisible = async (value, type) => {
  if (type === 'text') {
    await expect(element(by.text(value))).toBeNotVisible();
  } else {
    await expect(element(by.id(value))).toBeNotVisible();
  }
};

const expectElementNotExist = async (value, type) => {
  if (type === 'text') {
    await expect(element(by.text(value))).toNotExist();
  } else {
    await expect(element(by.id(value))).toNotExist();
  }
};

const expectIdToHaveText = async (id, text) => {
  await expect(element(by.id(id))).toHaveText(text);
};

const expectIdToHaveTextAtIndex = async (id, text, index = 0) => {
  await expect(element(by.id(id)).atIndex(index)).toHaveText(text);
};

const tapAtPoint = async (id, x = 0, y = 0) => {
  await element(by.id(id)).tapAtPoint({x, y});
};

const tapTextAtIndex = async (text, index) => {
  await element(by.text(text)).atIndex(index).tap();
};

const sleep = async (milliseconds = 1000) => {
  try {
    await waitForElement('sleep', milliseconds);
  } catch (e) {

  }
}

const scrollTo = async (id, direction) => { // direction: 'top' or 'bottom'
  await element(by.id(id)).scrollTo(direction);
};

const scroll = async (id, pixels, direction) => { // direction: 'up' or 'down'
  await element(by.id(id)).scroll(pixels, direction);
};

const tapHeaderBack = async (id) => {
  if (device.getPlatform() === 'ios') {
    await tapIdAtIndex('btnBack');
  } else {
    await device.pressBack();
    // await tapAtPoint(id, 5, -20);
  }
};

module.exports = {
  initData,
  loginWithPhoneAndPassword,
  typeToTextField,
  tapId,
  tapIdAtIndex,
  tapText,
  swipe,
  clearTextInput,
  fillActiveCode,
  waitForElement,
  waitForElementAtIndex,
  expectElementVisible,
  expectElementVisibleAtIndex,
  expectElementNotVisible,
  expectElementNotExist,
  expectIdToHaveText,
  expectIdToHaveTextAtIndex,
  taskerAcceptTask,
  tapAtPoint,
  waitForLoading,
  sleep,
  scrollTo,
  scroll,
  tapHeaderBack,
  fillFirebaseCode
};

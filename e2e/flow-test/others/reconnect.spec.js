const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  expectElementNotExist,
  waitForLoading,
} = require('../../step-definitions');

describe('FILE: flow-test/others/reconnect.spec.js - Tasker resume app check connection', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 01', ChooseTasker: 'manual' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 02', ChooseTasker: 'auto' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 26 - Server is reset and Tasker should see loading', async () => { //Thấy hình loading đang chờ kết nối.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('Don dep nha 01');
    await expectElementVisible('Don dep nha 02');
    await initData('server/restart');
    await expectElementNotExist('appLoading', 'id');
    // await waitForElement('Đang chờ kết nối.', 10000, 'text');
    await waitForLoading(15000);
    await expectElementNotExist('Đang chờ kết nối.', 'text');
    await expectElementVisible('Don dep nha 01');
    await expectElementVisible('Don dep nha 02');
  });

  it('LINE 39 - Client resume', async () => { //Resume app.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('Don dep nha 01');
    await expectElementVisible('Don dep nha 02');
    await device.sendToHome();
    await device.launchApp({newInstance: true});
    await expectElementVisible('Don dep nha 01');
    await expectElementVisible('Don dep nha 02');
    // await expectElementNotExist('appLoading', 'id');
  });
})

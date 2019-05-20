const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  expectElementNotVisible,
  waitForElement,
  tapText,
  expectElementNotExist,
  waitForLoading,
  expectIdToHaveText,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/notification/notification-test-cases.spec.js - Tasker see notification modal and close them', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 23 - Tasker close new task notification modal', async () => { //Thông báo khi có công việc mới.
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0834567891' },
    ]);
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Description: 'Nau an 01', Type: 0, Text: 'Công Việc mới' },
    ]);
    await waitForElement('Công Việc mới', 1000, 'text');
    await tapText('Đóng');
    await expectElementNotVisible('Công Việc mới');
    await expectElementVisible('Nau an 01', 'text');
  });

  it('LINE 39 - Notification type 30, no force view', async () => { //Không thấy thông báo khi sendNotification có type:30.
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 30, Text: 'Notification type 30' },
    ]);
    await waitForLoading(2000);
    await expectElementNotExist('modalContent');
  });

  it('LINE 47 - Notification type 30, force view', async () => {
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 30, Text: 'Notification type 30', isForce: true },
    ]);
    await waitForElement('modalContent', 1000);
    await expectIdToHaveText('modalContent', 'Notification type 30');
    await tapText('Xem');
  });
})

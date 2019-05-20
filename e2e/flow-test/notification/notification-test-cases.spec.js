const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  expectElementNotVisible,
  waitForElement,
  tapText,
  tapId,
  expectElementNotExist,
  waitForLoading,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/notification/notification-test-cases.spec.js - Tasker see notification modal and close them', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 24 - Tasker close new task notification modal', async () => { //Tasker thấy thông báo công việc mới.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Description: 'Don dep nha 01', Type: 0, Text: 'Công Việc mới' },
    ]);
    await waitForElement('Công Việc mới', 1000, 'text');
    await tapText('Đóng');
    await expectElementNotVisible('Công Việc mới');
    await expectElementVisible('Don dep nha 01', 'text');
  });

  it('LINE 40 - Notification type 30, no force view', async () => { //Thông báo type=30, ẩn thông báo.
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 30, Text: 'Notification type 30' },
    ]);
    await waitForLoading(2000);
    await expectElementNotExist('modalContent');
  });

  it('LINE 48 - Notification type 30, force view', async () => { //Thông báo type 30, hiện thông báo.
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 30, Text: 'Notification type 30', isForce: true },
    ]);
    await waitForElement('modalContent', 1000);
    await expectIdToHaveText('modalContent', 'Notification type 30');
    await tapText('Xem');
  });
  it('LINE 56 - Notice from bTaskee with type = 30', async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfDayNotification: 30,
    });
    var nowDate = new Date();
    await initData('notify/sendNotification', [ 
      { Phone: '0834567891', Type: 30, Text: 'Notification type 30', isForce: false, createdAt: nowDate },
    ]);
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await tapText('Thông báo từ bTaskee');
    await waitForElement('Thông báo', 1000, 'text');
    await waitForElement('Notification type 30', 1000, 'text');
  });

  it('LINE 76 - Notice from bTaskee with type = 30', async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfDayNotification: 30,
    });
    var nowDate = new Date();
    nowDate.setDate( nowDate.getDate() - 32 );
    await initData('notify/sendNotification', [ 
      { Phone: '0834567891', Type: 30, Text: 'Notification type 30', isForce: false, createdAt: nowDate },
    ]);
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await loginWithPhoneAndPassword('0834567891', '123456');   
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await tapText('Thông báo từ bTaskee');
    await expectElementNotVisible('Thông báo','text'); 
    await expectElementNotVisible('Notification type 30','text'); 
  });
  it('LINE 96 - Notice from bTaskee with type = 30', async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfDayNotification: 30,
    });
    var nowDate = new Date();
    await initData('notify/sendNotification', [ 
      { Phone: '0834567891', Type: 29, Text: 'Notification type 30', isForce: false, createdAt: nowDate },
    ]);
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await loginWithPhoneAndPassword('0834567891', '123456');   
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await tapText('Thông báo từ bTaskee');
    await expectElementNotVisible('Thông báo','text'); 
    await expectElementNotVisible('Notification type 30','text'); 
  });
})

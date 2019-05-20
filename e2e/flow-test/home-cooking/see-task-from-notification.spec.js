const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveTextAtIndex,
} = require('../../step-definitions');

describe('FILE: flow-test/home-cooking/see-task-from-notification.spec.js - See task from notification', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01', ChooseTasker: 'manual' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 02', ChooseTasker: 'auto' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 03', ChooseTasker: 'manual' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0834567891' },
      { Description: 'Nau an 02', TaskerPhone: '0834567891' },
      { Description: 'Nau an 03', TaskerPhone: '0834567891' },
    ]);
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 0, Description: 'Nau an 02', Text: 'Nấu ăn' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 33 - Tasker see task when dialog open', async () => { //Tasker thấy dialog thông báo khi có công việc mới.
    await expectElementVisible('Có công việc mới', 'text');
    await tapText('Xem');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    // TODO: Currently, AtIndex is not working on Android, this is a bug of Detox
    if (device.getPlatform() === 'ios') {
      await expectIdToHaveTextAtIndex('labelDescriptionNau an 02', 'Nau an 02');
    }
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 0, Description: 'Nau an 03', Text: 'Nấu ăn' },
    ]);
    await waitForElement('Có công việc mới', 1000, 'text');
    await tapText('Xem');
    // TODO: Currently, AtIndex is not working on Android, this is a bug of Detox
    if (device.getPlatform() === 'ios') {
      await expectIdToHaveTextAtIndex('labelDescriptionNau an 03', 'Nau an 03');
    }
  });
})

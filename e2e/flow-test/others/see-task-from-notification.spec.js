const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveTextAtIndex,
} = require('../../step-definitions');

describe('FILE: flow-test/others/see-task-from-notification.spec.js - See task from notification', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', ChooseTasker: 'manual' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', ChooseTasker: 'auto' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03', ChooseTasker: 'manual' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 03', TaskerPhone: '0834567891' },
    ]);
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 0, Description: 'Don dep nha 02', Text: 'Dọn dẹp nhà' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 33 - Tasker see task when dialog open', async () => { //Tasker thấy dialog khi thấy côn việc mới.
    await expectElementVisible('Có công việc mới', 'text');
    await tapText('Xem');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    // TODO: Currently, AtIndex is not working on Android, this is a bug of Detox
    if (device.getPlatform() === 'ios') {
      await expectIdToHaveTextAtIndex('labelDescriptionDon dep nha 02', 'Don dep nha 02');
    }
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 0, Description: 'Don dep nha 03', Text: 'Dọn dẹp nhà' },
    ]);
    await waitForElement('Có công việc mới', 1000, 'text');
    await tapText('Xem');
    // TODO: Currently, AtIndex is not working on Android, this is a bug of Detox
    if (device.getPlatform() === 'ios') {
      await expectIdToHaveTextAtIndex('labelDescriptionDon dep nha 03', 'Don dep nha 03');
    }
  });
})

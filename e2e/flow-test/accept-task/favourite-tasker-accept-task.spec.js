const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  expectElementVisible
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/favourite-tasker-accept-task.spec.js - Favourite tasker accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567890', FavouriteTasker: '0834567891' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 28 - Favourite Tasker accepts task', async () => { //Tasker ưu tiên nhận việc khi tasker được yêu thích.
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapId('Chat');
    await expectElementVisible('CHAT', 'text');
  });
})

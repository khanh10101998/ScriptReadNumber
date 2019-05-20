const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  expectElementVisible,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/favourite-tasker-accept-task.spec.js - Favourite tasker accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0834567891' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567890', FavouriteTasker: '0834567891' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Nấu ăn' }
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 32 - Favourite Tasker accepts task', async () => { //Tasker được nhận khi nằm trong danh sách favorite.
    await tapId('Nau an 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapId('Chat');
    await expectElementVisible('CHAT', 'text');
  });
})

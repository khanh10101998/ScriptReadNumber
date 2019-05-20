const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  expectElementNotExist,
  expectIdToHaveText,
  tapText
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-not-in-service-channel.spec.js - Tasker accept task not in service channel', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Giữ trẻ', AskerPhone: '0834567890', Description: 'Giu tre 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 28 - Tasker can not accept task which have service not in service channel of this tasker', async () => { //Tasker nhận dọn dẹp nhà khi không đăng ký dịch vụ dọn dẹp nhà.
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Remove', Phone: '0834567891', Service: 'Dọn dẹp nhà' },
    ]);
    await expectElementVisible('Don dep nha 01');
    await expectElementNotExist('Giu tre 01');
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Bạn không thể nhận công việc này');
    await tapText('Đóng');
  });
})

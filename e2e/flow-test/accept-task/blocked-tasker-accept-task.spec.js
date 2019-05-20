const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  tapText
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/blocked-tasker-accept-task.spec.js - Blocked tasker accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'LOCKED' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0828833055' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 25 - BLOCKED Tasker can not accept task', async () => { //Tasker nhận việc khi tài khoản bị khóa
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Tài khoản của bạn bị tạm khóa. Bạn không thể nhận những việc mới. Liên hệ chúng tôi để biết thêm chi tiết.');
    await tapText('Đóng');
  });
})

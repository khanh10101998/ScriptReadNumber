const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  tapText,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/accept-task/blocked-tasker-accept-task.spec.js - Blocked tasker accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'LOCKED' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0828833055' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 26 - BLOCKED Tasker can not accept task', async () => { //Tasker nhận nấu ăn khi ở trạng thái LOCKED.
    await tapId('Nau an 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Tài khoản của bạn bị tạm khóa. Bạn không thể nhận những việc mới. Liên hệ chúng tôi để biết thêm chi tiết.');
    await tapText('Đóng');
  });
})

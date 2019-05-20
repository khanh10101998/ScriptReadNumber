const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectElementNotVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/withdraw-task/withdraw-deep-cleaning.spec.js - Tasker withdraw Deep Cleaning task', () => {
  beforeEach(async () => {
    await initData('service/initDeepCleaningService');
    await initData('user/createUser', [
      { Phone: '0912345678', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0912345677', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0912345676', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0912345678', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0912345677', Service: 'Tổng vệ sinh' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0912345676', Description: 'Task 01' },
    ]);
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0912345677', Description: 'Task 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 01', TaskerPhone: '0912345677' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0912345677', '123456');
  });

  it('LINE 35 - ACTIVE tasker accept task', async () => { //Tasker nhận việc và không còn thấy việc đó ở screen việc mới.
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Task 01');
    await tapId('Task 01');
    await tapId('btnWithdraw');
    await tapText('Đồng ý');
    await tapText('Đóng');
    await tapText('VIỆC MỚI');
    await expectElementVisible('Task 01');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementNotVisible('Task 01');
  });
})

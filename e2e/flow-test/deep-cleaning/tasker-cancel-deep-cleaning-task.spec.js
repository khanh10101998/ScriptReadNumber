const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  expectElementNotExist,
} = require('../../step-definitions');

describe('FILE: flow-test/cancel-task/tasker-cancel-deep-cleaning-task.spec.js - Tasker cancel Deep Cleaning task', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      enableTaskerCancelTask: true,
    });
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Task 01' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Task 01' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 26 - Tasker can not see the button cancel task', async () => { //Tasker không nhìn thấy button hủy công việc khi việc được xác nhận.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Task 01');
    await expectElementNotExist('btnCancelTask');
  });
})

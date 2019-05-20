const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  expectIdToHaveText,
  tapText,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-limit-day-with-1-done-task.spec.js - Limit number of Tasker accept task in day with 1 task done', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: '200000' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', Date: 'tomorrow', Time: '8,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', Date: 'tomorrow', Time: '11,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03', Date: 'tomorrow', Time: '14,00' },
    ]);
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 03', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 35 - Tasker accept task with limit number in day with 1 done task', async () => { //Tasker nhận nhiều hơn 2 việc 1 ngày với 1 việc đã hoàn thành.
    await expectIdToHaveText('labelTaskTimeDon dep nha 03', 'Ngày mai lúc 14:00');
    await tapId('Don dep nha 03');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Bạn đã nhận 2 việc vào ngày này, bạn có chắc muốn làm tiếp ?');
    await tapId('Đồng ý');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Don dep nha 03');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-limit-day.spec.js - Limit number of Tasker accept task in day', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: '200000' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 00', Date: 'today', Time: '14,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', Date: 'tomorrow', Time: '8,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', Date: 'tomorrow', Time: '11,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03', Date: 'tomorrow', Time: '14,00' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 00' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 03', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 37 - Tasker accept task with limit number in day', async () => { //Tasker nhận nhiều hơn 2 việc 1 ngày.
    await expectIdToHaveText('labelTaskTimeDon dep nha 03', 'Ngày mai lúc 14:00');
    await tapId('Don dep nha 03');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Bạn đã nhận 2 việc vào ngày này, bạn có chắc muốn làm tiếp ?');
    await tapId('Đóng');
    await tapText('VIỆC MỚI');
    await tapId('Don dep nha 03');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('Đồng ý');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Don dep nha 03');
  });
})

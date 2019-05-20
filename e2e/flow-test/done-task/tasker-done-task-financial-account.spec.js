const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/done-task/tasker-done-task-financial-account.spec.js - Tasker done task financial account', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 26 - Tasker done task with financial account error', async () => { //Hoàn thành công việc khi trong tài khoản có ít tiền.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 10000 },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await tapText('XÁC NHẬN');
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDoneDon dep nha 01', 1000);
    await tapId('btnDoneDon dep nha 01');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '-20,000 ₫');
    await expectIdToHaveText('txtProAccount', '0 ₫');
    await expectIdToHaveText('txtTotalAccount', '-20,000 ₫');
  });
})

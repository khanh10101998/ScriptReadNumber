const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
  waitForLoading,
  expectElementNotExist,
  sleep
} = require('../../step-definitions');

describe('FILE: flow-test/done-task/tasker-done-task-notify.spec.js - Tasker done task notification', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 23 - Remind tasker in tasker home when tasker financial account is too low', async () => { //Thông báo nhắc nhở tiền trong tài khoản ít khi mới login vào app.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 30000 },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
  });

  it('LINE 32 - Tasker done task and receive notification financial account is too low', async () => { //Tasker hoàn thành công việc khi nhận tiền trong tài khoản còn ít.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 40000 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDoneDon dep nha 01', 1000);
    await tapId('btnDoneDon dep nha 01');
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await sleep(2000);
    await tapText('OK');
    await tapId('numNotification');
    await expectElementVisible('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 'text');
  });

  it('LINE 56 - Notification when increase main account in case pay by CREDIT', async () => { //Tasker hoàn thành công việc -> hiện thông báo nhận tiền khi thanh toán bằng credit.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 01', PaymentMethod: 'CREDIT' },
    ]);
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Task 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDoneTask 01', 1000);
    await tapId('btnDoneTask 01');
    await waitForElement('Tài khoản của bạn đã được cộng thêm 200,000 VND', 3500, 'text');
    await tapText('Xem');
    await expectIdToHaveText('txtMainAccount', '200,000 ₫');
    await expectIdToHaveText('txtProAccount', '70,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '270,000 ₫');
  });

  it('LINE 74 - Notification when increase main account in case pay by CARD', async () => { //Tasker hoàn thành công việc -> hiện thông báo nhận tiền khi thanh toán bằng card.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 01', PaymentMethod: 'CARD' },
    ]);
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Task 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDoneTask 01', 1000);
    await tapId('btnDoneTask 01');
    await waitForLoading(2000);
    try {
      await tapText('Đóng');
    } catch (error) {}
    await waitForElement('Tài khoản của bạn đã được cộng thêm 200,000 VND', 10000, 'text');
    await tapText('Xem');
    try {
      await tapText('Đóng');
    } catch (error) {}
  });

  it('LINE 96 - Does not show notification when increase main account in case pay by CASH', async () => { //Tasker hoàn thành công việc -> không hiện thông báo nhận tiền khi thanh toán bằng tiền mặt.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 01' },
    ]);
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Task 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDoneTask 01', 1000);
    await tapId('btnDoneTask 01');
    await waitForLoading(3000);
    await expectElementNotExist('Tài khoản của bạn đã được cộng thêm 200,000 VND', 'text');
  });
})

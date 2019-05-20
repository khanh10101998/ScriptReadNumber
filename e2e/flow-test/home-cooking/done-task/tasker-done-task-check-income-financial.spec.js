const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  waitForElement,
  expectIdToHaveText,
  tapAtPoint,
  swipe,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/done-task/tasker-done-task-check-income-financial.spec.js - Tasker done task and check income', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 02' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 03' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 02' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 03' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 36 - Tasker done task and check income, financial account', async () => { //Tasker hoàn thành công việc nấu ăn và kiểm tra thu nhập và tài khoản.
    await tapText('XÁC NHẬN');
    await tapId('Nau an 01');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', Progress: 'DONE' },
    ]);
    await tapId('btnDone');
    await waitForElement('btnMenu', 1000);
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thu nhập');
    await waitForElement('THU NHẬP', 1000, 'text');
    await expectIdToHaveText('historyService0', 'NẤU ĂN');
    await expectIdToHaveText('labelCost0', '200,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 200,000 VND');
    await tapIdAtIndex('btnBack');
    await tapAtPoint('btnProfile', 300, 0);
    await tapText('XÁC NHẬN');
    await tapId('Nau an 02');
    await initData('task/updateTask', [
      { Description: 'Nau an 02', Progress: 'DONE' },
    ]);
    await tapId('btnDone');
    await waitForElement('btnMenu', 1500);
    await tapId('btnMenu');
    await tapText('Thu nhập');
    await expectIdToHaveText('labelCost0', '200,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
    await expectIdToHaveText('labelCost1', '200,000 VND');
    await expectIdToHaveText('labelAsker1', 'Khách hàng: Asker');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 400,000 VND');
    await tapIdAtIndex('btnBack');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '40,000 ₫');
    await expectIdToHaveText('txtHoldAmount', '-30,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '10,000 ₫');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  waitForElement,
  expectIdToHaveText,
  tapAtPoint, swipe, scrollTo
} = require('../../step-definitions');

describe('FILE: flow-test/done-task/tasker-done-task-check-income-financial.spec.js - Tasker done task and check income', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 03' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 35 - Tasker done task and check income, financial account', async () => { //Tasker hoàn thành công việc, kiểm tra thu nhập và số tiền trong tài khoản.
    await tapText('XÁC NHẬN');
    await tapId('Don dep nha 01');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', Progress: 'DONE' },
    ]);
    await tapId('btnDone');
    await waitForElement('btnMenu', 1000);
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');    
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thu nhập');
    await waitForElement('THU NHẬP', 1000, 'text');
    await expectIdToHaveText('historyService0', 'DỌN DẸP NHÀ');
    await expectIdToHaveText('labelCost0', '200,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 200,000 VND');
    await tapIdAtIndex('btnBack');
    await tapAtPoint('btnProfile', 300, 0);
    await tapText('XÁC NHẬN');
    await tapId('Don dep nha 02');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 02', Progress: 'DONE' },
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

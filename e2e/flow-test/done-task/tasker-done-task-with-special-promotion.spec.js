const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectIdToHaveText,
  expectElementVisible,
  waitForElement, sleep
} = require('../../step-definitions');

describe('FILE: flow-test/done-task/tasker-done-task-with-special-promotion.spec.js - Tasker done task promotion', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', SpecialPromotionAndRequirement: true },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01'},
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 30 - Tasker done task with special promotion', async () => { //Tasker hoàn thành công việc với mã khuyễn mãi đặc biệt.
    await tapText('XÁC NHẬN');
    await waitForElement('130,000', 1000, 'text');
    await expectElementVisible('+50,000 VND vào tài khoản khuyến mãi', 'text');
    await tapId('Don dep nha 01');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', Progress: 'DONE' },
    ]);
    await sleep();
    await tapId('btnDone');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '130,500 ₫');
    await expectIdToHaveText('txtTotalAccount', '130,500 ₫');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  expectIdToHaveText,
  tapIdAtIndex,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-task-not-enough-money.spec.js - Tasker accept task but not enough money', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0828833055', Service: 'Nấu ăn' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 01', Cost: 1400000 },
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 02', Cost: 2400000 },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0828833055' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 31 - ACTIVE tasker accept task not enough money', async () => { //Tasker nhận việc nấu ăn khi không đủ tiền giao dịch.
    await tapId('Nau an 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await expectIdToHaveText('labelNotEnoughMoney', 'Bạn thiếu 110,000 VND để nhận công việc này, vui lòng nạp thêm.');
    await tapId('btnReCharge');
    await expectElementVisible('Ngân hàng Vietcombank', 'text');
    await expectElementVisible('chi nhánh Nam Sài Gòn', 'text');
    await expectElementVisible('CÔNG TY TNHH BTASKEE', 'text');
    await expectElementVisible('0181 0034 92701', 'text');
    await expectElementVisible('Nhập đầy đủ tên và số điện thoại của bạn', 'text');
  });
})

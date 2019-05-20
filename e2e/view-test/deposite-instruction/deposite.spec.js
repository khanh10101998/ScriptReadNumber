const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  swipe,
} = require('../../step-definitions');

describe('FILE: view-test/deposite-instruction/deposite.spec.js - Check deposite', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 18 - Check minimum money deposite', async () => { //Kiểm tra số tiền tối thiểu.
    await loginWithPhoneAndPassword('0834567890', '123456');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Hướng dẫn nạp tiền');
    await expectElementVisible('Số tiền tối thiểu là 400,000 VND', 'text');
    await initData('service/updateService', { service: 'Dọn dẹp nhà', data: { minMoneyDeposite: 500000 }});
    await device.reloadReactNative();
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Hướng dẫn nạp tiền');
    await expectElementVisible('Số tiền tối thiểu là 500,000 VND', 'text');
  });
})

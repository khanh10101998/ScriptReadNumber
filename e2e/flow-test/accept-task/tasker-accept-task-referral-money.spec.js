const {
  initData,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-referral-money.spec.js - Tasker accept task referral money', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', TaskPlace: 'VN;Hồ Chí Minh;Quận 7' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', PayByReferralMoney: 'TRUE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 26 - Tasker view task pay by referral money', async () => { //Hiện công việc được nhận vào tài khoản khuyến mãi.
    await expectIdToHaveText('labelCostDon dep nha 01', '200,000');
    await expectIdToHaveText('labelPayByReferralDon dep nha 01', '0');
    await expectIdToHaveText('labelAddToReferralDon dep nha 01', '+200,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('labelDescriptionDon dep nha 01', 'Don dep nha 01');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-task-referral-money.spec.js - Tasker accept task referral money', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Nấu ăn' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01', TaskPlace: 'VN;Hồ Chí Minh;Quận 7' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0834567891' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Nau an 01', PayByReferralMoney: 'TRUE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 29 - Tasker view task pay by referral money', async () => { //tasker thấy việc nấu ăn thanh toán bằng tiền giới thiệu.
    await expectIdToHaveText('labelCostNau an 01', '200,000');
    await expectIdToHaveText('labelPayByReferralNau an 01', '0');
    await expectIdToHaveText('labelAddToReferralNau an 01', '+200,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('labelDescriptionNau an 01', 'Nau an 01');
  });
})

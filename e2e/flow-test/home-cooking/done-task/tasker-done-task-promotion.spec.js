const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  expectIdToHaveText,
  expectIdToHaveTextAtIndex,
  swipe,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/done-task/tasker-done-task-promotion.spec.js - Tasker done task promotion', () => {
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
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: 50000, Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 01', PromotionCode: 'abc123' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 33 - Tasker done task with promotion', async () => { //Tasker hoàn thành công việc nấu ăn với mã khuyến mãi.
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', Progress: 'DONE' },
    ]);
    await tapId('Nau an 01');
    // TODO: Currently, AtIndex is not working on Android, this is a bug of Detox
    if (device.getPlatform() === 'ios') {
      await expectIdToHaveTextAtIndex('labelDescriptionNau an 01', 'Nau an 01');
      await expectIdToHaveTextAtIndex('labelContactNau an 01', 'Asker - 0834567890');
    }
    await tapId('btnDone');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thu nhập');
    await expectIdToHaveText('labelCost0', '200,000 VND');
    await tapIdAtIndex('btnBack');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '120,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '120,000 ₫');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  tapText,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-task-promotion.spec.js - Tasker accept task promotion', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0828833055', Service: 'Nấu ăn' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 01', ChooseTasker: 'auto' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0828833055' },
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: '50000', Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: '100' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Nau an 01', PromotionCode: 'abc123' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 35 - Tasker view promotion task and accept it', async () => { //Tasker xem và nhận việc nấu ăn khuyến mãi.
    await expectIdToHaveText('labelCostNau an 01', '200,000');
    await expectIdToHaveText('labelPromotionNau an 01', '150,000');
    await expectIdToHaveText('labelAddToPromotionNau an 01', '+50,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('labelDescriptionNau an 01', 'Nau an 01');
    await tapId('Nau an 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapText('Chat');
  });
})

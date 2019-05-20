const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  tapText
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-promotion.spec.js - Tasker accept task promotion', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01', ChooseTasker: 'auto' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0828833055' },
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: '50000', Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: '100' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', PromotionCode: 'abc123' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 31 - Tasker view promotion task and accept it', async () => { //Hiển thị thanh toán bằng tiền giới thiệu.
    await expectIdToHaveText('labelCostDon dep nha 01', '200,000');
    await expectIdToHaveText('labelPromotionDon dep nha 01', '150,000');
    await expectIdToHaveText('labelAddToPromotionDon dep nha 01', '+50,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('labelDescriptionDon dep nha 01', 'Don dep nha 01');
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapText('Chat');
  });
})

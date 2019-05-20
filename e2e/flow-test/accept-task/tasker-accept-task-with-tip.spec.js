const {
  initData,
  tapId,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
  expectElementVisible,
  tapText
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-with-tip.spec.js - Tasker accept task with tip', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('service/updateTipsForCleaningService');
    await device.reloadReactNative();
  });

  it('LINE 23 - Asker post task with Tip, Tasker accept this task', async () => { //Tasker nhận việc có tip và chấp nhận việc này.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Tasker accept task with Tip', Tip: 10000, Requirements: '1,2' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Tasker accept task with Tip', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectIdToHaveText('labelCostTasker accept task with Tip', '200,000');
    await expectIdToHaveText('labelTipTasker accept task with Tip', '(Đã bao gồm tip)');
    await expectIdToHaveText('labelRequirementTitle', 'Yêu cầu thêm: ');
    await expectIdToHaveText('labelRequirement1', '- Nấu ăn');
    await expectIdToHaveText('labelRequirement2', '- Ủi đồ');
    await expectIdToHaveText('labelDescriptionTasker accept task with Tip', 'Tasker accept task with Tip');
    await tapId('Tasker accept task with Tip');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementVisible('Tasker accept task with Tip');
  });

  it('LINE 43 - Tasker view list of tools requirement', async () => { //Tasker xem yêu cầu thêm.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Tasker accept task with requirements', Requirements: '3' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Tasker accept task with requirements', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('- Mang theo dụng cụ (Xem chi tiết)', 'text');
    await expectIdToHaveText('labelDescriptionTasker accept task with requirements', 'Tasker accept task with requirements');
    await tapId('Tasker accept task with requirements');
    await expectElementVisible('labelRequirement3');
    await tapId('labelRequirement3');
    await expectElementVisible('Các dụng cụ vệ sinh cần mang theo khi đến nhà khách hàng', 'text');
    await expectElementVisible('1. Chổi', 'text');
    await expectElementVisible('2. Ki hốt rác', 'text');
    await expectElementVisible('3. Cây lau nhà, xô', 'text');
    await expectElementVisible('4. Khăn lông', 'text');
    await expectElementVisible('5. Nước lau sàn', 'text');
    await expectElementVisible('6. Vim bồn cầu', 'text');
    await expectElementVisible('7. Nước lau kính', 'text');
    await expectElementVisible('8. Bàn chải toilet', 'text');
    await tapText('Đóng');
  });
})

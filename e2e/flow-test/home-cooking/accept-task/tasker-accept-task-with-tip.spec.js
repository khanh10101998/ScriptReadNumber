const {
  initData,
  tapId,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
  expectElementVisible,
  tapText,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-task-with-tip.spec.js - Tasker accept task with tip', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Nấu ăn' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('service/updateTipsForCleaningService');
    await device.reloadReactNative();
  });

  it('LINE 27 - Asker post task with Tip, Tasker accept this task', async () => { //Tasker thấy công việc nấu ăn có tip
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Tasker accept task with Tip', Tip: 10000 },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Tasker accept task with Tip', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectIdToHaveText('labelCostTasker accept task with Tip', '200,000');
    await expectIdToHaveText('labelTipTasker accept task with Tip', '(Đã bao gồm tip)');
    await expectIdToHaveText('labelDescriptionTasker accept task with Tip', 'Tasker accept task with Tip');
    await tapId('Tasker accept task with Tip');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementVisible('Tasker accept task with Tip');
  });
})

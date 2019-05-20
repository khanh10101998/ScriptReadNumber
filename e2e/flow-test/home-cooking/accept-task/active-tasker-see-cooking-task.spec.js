const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForLoading,
  expectElementVisible,
  expectElementNotVisible,
  expectElementNotExist,
  expectIdToHaveText,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/active-tasker-see-cooking-task.spec.js', () => {
  beforeEach(async () => {
    await initData('service/initCookingService');
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nấu ăn 01' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nấu ăn 02' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nấu ăn 03' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0828833055' },
      { Description: 'Don dep nha 02', TaskerPhone: '0828833055' },
      { Description: 'Nấu ăn 01', TaskerPhone: '0828833055' },
      { Description: 'Nấu ăn 02', TaskerPhone: '0828833055' },
      { Description: 'Nấu ăn 03', TaskerPhone: '0828833055' },
    ]);

    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0828833055', Service: 'Nấu ăn' }
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 43 - ACTIVE tasker accept cooking task', async () => { //Tasker nhận việc nấu ăn khi trạng thái ACTIVE.
    await tapId('Nấu ăn 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Nấu ăn 01');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Nấu ăn 01');
  });

  it('LINE 54 - ACTIVE tasker accept cooking expired task', async () => { //Tasker nhận việc nấu ăn đã hết hạn khi trạng thái ACTIVE.
    await tapId('Nấu ăn 01');
    await initData(
      'task/updateTask',
      [
        { Description: 'Nấu ăn 01', Status: 'EXPIRED' },
      ]
    );
    await waitForLoading(500);
    await expectIdToHaveText('labelStatus', 'Thời gian làm việc đã qua.');
    await expectElementNotExist('checkBoxConfirm', 'id');
  });

  it('LINE 67 - ACTIVE tasker accept multi cooking tasks', async () => { //Tasker nhận nhiều công việc nấu ăn trong trạng thái ACTIVE.
    await tapId('Nấu ăn 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Nấu ăn 01');
    await expectElementVisible('Nấu ăn 02');
    await tapId('Nấu ăn 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Nấu ăn 02');
  });
})

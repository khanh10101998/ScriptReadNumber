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
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/active-tasker-accept-task.spec.js - Active tasker accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 02' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 03' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 04' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 05' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0828833055' },
      { Description: 'Don dep nha 02', TaskerPhone: '0828833055' },
      { Description: 'Don dep nha 03', TaskerPhone: '0828833055' },
      { Description: 'Don dep nha 04', TaskerPhone: '0828833055' },
      { Description: 'Don dep nha 05', TaskerPhone: '0828833055' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 37 - ACTIVE tasker accept task', async () => { //Tasker nhận việc ở tab việc mới
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Don dep nha 01');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Don dep nha 01');
  });

  it('LINE 47 - ACTIVE tasker accept expired task', async () => { //tasker nhận việc đã hết hạn
    await tapId('Don dep nha 01');
    await initData(
      'task/updateTask',
      [
        { Description: 'Don dep nha 01', Status: 'EXPIRED' },
      ]
    );
    await waitForLoading(500);
    await expectIdToHaveText('labelStatus', 'Thời gian làm việc đã qua.');
    await expectElementNotExist('checkBoxConfirm', 'id');
  });

  //TODO: need to sroll down to bottom to see the 3rd task
  it('LINE 61 - ACTIVE tasker accept multi tasks', async () => { //Tasker nhận 3 việc ở tab việc mới
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementVisible('Don dep nha 02');
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementVisible('Don dep nha 03');
    await tapId('Don dep nha 03');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
  });
})

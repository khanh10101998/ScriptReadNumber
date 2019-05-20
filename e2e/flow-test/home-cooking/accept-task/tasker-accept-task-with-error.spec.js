const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  expectElementVisible,
  expectElementNotExist,
  taskerAcceptTask,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-task-with-error.spec.js - Tasker accept task with error', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833056', Name: 'Tasker 1', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833057', Name: 'Tasker 2', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833055', Description: 'Nau an 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0828833056' },
      { Description: 'Nau an 01', TaskerPhone: '0828833057' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833057', '123456');
  });

  it('LINE 29 - Some how tasker view confirmed task and accept it. Check the error', async () => { //Tasker nhận việc nấu ăn đã có người nhận trong trạng thái CONFIRMED.
    await tapId('Nau an 01');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', AcceptedTasker: '0828833056', Status: 'CONFIRMED' },
    ]);
    await taskerAcceptTask('0828833057', 'Nau an 01');
    await expectElementVisible('Công việc này đã có người nhận', 'text');
    await expectElementNotExist('Nau an 01');
    await expectElementNotExist('checkBoxConfirm');
    await expectElementNotExist('btnAcceptTask');
    await expectElementNotExist('btnCall');
    await expectElementNotExist('btnSMS');
  });

  it('LINE 43 - Some how tasker view done task and accept it. Check the error', async () => { //Tasker nhận việc nấu ăn đã có người nhận trong thạng thái DONE.
    await tapId('Nau an 01');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', AcceptedTasker: '0828833056', Status: 'DONE' },
    ]);
    await taskerAcceptTask('0828833057', 'Nau an 01');
    await expectElementVisible('Công việc này đã có người nhận', 'text');
    await expectElementNotExist('Nau an 01');
    await expectElementNotExist('checkBoxConfirm');
    await expectElementNotExist('btnAcceptTask');
    await expectElementNotExist('btnCall');
    await expectElementNotExist('btnSMS');
  });

  it('LINE 57 - Some how tasker view canceled task and accept it. Check the error', async () => { //Tasker nhận việc nấu ăn đã có người nhận trong trạng thái CANCEL.
    await tapId('Nau an 01');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', AcceptedTasker: '0828833056', Status: 'CANCELED' },
    ]);
    await taskerAcceptTask('0828833057', 'Nau an 01');
    await expectElementVisible('Công việc này đã có người nhận', 'text');
    await expectElementNotExist('Nau an 01');
    await expectElementNotExist('checkBoxConfirm');
    await expectElementNotExist('btnAcceptTask');
    await expectElementNotExist('btnCall');
    await expectElementNotExist('btnSMS');
  });

  it('LINE 71 - Some how tasker view expired task and accept it. Check the error', async () => { //Tasker nhận việc nấu ăn đã hết hạn.
    await tapId('Nau an 01');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', AcceptedTasker: '0828833056', Status: 'EXPIRED' },
    ]);
    await taskerAcceptTask('0828833057', 'Nau an 01');
    await expectIdToHaveText('labelStatus', 'Thời gian làm việc đã qua.');
    await expectElementNotExist('checkBoxConfirm');
    await expectElementNotExist('btnCall');
    await expectElementNotExist('btnSMS');
  });
})

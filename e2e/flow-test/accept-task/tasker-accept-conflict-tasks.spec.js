const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectIdToHaveText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-conflict-tasks.spec.js - Tasker accept conflict task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 02', Status: 'POSTED' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0828833055' },
      { Description: 'Don dep nha 02', TaskerPhone: '0828833055' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0828833055', Description: 'Don dep nha 01' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 31 - ACTIVE tasker accept multitasks with conflict schedule', async () => { //Tasker nhận việc trùng thời gian làm.
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 39 - ACTIVE tasker accept multitasks with conflict time in between task', async () => { //Tasker nhận việc trong khoản thời gian ít hơn 30 phút sau khi hoàn tất việc cũ.
    await initData('task/updateTask', [
      { Progress: 'NEXT_2.5H', Description: 'Don dep nha 02', LatLng: '10.7182695,106.7266892' },
    ]);
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 50 - Tasker accept with task 1 from 10AM-12PM task 2 from 9AM-11AM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 9AM-11AM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '9:00' });
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 60 - Tasker accept with task 1 from 10AM-12PM task 2 from 11AM-13PM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 11AM-13PM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '11:00' });
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 70 - Tasker accept with task 1 from 10AM-12PM task 2 from 7:46AM-9:46AM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 7:46AM-9:46AM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '7:46' });
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 80 - Tasker accept with task 1 from 10AM-12PM task 2 from 12:14AM-14:14PM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 12:14AM-14:14PM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '12:14' });
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 90 - Tasker accept with task 1 from 10AM-12PM task 2 from 9:00AM-13:00PM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 9:00AM-13:00PM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '9:00' });
    await initData('task/updateTask', [
      { Duration: '4', Description: 'Don dep nha 02' },
    ]);
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 103 - Tasker accept with task 1 from 10AM-12PM task 2 from 7:30AM-9:30AM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 7:30AM-9:30AM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '7:30' });
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Don dep nha 02', 1000);
  });

  it('LINE 112 - Tasker accept with task 1 from 10AM-12PM task 2 from 12:30AM-14:30PM', async () => { //Tasker nhận hai việc từ 10AM-12PM và 12:30AM-14:30PM.
    await initData('task/updateTaskTime', { note: 'Don dep nha 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Don dep nha 02', time: '12:30' });
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Don dep nha 02', 1000);
  });
})

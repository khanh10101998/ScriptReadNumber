const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectIdToHaveText,
  waitForElement,
  scroll,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-conflict-tasks.spec.js - Tasker accept conflict task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0828833055', Service: 'Nấu ăn' }
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 01', Status: 'CONFIRMED' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 02', Status: 'POSTED' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0828833055' },
      { Description: 'Nau an 02', TaskerPhone: '0828833055' }
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0828833055', Description: 'Nau an 01' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 36 - ACTIVE tasker accept multitasks with conflict schedule', async () => { //Tasker nhận việc trùng thời gian làm việc.
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 45 - ACTIVE tasker accept multitasks with conflict time in between task', async () => { //Tasker nhận việc bị trùng thời gian giữa 2 công việc.
    await initData('task/updateTask', [
      { Progress: 'NEXT_2.5H', Description: 'Nau an 02', LatLng: '10.7182695,106.7266892' },
    ]);
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }    
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 60 - Tasker accept with task 1 from 10AM-12PM task 2 from 9AM-11AM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 9AM-11AM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '9:00' });
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 74 - Tasker accept with task 1 from 10AM-12PM task 2 from 11AM-13PM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 11AM-13PM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '11:00' });
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 88 - Tasker accept with task 1 from 10AM-12PM task 2 from 7:46AM-9:46AM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 7:46AM-9:46AM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '7:46' });
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 102 - Tasker accept with task 1 from 10AM-12PM task 2 from 12:14AM-14:14PM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 14:14PM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '12:14' });
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 116 - Tasker accept with task 1 from 10AM-12PM task 2 from 9:00AM-13:00PM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 9:00AM-13:00PM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '9:00' });
    await initData('task/updateTask', [
      { Duration: '4', Description: 'Nau an 02' },
    ]);
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Trùng thời gian làm việc.');
    await tapText('Đóng');
  });

  it('LINE 133 - Tasker accept with task 1 from 10AM-12PM task 2 from 7:30AM-9:30AM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 7:30AM-9:30AM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '7:30' });
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Nau an 02', 1000);
  });

  it('LINE 146 - Tasker accept with task 1 from 10AM-12PM task 2 from 12:30AM-14:30PM', async () => { //Tasker nhận việc từ 10AM-12PM và từ 12:30AM-14:30PM.
    await initData('task/updateTaskTime', { note: 'Nau an 01', time: '10:00' });
    await initData('task/updateTaskTime', { note: 'Nau an 02', time: '12:30' });
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Nau an 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Nau an 02', 1000);
  });
})

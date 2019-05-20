const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  sleep,
  expectElementVisible,
  expectIdToHaveText,
} = require('../../step-definitions');
const expect = require('chai').expect; 

describe('FILE: flow-test/accept-task/accept-task-manual-or-auto-choose-tasker.spec.js - Tasker accept task by manual or auto choose tasker', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 01', ChooseTasker: 'manual' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 02', ChooseTasker: 'auto' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 28 - Tasker accept task with manual choose tasker', async () => { //Tasker nhận công việc.
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Don dep nha 01');
    await expectElementVisible('CHI TIẾT CÔNG VIỆC', 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('Don dep nha 01');
    await expectIdToHaveText("labelStatus", "Bạn đã nhận công việc này");
  });

  it('LINE 39 - Tasker accept task with auto choose tasker', async () => { //Tasker nhận công việc với tự động chọn tasker.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Don dep nha 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapId('Chat');
    await expectElementVisible('CHAT', 'text');
  });

  it('LINE 49 - Check new data accepted tasker after accepted task', async () => { //Tasker kiểm tra data sau khi nhận công việc.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await sleep(1000);
    const data = await initData('task/getTaskByDescription', {description: 'Don dep nha 01'});
    const acceptedTasker = data.acceptedTasker[0];
    expect(acceptedTasker.name).to.equal('Tasker');
    expect(acceptedTasker.avgRating).to.equal(4.5);
    expect(acceptedTasker.taskDone).to.equal(10);
  });
})

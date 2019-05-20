const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/cancel-task/tasker-cancel-task-suggest-same-task.spec.js - Tasker cancel task, suggest the same tasks', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      enableTaskerCancelTask: true,
      numOfTaskToCancel: 20,
    });
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker 01', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker 02', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20, WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567890', Blacklist: true },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02'},
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 03' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 04' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 03' },
    ]);
    await device.reloadReactNative();
  });

  afterEach(async () => {
    try {
      await waitForElement('Xem', 5000, 'text');
      await tapText('Xem');
      await tapText('Đóng');
    } catch (error) {}
  })

  it('LINE 44 - Tasker cancel task, suggest the same tasks, exclude tasks of blacklist asker', async () => { //Không thấy công việc tương tự sau khi hủy công việc.
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Don dep nha 03');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await expectElementVisible('Xin hủy việc này', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await expectElementVisible('Lỡ nhận công việc quá xa.', 'text');
    await tapText('Lỡ nhận công việc quá xa.');
    await tapText('Xin hủy việc này');
    await tapText('Đóng');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Don dep nha 01', 'text');
    await expectElementNotVisible('Don dep nha 02', 'text');
    await expectElementVisible('Don dep nha 04', 'text');
  });
})

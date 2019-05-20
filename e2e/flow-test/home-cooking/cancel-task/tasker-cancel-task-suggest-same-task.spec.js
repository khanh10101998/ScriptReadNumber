const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotVisible,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/cancel-task/tasker-cancel-task-suggest-same-task.spec.js - Tasker cancel task, suggest the same tasks', () => {
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
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567892', Service: 'Nấu ăn' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567890', Blacklist: true },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 02'},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567891', Description: 'Nau an 03' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567891', Description: 'Nau an 04' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Nau an 03' },
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

  it('LINE 47 - Tasker cancel task, suggest the same tasks, exclude tasks of blacklist asker', async () => { //Tasker huy việc nấu ăn và không hiện công việc tương tự ở việc mới, không hiện công việc trong Blacklist.
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Nau an 03');
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
    await expectElementNotVisible('Nau an 01', 'text');
    await expectElementNotVisible('Nau an 02', 'text');
    await expectElementVisible('Nau an 04', 'text');
  });
})

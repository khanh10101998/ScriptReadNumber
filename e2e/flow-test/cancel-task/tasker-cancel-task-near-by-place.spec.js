const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/cancel-task/tasker-cancel-task-near-by-place.spec.js - Tasker cancel task', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      enableTaskerCancelTask: true,
      numOfTaskToCancel: 20,
    });
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20 },
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

  it('LINE 30 - Tasker cancel task: waiting for canceling task', async () => { //Tasker hủy việc lý do không liên hệ được với khách hàng khi chưa tới 15' sau khi nhận việc.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', Date: 'today', Time: 'now' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 03' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Don dep nha 02');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await expectElementVisible('Đóng', 'text');
    await expectElementVisible('Xin hủy việc này', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await waitForElement('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.', 500, 'text');
    await tapText('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.');
    await waitForElement('Vui lòng chờ thêm 15 phút để huỷ công việc.', 1000, 'text');
    await tapText('Đóng');
  });

  it('LINE 57 - Tasker cancel task: Task time has not been comming yet.', async () => {//Tasker hủy việc lý do không liên hệ được với khách hàng khi chưa tới 15' sau khi nhận việc.
    const currentDate = await new Date();
    const beforeDate = await new Date(currentDate);
    await beforeDate.setMinutes(currentDate.getMinutes() + 2);
    const hour = await beforeDate.getHours();
    const minute = await beforeDate.getMinutes();
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', Date: 'today', Time: `${hour},${minute}` },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 03' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Don dep nha 02');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await expectElementVisible('Đóng', 'text');
    await expectElementVisible('Xin hủy việc này', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 2000, 'text');
    await waitForElement('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.', 500, 'text');
    await tapText('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.');
    await waitForElement('Chức năng này sẽ được mở sau khi công việc bắt đầu được 15 phút.', 1000, 'text');
    await tapText('Đóng');
  });
});
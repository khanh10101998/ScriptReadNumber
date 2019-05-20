const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/cancel-task/tasker-cancel-task-free-charge.spec.js - Tasker cancel task', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      enableTaskerCancelTask: true,
      numOfTaskToCancel: 20,
    });
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20 },
    ]);
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
    await device.reloadReactNative();
  });

  //Error: The app requires GPS (ios)
  it.skip('LINE 34 - Tasker cancel task with reason Nearby Task Place', async () => { //Tasker hủy công việc với lý do không liên hệ được với khách hàng.
    // This test case work with GPS on IOS
    if (device.getPlatform() === 'ios') {
      await loginWithPhoneAndPassword('0834567891', '123456');
      await tapText('XÁC NHẬN');
      await tapText('Don dep nha 01');
      await waitForElement('XIN HỦY VIỆC', 1000, 'text');
      await tapText('XIN HỦY VIỆC');
      await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
      await expectElementVisible('Đóng', 'text');
      await expectElementVisible('Xin hủy việc này', 'text');
      await tapText('Xin hủy việc này');
      await waitForElement('Xin hủy việc này', 1000, 'text');
      await tapText('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.');
      await waitForElement('Xác nhận hủy công việc', 1000, 'text');
      await expectElementVisible('Lý do hủy công việc:', 'text');
      await expectElementVisible('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.', 'text');
      await expectElementVisible('Tiền phạt:', 'text');
      await expectElementVisible('0 vnd', 'text');
      await tapText('Xin hủy việc này');
      await waitForElement('Thông báo', 1000, 'text');
      await expectElementVisible('Hủy công việc thành công.', 'text');
      await expectElementVisible('Tiền phạt:', 'text');
      await expectElementVisible('0 vnd', 'text');
      await tapText('Đóng');
      await expectElementNotVisible('Thông báo');
      await expectElementNotVisible('Don dep nha 01');
      const data = await initData('user/findTaskerTransaction', [
        { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 20000 },
      ]);
    }
  });
})

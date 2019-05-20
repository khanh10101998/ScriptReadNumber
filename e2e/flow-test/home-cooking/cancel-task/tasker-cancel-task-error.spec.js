const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  typeToTextField,
  scrollTo,
  scroll
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/cancel-task/tasker-cancel-task-error.spec.js - Tasker cancel task', () => {
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
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 02', Date: 'today', Time: 'now' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 03' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 02' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 03' },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: '500000' },
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

  it('LINE 46 - Tasker cancel task error time invalid', async () => { //Tasker hủy việc nấu ăn đã hết hạn.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await scroll('listViewconfirmed', 400, 'down');
    await tapText('Nau an 01');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await expectElementVisible('Đóng', 'text');
    await expectElementVisible('Xin hủy việc này', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await tapText('Sự cố bất khả kháng không thể đi làm.');
    await waitForElement('Sự cố bất khả kháng không thể đi làm.', 500, 'text');
    await typeToTextField('inputTextOther', 'nha co con nho bi om nang');
    await tapText('Xin hủy việc này');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    // await expectElementVisible('Lý do hủy công việc:', 'text');
    await expectElementVisible('Sự cố bất khả kháng không thể đi làm.', 'text');
    await expectElementVisible('nha co con nho bi om nang', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await initData('task/updateTask', [
      { Description: 'Nau an 01', Progress: 'DONE' },
    ]);
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Thời gian làm việc đã qua, bạn không thể hủy công việc này !', 'text');
    await tapText('Đóng');
    await expectElementVisible('btnDone');
  });

  it('LINE 78 - Tasker cancel task success', async () => { //Tasker hủy việc nấu ăn thành công.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await scroll('listViewconfirmed', 400, 'down');
    await tapText('Nau an 01');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await expectElementVisible('Đóng', 'text');
    await expectElementVisible('Xin hủy việc này', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await tapText('Sự cố bất khả kháng không thể đi làm.');
    await waitForElement('Sự cố bất khả kháng không thể đi làm.', 500, 'text');
    await typeToTextField('inputTextOther', 'nha co con nho bi om nang');
    await tapText('Xin hủy việc này');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    // await expectElementVisible('Lý do hủy công việc:', 'text');
    await expectElementVisible('Sự cố bất khả kháng không thể đi làm.', 'text');
    await expectElementVisible('nha co con nho bi om nang', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Hủy công việc thành công.', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await tapText('Đóng');
  });

  it('LINE 108 - Tasker cancel task error limit', async () => { //Tasker hủy quá nhiều việc trong 1 tuần.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await scroll('listViewconfirmed', 400, 'down');
    await tapText('Nau an 01');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await tapText('Sự cố bất khả kháng không thể đi làm.');
    await waitForElement('Sự cố bất khả kháng không thể đi làm.', 500, 'text');
    await typeToTextField('inputTextOther', 'nha co con nho bi om nang');
    await tapText('Xin hủy việc này');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Hủy công việc thành công.', 'text');
    try {
      await waitForElement('modalContent', 6000);
      await tapText('Xem');
    } catch (error) {}
    await tapText('Đóng');

    await tapText('XÁC NHẬN');
    await scroll('listViewconfirmed', 400, 'up');
    await tapText('Nau an 02');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await tapText('Sự cố bất khả kháng không thể đi làm.');
    await waitForElement('Sự cố bất khả kháng không thể đi làm.', 500, 'text');
    await typeToTextField('inputTextOther', 'nha co con nho bi om nang');
    await tapText('Xin hủy việc này');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Hủy công việc thành công.', 'text');
    await tapText('Đóng');

    await tapText('XÁC NHẬN');
    await scrollTo('listViewconfirmed', 'bottom');
    await tapText('Nau an 03');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await tapText('Sự cố bất khả kháng không thể đi làm.');
    await waitForElement('Sự cố bất khả kháng không thể đi làm.', 500, 'text');
    await typeToTextField('inputTextOther', 'nha co con nho bi om nang');
    await tapText('Xin hủy việc này');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Không thể hủy công việc này. Bạn đã vượt mức hủy công việc cho phép trong 7 ngày qua !', 'text');
    await tapText('Đóng');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotVisible, typeToTextField, tapHeaderBack,
  scroll
} = require('../../../step-definitions');
const expect = require('chai').expect;
const moment = require('moment');

describe('FILE: flow-test/home-cooking/cancel-task/tasker-cancel-task-charge-fee.spec.js - Tasker cancel task', () => {
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
      { Phone: '0834567890', Main: '400000' },
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

  it('LINE 49 - Tasker cancel task with reason Task So Far', async () => { //Tasker hủy việc nấu ăn với lý do lỡ chọn việc quá xa.
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
    await expectElementVisible('Vui lòng bấm chọn 1 trong các lý do bên dưới để hủy công việc này', 'text');
    await expectElementVisible('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.', 'text');
    await expectElementVisible('Lỡ nhận công việc quá xa.', 'text');
    await expectElementVisible('Xem nhầm ngày không đi làm được.', 'text');
    await expectElementVisible('Sự cố bất khả kháng không thể đi làm.', 'text');
    await expectElementVisible('Đóng', 'text');
    await tapText('Lỡ nhận công việc quá xa.');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    // await expectElementVisible('Lý do hủy công việc:', 'text');
    await expectElementVisible('Lỡ nhận công việc quá xa.', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await expectElementVisible('Đây là số tiền phạt tạm tính ngay lúc này, số tiền chính thức sẽ được tính sau khi bạn bấm nút hủy công việc bên dưới. Tiền phạt sẽ trừ trực tiếp vào tài khoản chính nếu bạn hủy công việc.', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Hủy công việc thành công.', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await tapText('Đóng');
    await expectElementNotVisible('Thông báo');
    await expectElementNotVisible('Nau an 01');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 20000 },
    ]);
    expect(data.data).to.not.be.null;
  });

  it('LINE 88 - Tasker cancel task with reason Wrong Date', async () => { //Tasker hủy việc nấu ăn với lý do chọn nhầm ngày.
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
    await tapText('Xem nhầm ngày không đi làm được.');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    // await expectElementVisible('Lý do hủy công việc:', 'text');
    await expectElementVisible('Xem nhầm ngày không đi làm được.', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Hủy công việc thành công.', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('20,000 vnd', 'text');
    await tapText('Đóng');
    await expectElementNotVisible('Thông báo');
    await expectElementNotVisible('Nau an 01');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 20000 },
    ]);
    expect(data.data).to.not.be.null;
  });

  it('LINE 120 - Tasker cancel task with reason Other', async () => { //Tasker hủy công việc nấu ăn với lựa chọn khác.
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
    await expectElementNotVisible('Thông báo');
    await expectElementNotVisible('Nau an 01');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 20000 },
    ]);
    expect(data.data).to.not.be.null;
  });

  it('LINE 156 - Tasker cancel task and change status to CANCELED', async () => { //Tasker hủy việc nấu ăn và chuyển sang trạng thái cancel.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Nau an 02');
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
    await expectElementVisible('200,000 vnd', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Thông báo', 1000, 'text');
    await expectElementVisible('Hủy công việc thành công.', 'text');
    await expectElementVisible('Tiền phạt:', 'text');
    await expectElementVisible('200,000 vnd', 'text');
    await tapText('Đóng');
    await expectElementNotVisible('Thông báo');
    await expectElementNotVisible('Nau an 02');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 200000 },
    ]);
  });

  //Error: The app requires GPS (ios)
  it.skip('LINE 187 - Tasker cancel task and change status to CANCELED, Asker charged fee', async () => { //Tasker hủy việc nấu ăn với lý do không thể liên hệ được với khách hàng.
    await initData('task/updateTask', [
      { Description: 'Nau an 02', NewCreatedAt: moment().subtract(1, 'd').toDate() },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await tapText('Nau an 02');
    await waitForElement('XIN HỦY VIỆC', 1000, 'text');
    await tapText('XIN HỦY VIỆC');
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await expectElementVisible('Đóng', 'text');
    await expectElementVisible('Xin hủy việc này', 'text');
    await tapText('Xin hủy việc này');
    await waitForElement('Xin hủy việc này', 1000, 'text');
    await expectElementVisible('Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.', 'text');
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
    await expectElementNotVisible('Nau an 02');
    const dataTasker = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 200000 },
    ]);
    const dataAsker = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567890', AccountType: 'M', Type: 'C', Amount: 60000 },
    ]);
    expect(dataTasker.data).to.be.null;
    expect(dataAsker.data).to.not.be.null;
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotVisible,
  typeToTextField
} = require('../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/cancel-task/tasker-cancel-promotion-task.spec.js - Tasker cancel promotion task', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      enableTaskerCancelTask: true,
      numOfTaskToCancel: 20,
    });
    await device.reloadReactNative();
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', Date: 'today', Time: 'now' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03' },
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: '50000', Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: '100' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02', PromotionCode: 'abc123' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 03' },
    ]);
    
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: '500000' },
      { Phone: '0834567890', Main: '400000' },
    ]);
  });

  it('LINE 43 - Tasker cancel promotion task', async () => { //Tasker hủy công việc khuyến mãi.
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
    await expectElementNotVisible('Don dep nha 02');
    var data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'C', Amount: 200000 },
    ]);
    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567891' });
    expect(data.FMainAccount).to.equal(-200000);
    expect(data.Promotion).to.equal(500000);
    await waitForElement('Xem', 5000, 'text');
    await tapText('Xem');
  });
})

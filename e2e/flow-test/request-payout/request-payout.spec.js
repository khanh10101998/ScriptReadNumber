const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  typeToTextField,
  expectElementVisibleAtIndex,
  expectElementNotVisible,
  clearTextInput,
  waitForLoading
} = require('../../step-definitions');

describe('FILE: flow-test/request-payout/request-payout.spec.js - Tasker view financial account and send request payout', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 26 - Tasker view financial account and send request payout success', async () => { //Tasker xem thông tin tài chính và yêu cầu rút tiền.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 0, Main: 1000000 },
    ]);
    await initData('user/updateUser', [
      {Phone: '0834567891', TCBankNumber: '0834567890'},
    ]);
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await waitForElement('Thông tin tài chính', 1000, 'text');
    await tapText('Thông tin tài chính');
    await waitForElement('TÀI KHOẢN', 1000, 'text');
    await expectElementVisible('YÊU CẦU RÚT TIỀN', 'text');
    await expectElementVisible('LỊCH SỬ RÚT TIỀN', 'text');
    await expectIdToHaveText('txtMainAccount', '1,000,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '1,100,000 ₫');
    await tapText('GỬI YÊU CẦU');
    await waitForElement('Chủ tài khoản: Tasker 01', 1000, 'text');
    await expectElementVisible('Số tài khoản: 0834567890', 'text');
    await expectElementVisible('Từ 500,000đ đến 600,000đ', 'text');
    await typeToTextField('txtPayoutAmount', '600000');
    await tapId('btnSendPayoutRequest');
    await expectElementVisible('Số tiền nhập vào không hợp lệ. Vui lòng nhập số tiền từ 500,000đ đến 600,000đ', 'text');
    await tapText('Đóng');
    await clearTextInput('txtPayoutAmount');
    await typeToTextField('txtPayoutAmount', '600');
    await tapId('btnSendPayoutRequest');
    await waitForElement('Xác nhận rút tiền', 1000, 'text');
    await expectElementVisible('Số tiền: 600,000đ', 'text');
    await expectElementVisible('Tài khoản nhận: TECHCOMBANK 0834567890 - Tasker 01', 'text');
    await tapText('Đồng ý');
    await waitForElement('Gửi yêu cầu thành công', 1000, 'text');
    await expectElementVisible('Số tiền sẽ nhận: 600,000đ', 'text');
    await tapText('Đóng');
    await waitForElement('THÔNG TIN TÀI CHÍNH', 1000, 'text');
    await expectIdToHaveText('txtMainAccount', '400,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '500,000 ₫');
    await expectElementVisible('ĐANG CHỜ RÚT TIỀN', 'text');
    // expectElementVisibleAtIndex worked on ios only
    if (device.getPlatform() === 'ios') {
      await expectElementVisibleAtIndex('600,000 đ', 0, 'text');
    }
    await expectElementVisible('Chờ thanh toán', 'text');

    // Can not send 2nd RequestPayout
    await tapText('GỬI YÊU CẦU');
    await waitForElement('Bạn chưa đủ điều kiện rút tiền', 1000, 'text');
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 0, Main: 1600000 },
    ]);
    await waitForElement('Từ 500,000đ đến 600,000đ', 1000, 'text');
    await typeToTextField('txtPayoutAmount', '600000');
    await tapText('Từ 500,000đ đến 600,000đ');// Blur out of text field
    await tapId('btnSendPayoutRequest');
    await waitForElement('Số tiền yêu cầu rút trước đó: 600,000đ', 1000, 'text');
    await tapText('Đóng');
  });

  it('LINE 86 - Tasker send request payout not have TCBankNumber and mainAccount', async () => { //Tasker rút tiền khi không có tài khoản techcombank và không có tài khoản chính.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 0, Main: 100000 },
    ]);
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await waitForElement('Thông tin tài chính', 1000, 'text');
    await tapText('Thông tin tài chính');
    await waitForElement('TÀI KHOẢN', 1000, 'text');
    await expectElementVisible('YÊU CẦU RÚT TIỀN', 'text');
    await expectElementVisible('LỊCH SỬ RÚT TIỀN', 'text');
    await expectIdToHaveText('txtMainAccount', '100,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '200,000 ₫');
    await tapText('GỬI YÊU CẦU');
    await waitForElement('Bạn chưa đủ điều kiện rút tiền', 1000, 'text');
    await expectElementVisible('Bạn chưa cập nhật tài khoản ngân hàng với bTaskee.', 'text');
    await expectElementVisible('GỌI HỖ TRỢ', 'text');
  });

  it('LINE 106 - Tasker request payout with 2 confirmed tasks', async () => { //Test màn hình gửi yêu cầu rút tiền khi số tiền thài khoản chính thay đỗi.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 10000, Main: 900000 },
    ]);
    await initData('user/updateUser', [
      {Phone: '0834567891', TCBankNumber: '0834567890'},
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 02' },
    ]);
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await waitForElement('Thông tin tài chính', 1000, 'text');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '900,000 ₫');
    await expectIdToHaveText('txtProAccount', '10,000 ₫');
    await expectIdToHaveText('txtHoldAmount', '-45,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '865,000 ₫');
    await tapText('GỬI YÊU CẦU');
    await waitForElement('Bạn chưa đủ điều kiện rút tiền', 1000, 'text');
    await expectElementNotVisible('btnSendPayoutRequest');
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 10000, Main: 935000 },
    ]);
    await waitForElement('500,000đ', 1000, 'text');
    await expectElementVisible('btnSendPayoutRequest');
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 10000, Main: 1000000 },
    ]);
    await waitForElement('Từ 500,000đ đến 565,000đ', 1000, 'text');
  });
})

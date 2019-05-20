const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  expectElementNotVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/cancel-payout/request-cancel-payout.spec.js - Tasker view financial account and send request canceling payout', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it.skip('LINE 22 - Tasker view financial account and send request canceling payout successfully', async () => { //Tasker gửi yêu cầu rút tiền.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 0, Main: 1000000,  },
    ]);
    await initData('cancelPayout/createCancelPayout', [
      { Phone: '0834567891', Amount: 600000, Status: 'WAIT' }
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
    await expectIdToHaveText('txtMainAccount', '400,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '500,000 ₫');
    await waitForElement('ĐANG CHỜ RÚT TIỀN', 1000, 'text');
    await waitForElement('Chờ thanh toán', 1000, 'text');

    await tapText('HUỶ RÚT TIỀN');
    await waitForElement('Yêu cầu huỷ rút tiền', 1000, 'text');
    await waitForElement('Vui lòng xác nhận huỷ rút tiền!', 1000, 'text');
    await tapText('Đóng');
    await waitForElement('ĐANG CHỜ RÚT TIỀN', 500, 'text');

    await tapText('HUỶ RÚT TIỀN');
    await waitForElement('Yêu cầu huỷ rút tiền', 1000, 'text');
    await waitForElement('Vui lòng xác nhận huỷ rút tiền!', 1000, 'text');
    await tapText('Đồng ý');
    await expectElementNotVisible('ĐANG CHỜ RÚT TIỀN', 'text');
    await expectIdToHaveText('txtMainAccount', '1,000,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '1,100,000 ₫');
  });

  it('LINE 61 - Tasker can not cancel payout with status LOCKED', async () => { //Tasker không thể  hủy rút tiền với trạng thái LOCKED.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 0, Main: 1000000,  },
    ]);
    await initData('cancelPayout/createCancelPayout', [
      { Phone: '0834567891', Amount: 600000, Status: 'LOCKED' }
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
    await expectElementNotVisible('ĐANG CHỜ RÚT TIỀN', 'text');
  });

  // it('LINE 84 - Do nothing when push cancel payout button', async () => {
  //   await initData('financial/updateFinancialAccount', [
  //     { Phone: '0834567891', Promotion: 0, Main: 1000000,  },
  //   ]);
  //   await initData('cancelPayout/createCancelPayout', [
  //     { Phone: '0834567891', Amount: 600000, Status: 'WAIT' }
  //   ]);
  //   await initData('user/updateUser', [
  //     {Phone: '0834567891', TCBankNumber: '0834567890'},
  //   ]);
  //   await expectElementVisible('bTaskee', 'text');
  //   await tapId('btnMenu');
  //   await waitForElement('Thông tin tài chính', 1000, 'text');
  //   await tapText('Thông tin tài chính');
  //   await waitForElement('TÀI KHOẢN', 1000, 'text');
  //   await expectElementVisible('YÊU CẦU RÚT TIỀN', 'text');
  //   await expectElementVisible('LỊCH SỬ RÚT TIỀN', 'text');
  //   await expectIdToHaveText('txtMainAccount', '400,000 ₫');
  //   await expectIdToHaveText('txtProAccount', '100,000 ₫');
  //   await expectIdToHaveText('txtTotalAccount', '500,000 ₫');
  //   await waitForElement('ĐANG CHỜ RÚT TIỀN', 1000, 'text');
  //   await waitForElement('Chờ thanh toán', 1000, 'text');

  //   await tapText('HUỶ RÚT TIỀN');
  //   await waitForElement('Yêu cầu huỷ rút tiền', 1000, 'text');
  //   await waitForElement('Vui lòng xác nhận huỷ rút tiền!', 1000, 'text');
  //   await tapText('Đóng');
  //   await waitForElement('ĐANG CHỜ RÚT TIỀN', 500, 'text');

  //   await tapText('HUỶ RÚT TIỀN');
  //   await waitForElement('Yêu cầu huỷ rút tiền', 1000, 'text');
  //   await waitForElement('Vui lòng xác nhận huỷ rút tiền!', 1000, 'text');
  //   await tapText('Đồng ý');
  //   await expectElementVisible('ĐANG CHỜ RÚT TIỀN', 'text');
  //   await expectIdToHaveText('txtMainAccount', '400,000 ₫');
  //   await expectIdToHaveText('txtProAccount', '100,000 ₫');
  //   await expectIdToHaveText('txtTotalAccount', '500,000 ₫');
  // });

  it('LINE 123 - Do NOT see the cancel payout button', async () => { //Tasker không thấy button hủy rút tiền.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 0, Main: 1000000,  },
    ]);
    await initData('cancelPayout/createCancelPayout', [
      { Phone: '0834567891', Amount: 600000, Status: 'WAIT' }
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
    await expectIdToHaveText('txtMainAccount', '400,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '500,000 ₫');
    await waitForElement('ĐANG CHỜ RÚT TIỀN', 1000, 'text');
    await waitForElement('Chờ thanh toán', 1000, 'text');

    await expectElementNotVisible('HUỶ RÚT TIỀN', 'text');
  });
})

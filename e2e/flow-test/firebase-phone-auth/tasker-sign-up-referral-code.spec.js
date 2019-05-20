
const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  fillFirebaseCode ,
  waitForLoading
} = require('../../step-definitions');

describe.skip('FILE: flow-test/firebase-phone-auth/tasker-sign-up-referral-code.spec.js - Referral code', () => {
  before(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 24 - New tasker sign up an account with referral code, after first time deposit check promotion account and notification of Tasker', async () => { //skip
    if (device.getPlatform() === 'android') {
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'Tasker 01');
      await typeToTextField('txtIdNumber', '01234567892');
      await typeToTextField('txtMobilePhone', '0834567891');
      var data = await initData('user/getReferralCode', { phoneNumber: '0834567890' });
      await typeToTextField('txtSignUpPromotionCode', data.referralCode);
      await tapId('btnChooseSevice');
      await waitForElement('Dọn dẹp nhà', 1000, 'text');
      await tapText('Dọn dẹp nhà');
      await tapId('btnChooseDistrict');
      await waitForElement('Hồ Chí Minh', 1000, 'text');
      await tapText('Hồ Chí Minh');
      await waitForElement('Quận 1', 1000, 'text');
      await tapText('Quận 1');
      await tapText('Quận 7');
      await tapId('btnFinishRegister');
      await waitForElement('KÍCH HOẠT TÀI KHOẢN', 1000, 'text');
      const code = ['1', '2', '3', '4', '5', '6'];
      await fillFirebaseCode(code);
      await waitForLoading(3000);
      await initData('user/updateUser', [{Phone: '0834567891', Status: 'ACTIVE'}]);
      await waitForElement('bTaskee', 2000, 'text');
      await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 5000, 'text');
      await tapText('OK');
      await tapId('btnMenu');
      await tapText('Quà tặng bTaskee');
      data = await initData('user/getReferralCode', { phoneNumber: '0834567891' });
      await expectIdToHaveText('txtreferralCode', data.referralCode);
      await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 200000, promotionAccount: 0 });
      await waitForElement('Bạn nhận được 50000 VND từ mã giới thiệu.', 1000, 'text');
      await tapText('Xem');
      await waitForElement('THÔNG TIN TÀI CHÍNH', 1000, 'text');
      await expectIdToHaveText('txtMainAccount', '200,000 ₫');
      await expectIdToHaveText('txtProAccount', '50,000 ₫');
      await expectIdToHaveText('txtTotalAccount', '250,000 ₫');
    }
  });
})

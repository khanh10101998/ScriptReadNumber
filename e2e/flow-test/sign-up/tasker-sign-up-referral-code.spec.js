const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  fillActiveCode,
  loginWithPhoneAndPassword, waitForLoading
} = require('../../step-definitions');
const moment = require('moment');

describe('FILE: flow-test/sign-up/tasker-sign-up-referral-code.spec.js - Referral code', () => {
  before(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 22 - New tasker sign up an account with referral code, after first time deposit check promotion account and notification of Tasker', async () => { //Tasker đăng ký tài khoản mới với mã giới thệu, kiểm tra tài khoản và thông báo.
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
    await fillActiveCode('0834567891');
    await initData('user/updateUser', [{Phone: '0834567891', Status: 'ACTIVE'}]);
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await waitForElement('bTaskee', 1000, 'text');
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
  });

  it('LINE 61 - Configurate taskerReferralValue promotion in settingSystem. The expired date is coming', async () => { //Đặt chưong trình khuyến mãi, sắp đến ngày hết hạn.
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    const expiredDate = moment().add(1, 'months');
    await initData('settings/changeSettingSystem', {
      referralValue: 50000,
      taskerReferralValue : {
        inviter : 100000, // Người giới thiệu
        invitee : 40000, // Người được giới thiệu
        expiredDate : expiredDate.toDate()
      }
    });
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 200000, promotionAccount: 0 });
    await tapId('btnMenu');
    await tapText('Quà tặng bTaskee');
    let data = await initData('user/getReferralCode', { phoneNumber: '0834567891' });
    await expectIdToHaveText('txtreferralCode', data.referralCode);
    await waitForElement('Bạn nhận được 100,000 VND và bạn của bạn nhận 40,000 VND trong tài khoản khuyến mãi.', 1000, 'text');
  });

  it('LINE 86 - Configurate taskerReferralValue promotion in settingSystem. The expired date is over', async () => { //Đặt chưong trình khuyến mãi, đã hết hạn.
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    const expiredDate = moment().subtract(1, 'months');
    await initData('settings/changeSettingSystem', {
      referralValue: 100000,
      taskerReferralValue : {
        inviter : 100000, // Người giới thiệu
        invitee : 40000, // Người được giới thiệu
        expiredDate : expiredDate.toDate()
      }
    });
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 200000, promotionAccount: 0 });
    await tapId('btnMenu');
    await tapText('Quà tặng bTaskee');
    let data = await initData('user/getReferralCode', { phoneNumber: '0834567891' });
    await expectIdToHaveText('txtreferralCode', data.referralCode);
    await waitForLoading(3000);
    await waitForElement('Bạn nhận được 100,000 VND và bạn của bạn nhận 100,000 VND trong tài khoản khuyến mãi.', 1000, 'text');
  });

  it('LINE 110 - Configurate taskerReferralValue promotion in settingSystem and user has referralValue. The expired date is coming', async () => { //Người dùng được giới thiệu, sắp đến ngày hết hạn.
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', referralValue: 150000}
    ]);
    const expiredDate = moment().add(1, 'months');
    await initData('settings/changeSettingSystem', {
      referralValue: 80000,
      taskerReferralValue : {
        inviter : 150000, // Người giới thiệu
        invitee : 70000, // Người được giới thiệu
        expiredDate : expiredDate.toDate()
      }
    });
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 200000, promotionAccount: 0 });
    await tapId('btnMenu');
    await tapText('Quà tặng bTaskee');
    let data = await initData('user/getReferralCode', { phoneNumber: '0834567891' });
    await expectIdToHaveText('txtreferralCode', data.referralCode);
    await waitForElement('Bạn nhận được 150,000 VND và bạn của bạn nhận 70,000 VND trong tài khoản khuyến mãi.', 1000, 'text');
  });

  it('LINE 136 - Configurate taskerReferralValue promotion in settingSystem and user has the referralValue. The expired date is over', async () => { //Người dùng được giới thiệu, đã hết hạn.
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'TASKER0', Type: 'TASKER', Status: 'ACTIVE', referralValue: 300000 },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', referralValue: 70000}
    ]);
    const expiredDate = moment().subtract(1, 'months');
    await initData('settings/changeSettingSystem', {
      referralValue: 50000,
      taskerReferralValue : {
        inviter : 100000, // Người giới thiệu
        invitee : 40000, // Người được giới thiệu
        expiredDate : expiredDate.toDate()
      }
    });
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 200000, promotionAccount: 0 });
    await tapId('btnMenu');
    await tapText('Quà tặng bTaskee');
    let data = await initData('user/getReferralCode', { phoneNumber: '0834567891' });
    await expectIdToHaveText('txtreferralCode', data.referralCode);
    await waitForElement('Bạn nhận được 70,000 VND và bạn của bạn nhận 50,000 VND trong tài khoản khuyến mãi.', 1000, 'text');
  });
})

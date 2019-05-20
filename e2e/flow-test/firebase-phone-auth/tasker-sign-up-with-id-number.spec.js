const {
  initData,
  expectElementVisible,
  tapId,
  tapText,
  waitForElement,
  typeToTextField,
  fillFirebaseCode,
  clearTextInput,
} = require('../../step-definitions');

describe.skip('FILE: flow-test/firebase-phone-auth/tasker-sign-up-with-id-number.spec.js - Tasker sign up with id number', () => {
  beforeEach(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('user/createUser', [
      { Phone: '0838833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', IdNumber: '122334455667' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 23 - New user sign up an account with id number', async () => { //skip
    if (device.getPlatform() === 'android') {
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'AnhPD');
      await typeToTextField('txtIdNumber', '1223');
      await typeToTextField('txtMobilePhone', '0834567892');
      await tapId('btnChooseSevice');
      await expectElementVisible('Số CMND không hợp lệ', 'text');
      await tapText('Đóng');
      await clearTextInput('txtIdNumber');
      await typeToTextField('txtIdNumber', '122334455667');
      await tapId('btnChooseSevice');
      await expectElementVisible('Đã có người sử dụng số CMND này đăng ký tài khoản trước đó.', 'text');
      await tapText('OK');
      await clearTextInput('txtIdNumber');
      await typeToTextField('txtIdNumber', '122334455666');
      await tapId('btnChooseSevice')
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
      await waitForElement('bTaskee', 2000, 'text');
      // Do not show dialog Not enough money
      await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567892', mainAccount: 0, promotionAccount: 100000 });
    }
  });
})

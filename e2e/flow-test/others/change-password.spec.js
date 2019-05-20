const {
  initData,
  loginWithPhoneAndPassword,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible, tapIdAtIndex,
} = require('../../step-definitions');

describe('FILE: flow-test/others/change-password.spec.js - Change password', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 19 - Change Password Success', async () => { //Tasker thay đỗi password thành công.
    await loginWithPhoneAndPassword('0834567890', '123456');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await tapText('Đổi mật khẩu');
    await waitForElement('ĐỔI MẬT KHẨU', 1000, 'text');
    await typeToTextField('txtPasswordOld', '123456');
    await typeToTextField('txtPasswordNew', '123abc');
    await typeToTextField('txtPasswordConfirm', '123abc');
    await tapText('HOÀN TẤT');
    await waitForElement('Đổi mật khẩu thành công. Vui lòng đăng nhập lại!', 1000, 'text');
    await tapText('Đóng');
    await expectElementVisible('Dành cho cộng tác viên bTaskee', 'text');
  });

  it('LINE 34 - Change Password incorrect old password', async () => { //Tasker đỗi pasword với nhập sai password cũ.
    await loginWithPhoneAndPassword('0834567890', '123456');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await tapText('Đổi mật khẩu');
    await waitForElement('ĐỔI MẬT KHẨU', 1000, 'text');
    await typeToTextField('txtPasswordOld', '12345678');
    await typeToTextField('txtPasswordNew', '123abc');
    await typeToTextField('txtPasswordConfirm', '123abc');
    await tapText('HOÀN TẤT');
    await waitForElement('Mật khẩu hiện tại không đúng', 1000, 'text');
    await tapText('Đóng');
  });

  it('LINE 48 - Change Password incorrect confirm password', async () => { //Tasker thay đỗi password với confirm password không đúng.
    await loginWithPhoneAndPassword('0834567890', '123456');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await tapText('Đổi mật khẩu');
    await waitForElement('ĐỔI MẬT KHẨU', 1000, 'text');
    await typeToTextField('txtPasswordOld', '12345678');
    await typeToTextField('txtPasswordNew', '123abc');
    await typeToTextField('txtPasswordConfirm', '123def');
    await tapText('HOÀN TẤT');
    await waitForElement('Mật khẩu nhập lại không đúng', 1000, 'text');
    await tapText('Đóng');
    await tapIdAtIndex('btnBack');
    await tapText('Đăng xuất');
  });
})

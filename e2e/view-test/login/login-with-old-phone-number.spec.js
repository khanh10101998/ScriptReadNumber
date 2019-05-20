const {
  initData,
  loginWithPhoneAndPassword,
  tapText,
  clearTextInput,
  typeToTextField,
  tapId,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: view-test/login/login-with-old-phone-number.spec.js - Tasker login with old phone number', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0771234567', Name: 'Tasker 1', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0761234567', Name: 'Tasker 2', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 20 - Login with old phone number 0122 - 077', async () => { //Tasker login với đầu số điện thoại cũ.
    await loginWithPhoneAndPassword('01221234567', '123456');
    await waitForElement('Số điện thoại của bạn đã được tự động cập nhật thành 0771234567 theo qui định của Bộ Thông tin và Truyền thông. Bạn phải đăng nhập với số điện thoại mới để tiếp tục sử dụng bTaskee.', 1000, 'text');
    await tapText('Đóng');
    await clearTextInput('TestPhone');
    await typeToTextField('TestPhone', '0771234567');
    await tapId('TestLogin');
    await waitForElement('bTaskee', 1000, 'text');
  });

  it('LINE 30 - Login with old phone number 0126 - 076', async () => { //Tasker login với đầu số điện thoại cũ.
    await loginWithPhoneAndPassword('01261234567', '123456');
    await waitForElement('Số điện thoại của bạn đã được tự động cập nhật thành 0761234567 theo qui định của Bộ Thông tin và Truyền thông. Bạn phải đăng nhập với số điện thoại mới để tiếp tục sử dụng bTaskee.', 1000, 'text');
    await tapText('Đóng');
    await clearTextInput('TestPhone');
    await typeToTextField('TestPhone', '0761234567');
    await tapId('TestLogin');
    await waitForElement('bTaskee', 1000, 'text');
  });

  it('LINE 40 - Login with old phone number: wrong number', async () => { //Tasker login sđt không đúng.
    await loginWithPhoneAndPassword('01281234567', '123456');
    await waitForElement('Tài khoản không tồn tại', 1000, 'text');
    await tapText('Đóng');
  });
})

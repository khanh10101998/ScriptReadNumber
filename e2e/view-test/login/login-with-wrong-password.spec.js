const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapText,
} = require('../../step-definitions');

describe('FILE: view-test/login/login-with-wrong-password.spec.js - Tasker login with wrong password', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 16 - Check dialog when user login with wrong password', async () => { //Hiện dialog khi nhập password sai.
    await loginWithPhoneAndPassword('0834567890', 'abcdef');
    await expectElementVisible('Số điện thoại hoặc mật khẩu không đúng', 'text');
    await expectElementVisible('Thử lại', 'text');
    await expectElementVisible('Quên mật khẩu', 'text');
    await tapText('Quên mật khẩu');
    await expectElementVisible('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 'text');
  });
})

const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: flow-test/sign-up/tasker-sign-up-exist-phone-number.spec.js - Exist phone number', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 17 - New user sign up an account but the phone number is existing', async () => { //Tasker đăng ký sđt đã tồn tại.
    await tapId('btnRegister');
    await waitForElement('ĐĂNG KÝ TÀI KHOẢN', 1000, 'text');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtMobilePhone', '0834567890');
    await tapId('btnChooseSevice');
    await waitForElement('Số điện thoại đã được sử dụng', 1000, 'text');
    await tapText('Đóng');
  });
})

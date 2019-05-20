const {
  initData,
  tapText,
  waitForElement,
  typeToTextField,
  fillActiveCode,
  clearTextInput,
} = require('../../step-definitions');

describe('FILE: flow-test/forgot-password/forgot-password-with-old-phone-number.spec.js - Tasker forgot password with old phone number', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0771234567', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0761234567', Name: 'Tasker 02', Type: 'TASKER', Status: 'INACTIVE' },
      { Phone: '0781234567', Name: 'Tasker 03', Type: 'TASKER', Status: 'UNVERIFIED' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 20 - ACTIVE Tasker forgot password', async () => { //Tasker quên password, nhập sai sđt khi lấy lại password.
    await tapText('Bạn quên mật khẩu?');
    await waitForElement('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 2000, 'text');
    await typeToTextField('txtPhoneNumber', '01221234567');
    await waitForElement('Số điện thoại không đúng', 1000, 'text');
    await clearTextInput('txtPhoneNumber');
    await typeToTextField('txtPhoneNumber', '0771234567');
    await tapText('GỬI LẠI MẬT KHẨU');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('Đồng ý');
    await fillActiveCode('0771234567');
    await waitForElement('bTaskee', 2000, 'text');
  });

  it('LINE 34 - INACTIVE Tasker forgot password', async () => { //Tasker quên password.
    await tapText('Bạn quên mật khẩu?');
    await waitForElement('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 1000, 'text');
    await typeToTextField('txtPhoneNumber', '01261234567');
    await waitForElement('Số điện thoại không đúng', 1000, 'text');
    await clearTextInput('txtPhoneNumber');
    await typeToTextField('txtPhoneNumber', '0761234567');
    await tapText('GỬI LẠI MẬT KHẨU');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('Đồng ý');
    await fillActiveCode('0761234567');
    await waitForElement('bTaskee', 2000, 'text');
  });

  it('LINE 48 - UNVERIFIED Tasker forgot password', async () => { //Nhập sai sđt khi lấy lại password.
    await tapText('Bạn quên mật khẩu?');
    await waitForElement('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 1000, 'text');
    await typeToTextField('txtPhoneNumber', '01281234567');
    await waitForElement('Số điện thoại không đúng', 1000, 'text');
    await clearTextInput('txtPhoneNumber');
    await typeToTextField('txtPhoneNumber', '0781234567');
    await tapText('GỬI LẠI MẬT KHẨU');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('Đồng ý');
    await fillActiveCode('0781234567');
    await waitForElement('bTaskee', 2000, 'text');
  });
})

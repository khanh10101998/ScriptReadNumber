const {
  initData,
  tapText,
  waitForElement,
  typeToTextField,
  fillActiveCode,
} = require('../../step-definitions');

describe('FILE: flow-test/forgot-password/forgot-password.spec.js - Tasker forgot password test cases', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'INACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 03', Type: 'TASKER', Status: 'UNVERIFIED' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 19 - ACTIVE Tasker forgot password', async () => { //Tasker quên password khi đang trạng thái ACTIVE
    await tapText('Bạn quên mật khẩu?');
    await waitForElement('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 2000, 'text');
    await typeToTextField('txtPhoneNumber', '0834567891');
    await tapText('GỬI LẠI MẬT KHẨU');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('Đồng ý');
    await fillActiveCode('0834567891');
    await waitForElement('bTaskee', 2000, 'text');
  });

  it('LINE 30 - INACTIVE Tasker forgot password', async () => { //Tasker quên password khi đang trạng thái INACTIVE
    await tapText('Bạn quên mật khẩu?');
    await waitForElement('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 1000, 'text');
    await typeToTextField('txtPhoneNumber', '0834567892');
    await tapText('GỬI LẠI MẬT KHẨU');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('Đồng ý');
    await fillActiveCode('0834567892');
    await waitForElement('bTaskee', 2000, 'text');
  });

  it('LINE 41 - UNVERIFIED Tasker forgot password', async () => { //Tasker quên password khi đang trạng thái UNVERFIED
    await tapText('Bạn quên mật khẩu?');
    await waitForElement('Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn', 1000, 'text');
    await typeToTextField('txtPhoneNumber', '0834567893');
    await tapText('GỬI LẠI MẬT KHẨU');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('Đồng ý');
    await fillActiveCode('0834567893');
    await waitForElement('bTaskee', 2000, 'text');
  });
})

const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  fillActiveCode,
} = require('../../step-definitions');

describe('FILE: flow-test/sign-up/tasker-sign-up-inactive-tasker.spec.js - INACTIVE Tasker', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'INACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 18 - New user sign up an account, input phone number is existing INACTIVE TASKER', async () => { //Tasker đăng ký tài khoản nhưng chưa được active.
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtMobilePhone', '0834567890');
    await tapId('btnChooseSevice');
    await waitForElement('Tài khoản chưa được kích hoạt. Kích hoạt ngay hoặc liên hệ với chúng tôi để được hỗ trợ', 1000, 'text');
    await tapText('Kích hoạt');
    await waitForElement('Mã kích hoạt đã được gửi tới số điện thoại của bạn.', 1000, 'text');
    await tapText('OK');
    await fillActiveCode('0834567890');
    await waitForElement('bTaskee', 1000, 'text');
  });
})

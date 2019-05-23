const {
    initData,
    loginWithPhoneAndPassword,
    typeToTextField,
    tapId,
    tapText,
    waitForElement,
    expectElementVisible, tapIdAtIndex, clearTextInput
  } = require('../../step-definitions');
  
  describe('FILE: view-text/profile/check-profile-items.spec.js - profile', () => {
    beforeEach(async () => {
      await initData('user/createUser', [
        { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      ]);
      await device.reloadReactNative();
    });

      it('LINE 19 - Test view profile items', async () => { //Kiểm tra những item trong thông tin người dùng.
        await loginWithPhoneAndPassword('0834567890', '123456');
        await tapId('btnMenu');
        await tapId('btnProfile');
        await expectElementVisible('profileName')
        await expectElementVisible('profilePhone')
        await expectElementVisible('Mã QR','text')
        await expectElementVisible('Thay đổi thông tin cá nhân','text')
        await expectElementVisible('Đổi mật khẩu','text')
        await expectElementVisible('Dịch vụ cung cấp','text')
        await expectElementVisible('Nơi làm việc','text')
        await expectElementVisible('Cài đặt','text')
        await expectElementVisible('Khởi động lại ứng dụng','text')
        await expectElementVisible('Đăng xuất','text')
       
      });
  })
  

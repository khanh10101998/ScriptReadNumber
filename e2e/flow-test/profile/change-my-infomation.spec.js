
const {
    initData,
    loginWithPhoneAndPassword,
    typeToTextField,
    tapId,
    tapText,
    waitForElement,
    expectElementVisible, tapIdAtIndex, clearTextInput
  } = require('../../step-definitions');
  
  describe('FILE: flow-test/others/change-password.spec.js - Change password', () => {
    beforeEach(async () => {
      await initData('user/createUser', [
        { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      ]);
      await device.reloadReactNative();
    });

      it('LINE 20 - Test change my infomation', async () => { //Tasker  thay đỗi thông tin cá nhân.
        await loginWithPhoneAndPassword('0834567890', '123456');
        await tapId('btnMenu');
        await tapId('btnProfile');
        await tapText('Thay đổi thông tin cá nhân');
        await waitForElement('THÔNG TIN CÁ NHÂN', 1000, 'text');
        await typeToTextField('txtEmailChangeProfile', 'khanh');
        await typeToTextField('txtIntroductionChangeProfile', 'Nguyen hong Khanh ne haha');
        await tapText('LƯU');
        await expectElementVisible('Email không đúng định dạng','text')
        await clearTextInput('txtEmailChangeProfile')
        await typeToTextField('txtEmailChangeProfile', 'khanh@gmail.com');
        await clearTextInput('txtIntroductionChangeProfile')
        await typeToTextField('txtIntroductionChangeProfile', 'khanh nguyen');
        await tapText('LƯU');
        await waitForElement('Lưu thành công', 1000, 'text');
        await tapText('Đóng');
        await tapIdAtIndex('btnBack');
        await tapId('btnProfile');
        await tapText('Thay đổi thông tin cá nhân');
        await expectElementVisible('khanh@gmail.com','text')
        await expectElementVisible('khanh nguyen','text')
      });
  })
  
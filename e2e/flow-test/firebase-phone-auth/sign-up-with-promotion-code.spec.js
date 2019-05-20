const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  fillFirebaseCode,
  swipe
} = require('../../step-definitions');
const expect = require('chai').expect;

describe.skip('FILE: flow-test/firebase-phone-auth/sign-up-with-promotion-code.spec.js - Promotion code', () => { 
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 21 - New tasker sign up with promotion code', async () => { //skip
    if (device.getPlatform() === 'android') {
      await initData('promotion/createPromotionCode', [
        { Code: 'abc345', Value: 50000, Target: 'TASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
      ]);
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'Tasker 01');
      await typeToTextField('txtMobilePhone', '0834567891');
      await typeToTextField('txtIdNumber', '01234567892');
      await typeToTextField('txtSignUpPromotionCode', 'abc345');
      await tapId('btnChooseSevice');
      await waitForElement('Dọn dẹp nhà', 1000, 'text');
      await tapText('Dọn dẹp nhà');
      await tapId('btnChooseDistrict');
      await waitForElement('Hồ Chí Minh', 1000, 'text');
      await tapText('Hồ Chí Minh');
      await waitForElement('Quận 1', 1000, 'text');
      await tapText('Quận 1');
      await tapText('Quận 7');
      await tapId('btnFinishRegister');
      const code = ['1', '2', '3', '4', '5', '6'];
      await fillFirebaseCode(code);
      await waitForElement('bTaskee', 2000, 'text');
      await initData('user/updateUser', [{Phone: '0834567891', Status: 'ACTIVE'}]);
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await tapText('Thông tin tài chính');
      await expectIdToHaveText('txtMainAccount', '0 ₫');
      await expectIdToHaveText('txtProAccount', '50,000 ₫');
      const data = await initData('user/findTaskerTransaction', [
        { PhoneNumber: '0834567891', AccountType: 'P', Type: 'D', Amount: 50000 },
      ]);
      expect(data.data).to.not.be.null;
    }
  });
})

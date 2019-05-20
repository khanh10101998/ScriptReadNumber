const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  clearTextInput,
} = require('../../step-definitions');

describe.skip('FILE: flow-test/firebase-phone-auth/tasker-sign-up-invalid-promotion-code.spec.js - invalid promotion code', () => {
  beforeEach(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: 50000, Target: 'TASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
      { Code: 'abc124', Value: 50000, Target: 'TASKER', TypeOfPromotion: 'CURRENT', TypeOfValue: 'MONEY', Limit: 100 },
      { Code: 'abc125', Value: 50000, Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
      { Code: 'abc126', Value: 50000, Target: 'TASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 1 },
      { Code: 'abc127', Value: 50000, Target: 'TASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'PERCENTAGE', Limit: 100 },
    ]);
    await initData('promotion/usersAppliedPromotion', { phoneNumber: '0834567890', promotionCode: 'abc126' });
    await device.reloadReactNative();
  });

  it('LINE 30 - New tasker sign up with invalid promotion code', async () => { //skip
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtMobilePhone', '0834567891');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtSignUpPromotionCode', 'abc124');
    await tapId('btnChooseSevice');
    await expectElementVisible('Mã khuyến mãi không hợp lệ', 'text');
    await tapText('Đóng');
    await clearTextInput('txtSignUpPromotionCode');
    await typeToTextField('txtSignUpPromotionCode', 'abc125');
    await tapId('btnChooseSevice');
    await expectElementVisible('Mã khuyến mãi không hợp lệ', 'text');
    await tapText('Đóng');
    await clearTextInput('txtSignUpPromotionCode');
    await typeToTextField('txtSignUpPromotionCode', 'abc126');
    await tapId('btnChooseSevice');
    await expectElementVisible('Mã khuyến mãi đã hết hạn', 'text');
    await tapText('Đóng');
    await clearTextInput('txtSignUpPromotionCode');
    await typeToTextField('txtSignUpPromotionCode', 'abc127');
    await tapId('btnChooseSevice');
    await expectElementVisible('Mã khuyến mãi không hợp lệ', 'text');
    await tapText('Đóng');
    await clearTextInput('txtSignUpPromotionCode');
    await typeToTextField('txtSignUpPromotionCode', 'abc123');
    await tapId('btnChooseSevice');
    await waitForElement('btnChooseWorkingPlace', 1000);
  });
})

const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  fillActiveCode,
} = require('../../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/home-cooking/sign-up/tasker-sign-up-promotion-code.spec.js - Promotion code', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 20 - New tasker sign up with promotion code', async () => { //Tasker đăng ký tài khoản với mã khuyến mãi.
    await initData('promotion/createPromotionCode', [
      { Code: 'abc234', Value: 50000, Target: 'TASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
    ]);
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtMobilePhone', '0834567891');
    await typeToTextField('txtIdNumber', '01234567892');
    await typeToTextField('txtSignUpPromotionCode', 'abc234');
    await tapId('btnChooseSevice');
    await waitForElement('Nấu ăn', 1000, 'text');
    await tapText('Nấu ăn');
    await tapId('btnChooseDistrict');
    await waitForElement('Hồ Chí Minh', 1000, 'text');
    await tapText('Hồ Chí Minh');
    await waitForElement('Quận 1', 1000, 'text');
    await tapText('Quận 1');
    await tapText('Quận 7');
    await tapId('btnFinishRegister');
    await waitForElement('KÍCH HOẠT TÀI KHOẢN', 1000, 'text');
    await fillActiveCode('0834567891');
    await waitForElement('bTaskee', 1000, 'text');
    await initData('user/updateUser', [{Phone: '0834567891', Status: 'ACTIVE'}]);
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '50,000 ₫');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'D', Amount: 50000 },
    ]);
    expect(data.data).to.not.be.null;
  });
})

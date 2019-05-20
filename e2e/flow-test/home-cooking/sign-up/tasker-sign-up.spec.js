const {
  initData,
  typeToTextField,
  tapId,
  tapIdAtIndex,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotExist,
  fillActiveCode,
} = require('../../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/home-cooking/sign-up/tasker-sign-up.spec.js - Tasker sign up', () => {
  beforeEach(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('resetData', {});
    await device.reloadReactNative();
  });

  it('LINE 24 - New user sign up an account, choose service and active account', async () => { //Tasker đăng ký và kích hoạt tài khoản mới.
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567892');
    await typeToTextField('txtMobilePhone', '0834567890');
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
    await fillActiveCode('0834567890');
    await waitForElement('bTaskee', 2000, 'text');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567890', AccountType: 'P', Type: 'D', Amount: 100000 },
    ]);
    expect(data.data).to.be.null;
  });

  it('LINE 48 - New user sign up an account, choose service and active account but input wrong activation code', async () => { //Tasker đăng ký tài khoản nhưng mã kích hoạt không đúng.
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtMobilePhone', '0834567890');
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
    await waitForElement('KÍCH HOẠT TÀI KHOẢN', 2000, 'text');
    await typeToTextField('txtActivationCode1', '1');
    await typeToTextField('txtActivationCode2', '1');
    await typeToTextField('txtActivationCode3', '1');
    await typeToTextField('txtActivationCode4', '1');
    await expectElementVisible('Mã kích hoạt không đúng, xin thử lại', 'text');
    await tapText('Đóng');
  });

  it('LINE 72 - New user sign up an account, not choose service', async () => { //Tasker đăng ký tài khoản mới nhưng không chọn dịch vụ.
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtMobilePhone', '0834567890');
    await tapId('btnChooseSevice');
    await tapId('btnChooseDistrict');
    await expectIdToHaveText('buttonDisable', 'CHỌN CÁC KHU VỰC LÀM VIỆC');
  });

  it('LINE 85 - Service is INACTIVE I can not see it', async () => { //Tasker đăng ký tài khoản mới, dịch vụ nấu ăn được kích hoạt.
    await initData('service/changeServiceStatus', { service: 'Nấu ăn', status: 'INACTIVE' });
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtMobilePhone', '0834567890');
    await tapId('btnChooseSevice');
    await expectElementNotExist('Nấu ăn', 'text');
    await initData('service/changeServiceStatus', { service: 'Nấu ăn', status: 'ACTIVE' });
    await tapIdAtIndex('btnBack');
    await tapId('btnChooseSevice');
    await waitForElement('Nấu ăn', 1000, 'text');
  });
})

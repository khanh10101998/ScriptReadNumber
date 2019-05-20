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
  fillFirebaseCode,
  waitForLoading,
} = require('../../step-definitions');
const expect = require('chai').expect;

describe.skip('FILE: flow-test/firebase-phone-auth/tasker-sign-up.spec.js - Tasker sign up', () => {
  beforeEach(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('resetData', {});
    await device.reloadReactNative();
  });

  it('LINE 25 - New user sign up an account, choose service and active account', async () => { //skip
    if (device.getPlatform() === 'android') {
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'Tasker 01');
      await typeToTextField('txtIdNumber', '01234567892');
      await typeToTextField('txtMobilePhone', '0834567890');
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
      await waitForElement('KÍCH HOẠT TÀI KHOẢN', 1000, 'text');
      const code = ['1', '2', '3', '4', '5', '6'];
      await fillFirebaseCode(code);
      await waitForElement('bTaskee', 2000, 'text');
      const data = await initData('user/findTaskerTransaction', [
        { PhoneNumber: '0834567890', AccountType: 'P', Type: 'D', Amount: 100000 },
      ]);
      expect(data.data).to.be.null;
    }
  });

  it('LINE 52 - New user sign up an account, choose service and active account but input wrong activation code', async () => { //Skip
    if (device.getPlatform() === 'android') {
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'Tasker 01');
      await typeToTextField('txtIdNumber', '01234567891');
      await typeToTextField('txtMobilePhone', '0834567890');
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
      await waitForElement('KÍCH HOẠT TÀI KHOẢN', 2000, 'text');
      await typeToTextField('txtActivationCode1', '1');
      await typeToTextField('txtActivationCode2', '1');
      await typeToTextField('txtActivationCode3', '1');
      await typeToTextField('txtActivationCode4', '1');
      await typeToTextField('txtActivationCode5', '1');
      await typeToTextField('txtActivationCode6', '1');
      await waitForLoading(2000);
      await expectElementVisible('Mã kích hoạt không đúng. Vui lòng nhập lại mã kích hoạt.', 'text');
      await tapText('Đóng');
    }
  });

  it('LINE 81 - New user sign up an account, not choose service', async () => { //Skip
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

  it('LINE 94 - Service is INACTIVE I can not see it', async () => { //Skip
    await initData('service/changeServiceStatus', { service: 'Dọn dẹp nhà', status: 'INACTIVE' });
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567891');
    await typeToTextField('txtMobilePhone', '0834567890');
    await tapId('btnChooseSevice');
    await expectElementNotExist('Dọn dẹp nhà', 'text');
    await initData('service/changeServiceStatus', { service: 'Dọn dẹp nhà', status: 'ACTIVE' });
    await tapIdAtIndex('btnBack');
    await tapId('btnChooseSevice');
    await waitForElement('Dọn dẹp nhà', 1000, 'text');
  });

  it('LINE 108 - A user signs up with the backup activation code', async () => { //Skip
    if (device.getPlatform() === 'android') {
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'Tasker 01');
      await typeToTextField('txtIdNumber', '01234567891');
      await typeToTextField('txtMobilePhone', '0834567890');
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
      await waitForElement('KÍCH HOẠT TÀI KHOẢN', 2000, 'text');
      const data = await initData('userActivation/getBackupCode', { phone: '0834567890' });
      await fillFirebaseCode(data.code);
      await waitForElement('bTaskee', 2000, 'text');
    }
  });
})

const {
  initData,
  typeToTextField,
  tapId,
  tapIdAtIndex,
  tapText,
  waitForElement,
  expectElementVisible,
  fillActiveCode,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/sign-up/laundry/tasker-sign-up-laundry-service.spec.js - Tasker sign up laundry service', () => {
  beforeEach(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('resetData', {});
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 50000, Weight: 10 },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 25 - New Tasker sign up with Laundry service', async () => { //Tasker đăng ký tài khoản chọn dịch vụ giặt ủi.
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567892');
    await typeToTextField('txtMobilePhone', '0834567890');
    await tapId('btnChooseSevice');
    await scrollTo('servicesScroll', 'bottom');
    await waitForElement('Giặt ủi', 1000, 'text');
    await tapText('Giặt ủi');
    await tapId('btnChooseDistrict');
    await waitForElement('Hồ Chí Minh', 1000, 'text');
    await tapText('Hồ Chí Minh');
    await waitForElement('Quận 1', 1000, 'text');
    await tapText('Quận 1');
    await tapText('Quận 3');
    await tapText('Quận 7');
    await tapId('btnFinishRegister');
    await waitForElement('KÍCH HOẠT TÀI KHOẢN', 1000, 'text');
    await fillActiveCode('0834567890');
    await waitForElement('bTaskee', 2000, 'text');
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567890', Promotion: '200000' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567890', Status: 'ACTIVE' },
    ]);
    await tapId('btnMenu');
    await tapText('Xem thông tin tài khoản');
    await tapText('Dịch vụ cung cấp');
    await waitForElement('Giặt ủi', 1000, 'text');
    await tapIdAtIndex('btnBack');
    await tapText('Nơi làm việc');
    await waitForElement('Quận 1', 1000, 'text');
    await expectElementVisible('Quận 3', 'text');
    await expectElementVisible('Quận 7', 'text');
  });
})

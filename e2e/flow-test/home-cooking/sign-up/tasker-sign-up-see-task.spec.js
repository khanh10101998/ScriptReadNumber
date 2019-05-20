const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  fillActiveCode,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/sign-up/tasker-sign-up-see-task.spec.js - See task', () => {
  before(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 21 - Tasker sign up, account is verified, a Task is posted, see that Task on home page', async () => { //Tasker đăng ký tài khoản và tài khoản được active, thấy được công việc mới.
    await tapId('btnRegister');
    await typeToTextField('txtYourName', 'Tasker 01');
    await typeToTextField('txtIdNumber', '01234567892');
    await typeToTextField('txtMobilePhone', '0834567891');
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
    await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 0, promotionAccount: 100000 });
    await initData('user/updateUser', [
      { Phone: '0834567891', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01', Status: 'POSTED' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 01', TaskerPhone: '0834567891' },
    ]);
    await waitForElement('labelDescriptionNau an 01', 1000);
  });
})

const {
  initData,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  fillFirebaseCode,
} = require('../../step-definitions');

describe.skip('FILE: flow-test/firebase-phone-auth/tasker-sign-up-see-task.spec.js - See task', () => {
  before(async () => {
    try {
      await tapText('Huỷ bỏ và tạo tài khoản mới');
    } catch (e) {}
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 21 - Tasker sign up, account is verified, a Task is posted, see that Task on home page', async () => { //skip
    if (device.getPlatform() === 'android') {
      await tapId('btnRegister');
      await typeToTextField('txtYourName', 'Tasker 01');
      await typeToTextField('txtIdNumber', '01234567892');
      await typeToTextField('txtMobilePhone', '0834567891');
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
      await initData('fatransaction/taskerDepositFromBackend', { phoneNumber: '0834567891', mainAccount: 0, promotionAccount: 100000 });
      await initData('user/updateUser', [
        { Phone: '0834567891', Status: 'ACTIVE' },
      ]);
      await initData('task/createTask', [
        { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', Status: 'POSTED' },
      ]);
      await initData('task/updateViewedTasker', [
        { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      ]);
      await waitForElement('labelDescriptionDon dep nha 01', 1000);
    }
  });
})

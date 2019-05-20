const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  scrollTo,
  expectElementNotVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-can-not-see-task.spec.js - Company can not see task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892', AcceptPermission: true },
    ]});
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 01', TaskerPhone: '0834567892' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567892', '123456');
  });

  it('LINE 32 - Employee accepted task, Company can not see this task.', async () => { //Nhận việc cho nhân viên trong khi nhân viễn đã nhận việc này.
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementNotVisible('Don dep nha 01');
    await tapText('VIỆC MỚI');
    await tapId('Don dep nha 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('labelEmployeeTasker');
    await expectElementVisible('Phân công việc này cho nhân viên Tasker', 'text');
    await tapText('Đồng ý');
    await expectElementVisible('Nhân viên của bạn đã nhận, bạn không phân công được.', 'text');
    await tapText('Đóng');
  });
})

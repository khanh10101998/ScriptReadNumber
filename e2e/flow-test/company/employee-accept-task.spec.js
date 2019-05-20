const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/company/employee-accept-task.spec.js - Employee accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 04' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 05' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
    ]});
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 01', TaskerPhone: '0834567892' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567892', '123456');
  });

  it('LINE 37 - Employee accept task by him/her self', async () => { //Nhân viên cua công ty nhận 1 việc.
    await tapId('Don dep nha 01');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementVisible('Bạn không thể nhận công việc này. Liên hệ với công ty của bạn để được phân công.', 'text');
    await tapText('Đóng');
    await expectElementVisible('Chưa có ai nhận việc', 'text');
  });

  it('LINE 47 - Employee accept task by him/her self before and after removed from company', async () => { //Nhân viên nhận việc sau khi remove khỏi công ty.
    await tapId('Don dep nha 01');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementVisible('Bạn không thể nhận công việc này. Liên hệ với công ty của bạn để được phân công.', 'text');
    await tapText('Đóng');
    await initData('user/removeEmployeeFromCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
    ]});
    await tapId('btnAcceptTask');
    await tapId('Don dep nha 01');
    await expectIdToHaveText('labelStatus', 'Bạn đã nhận công việc này');
  });
})

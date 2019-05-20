const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-accept-task-limit-day.spec.js - Company accept task limit day', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567894', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01', Date: 'tomorrow', Time: '8,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02', Date: 'tomorrow', Time: '11,00' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 03', Date: 'tomorrow', Time: '14,00' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
      { Phone: '0834567893' },
      { Phone: '0834567894' },
    ]});
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 03', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 03', TaskerPhone: '0834567892' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 42 - Company assign task with limit number in day', async () => { //Công ty nhận việc cho nhân viên nhiều hơn 2 việc một ngày.
    await expectIdToHaveText('labelTaskTimeDon dep nha 03', 'Ngày mai lúc 14:00');
    await tapId('Don dep nha 03');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('labelEmployeeTasker 01');
    await expectElementVisible('Phân công việc này cho nhân viên Tasker 01', 'text');
    await tapText('Đồng ý');
    await expectElementVisible('Nhân viên của bạn đã có 2 việc vào ngày này, bạn có chắc muốn phân công tiếp ?', 'text');
    await tapText('Bỏ qua');
    await tapText('VIỆC MỚI');
    await tapId('Don dep nha 03');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('labelEmployeeTasker 01');
    await tapText('Đồng ý');
    await tapText('Nhận việc');
    await waitForElement('bTaskee', 1000, 'text');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Don dep nha 03');
  });
})

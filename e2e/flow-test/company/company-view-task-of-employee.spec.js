const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  expectIdToHaveText,
  swipe,
  sleep
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-view-task-of-employee.spec.js - Company view task of employee', () => {
  before(async () => {
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
      { Phone: '0834567893' },
    ]});
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 01', TaskerPhone: '0834567892' },
    ]);
  });

  it('LINE 39 - Company view tasks of employees', async () => { //Công ty kiểm tra screen chi tiết công việc hi click vào công việc đang chờ xác nhận
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891' },
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567892', Description: 'Don dep nha 02', CompanyPhone: '0834567891' },
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567893', Description: 'Don dep nha 03', CompanyPhone: '0834567891' },
    ]);
    await tapText('CHỜ XÁC NHẬN');
    await expectIdToHaveText('labelDescriptionDon dep nha 01', 'Don dep nha 01');
    await expectIdToHaveText('labelDescriptionDon dep nha 02', 'Don dep nha 02');
    await expectIdToHaveText('labelDescriptionDon dep nha 03', 'Don dep nha 03');
    await tapId('Don dep nha 01');
    await expectIdToHaveText('labelStatus', 'Có 1 người đã nhận việc này');
    await expectIdToHaveText('labelEmployee', 'Nhân viên của bạn: Tasker 01');
    await tapIdAtIndex('btnBack');
    await sleep(1000);
    await swipe('Don dep nha 01', 'up');
    await tapId('Don dep nha 03');
    await sleep(1000);
    await expectIdToHaveText('labelStatus', 'Có 1 người đã nhận việc này');
    await expectIdToHaveText('labelEmployee', 'Nhân viên của bạn: Tasker 02');
  });
})

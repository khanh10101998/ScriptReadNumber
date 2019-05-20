const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: view-test/company/company-see-rating-employee.spec - Company see rating employee', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4, TaskDone: 8 },
      { Phone: '0834567894', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567895', Name: 'Tasker 04', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4, TaskDone: 8 },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01',Status: 'DONE' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 02',Status: 'DONE'  },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 03', Status: 'DONE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567891' },
      { Phone: '0834567892' },
      { Phone: '0834567893' },
      { Phone: '0834567894' },
      { Phone: '0834567895' },
    ]});
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891', Rated: true },
    ]);
    await initData('task/createRating', [
      { Description: 'Don dep nha 01', Rate: 3, Review: 'Good job 1', FeedBack: 'ON_TIME' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 43 - Company see detail employee', async () => { //Công ty xem thông tin chi tiết nhân viên.
    await tapId('btnMenu');
    await tapText('Danh sách nhân viên');
    await expectIdToHaveText('labelEmployeeTasker 01', 'Tasker 01');
    await expectIdToHaveText('labelEmployeePhoneTasker 01', '0834567892');
    await expectIdToHaveText('labelEmployeeTasker 02', 'Tasker 02');
    await expectIdToHaveText('labelEmployeePhoneTasker 02', '0834567893');
    await expectIdToHaveText('labelEmployeeTasker 03', 'Tasker 03');
    await expectIdToHaveText('labelEmployeePhoneTasker 03', '0834567894');
    await expectIdToHaveText('labelEmployeeTasker 04', 'Tasker 04');
    await expectIdToHaveText('labelEmployeePhoneTasker 04', '0834567895');
    await tapId('labelEmployeeTasker 01');
    await waitForElement('Đánh giá: ', 2000, 'text');
    await expectElementVisible('Nhận xét: ', 'text');
    await expectElementVisible('Good job 1', 'text');
  });
})

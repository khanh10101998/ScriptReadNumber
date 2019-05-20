const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectIdToHaveText,
  waitForElement,
  sleep, 
  expectElementVisible,
  scrollTo
} = require('../../step-definitions');
const expect = require('chai').expect; 

describe('FILE: flow-test/company/asker-choose-tasker-employee.spec.js - Asker choose tasker employee', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4, TaskDone: 8 },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 02' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 03' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 04' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 05' },
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

  it('LINE 41 - Asker choose tasker is employee', async () => { //asker chọn nhân viên.
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891' },
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567892', Description: 'Don dep nha 02', CompanyPhone: '0834567891' },
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567893', Description: 'Don dep nha 03', CompanyPhone: '0834567891' },
    ]);
    await tapText('CHỜ XÁC NHẬN');
    await expectIdToHaveText('labelDescriptionDon dep nha 01', 'Don dep nha 01');
    await expectIdToHaveText('labelDescriptionDon dep nha 02', 'Don dep nha 02');
    await expectIdToHaveText('labelDescriptionDon dep nha 03', 'Don dep nha 03');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapText('CHỜ XÁC NHẬN');
    await expectIdToHaveText('labelDescriptionDon dep nha 01', 'Don dep nha 01');
    await expectIdToHaveText('labelDescriptionDon dep nha 02', 'Don dep nha 02');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 02', CompanyPhone: '0834567891' },
    ]);
    await expectIdToHaveText('labelDescriptionDon dep nha 01', 'Don dep nha 01');
    await tapText('XÁC NHẬN');
    await expectIdToHaveText('labelDescriptionDon dep nha 02', 'Don dep nha 02');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await expectIdToHaveText('labelDescriptionDon dep nha 02', 'Don dep nha 02');
    await tapId('Don dep nha 02');
    await expectIdToHaveText('labelStatus', 'Công việc đã có người thực hiện.');
    await expectIdToHaveText('labelEmployee', 'Nhân viên của bạn: Tasker 01');
  });

  it('LINE 77 - Check data acceted tasker after asign task for employee', async () => { //Kiểm tra công việc được chấp nhận trước khi giao nhiệm vụ cho nhân viên.
    await tapId('Don dep nha 01');
    await expectElementVisible('CHI TIẾT CÔNG VIỆC', 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementVisible('CHỌN NHÂN VIÊN', 'text');
    await waitForElement('Tasker 01', 1000,'text');
    await expectElementVisible('Tasker 01', 'text');
    await expectElementVisible('Tasker 02', 'text');
    await tapId('btnEmployeeTasker 01');
    await sleep(1000);
    await tapText('Đồng ý');
    await sleep(1000);
    const data = await initData('task/getTaskByDescription', {description: 'Don dep nha 01'});
    const acceptedTasker = data.acceptedTasker[0];
    expect(acceptedTasker.name).to.equal('Tasker 01');
    expect(acceptedTasker.avgRating).to.equal(4.5);
    expect(acceptedTasker.taskDone).to.equal(10);
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotExist,
  waitForElement,
  tapIdAtIndex,
} = require('../../../step-definitions');

describe('FILE: flow-test/company/laundry/company-assign-laundry-task-to-employee.spec.js - Company accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567894', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567895', Name: 'Tasker 04', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567896', Name: 'Tasker 05', Type: 'TASKER', Status: 'LOCKED' },
      { Phone: '0834567897', Name: 'Tasker 06', Type: 'TASKER', Status: 'LOCKED' },
    ]);
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createLaundryServiceDetail');
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Giặt ủi' },
      { Action: 'Add', Phone: '0834567892', Service: 'Giặt ủi' },
      { Action: 'Add', Phone: '0834567893', Service: 'Giặt ủi' },
      { Action: 'Add', Phone: '0834567894', Service: 'Giặt ủi' },
      { Action: 'Add', Phone: '0834567895', Service: 'Giặt ủi' },
      { Action: 'Add', Phone: '0834567896', Service: 'Giặt ủi' },
      { Action: 'Add', Phone: '0834567897', Service: 'Giặt ủi' },
    ]);
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task1', Status: 'POSTED'},
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task2', Status: 'POSTED'},
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task3', Status: 'POSTED'},
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task4', Status: 'POSTED'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Laundry task1', TaskerPhone: '0834567891' },
      { Description: 'Laundry task2', TaskerPhone: '0834567891' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
      { Phone: '0834567893' },
      { Phone: '0834567894' },
      { Phone: '0834567895' },
      { Phone: '0834567896' },
    ]});
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 59 - Company accept task', async () => { //Công ty nhận việc.
    await tapId('Laundry task1');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('labelEmployeeTasker 04', 'Tasker 04');
    await expectIdToHaveText('labelEmployeeTasker 02', 'Tasker 02');
    await expectIdToHaveText('labelEmployeeTasker 03', 'Tasker 03');
    await expectIdToHaveText('labelEmployeeTasker 01', 'Tasker 01');
    await expectElementNotExist('labelEmployeeTasker 05');
    await tapId('labelEmployeeTasker 01');
    await expectElementVisible('Phân công việc này cho nhân viên Tasker 01', 'text');
    await tapText('Đồng ý');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapText('Chat');
    await expectElementVisible('chatHeader');
    await tapIdAtIndex('btnBack');
    await expectElementVisible('labelServiceDistrictLaundry task1');
  });

  it('LINE 78 - Check employee conflict time', async () => { //Kiểm tra công việc nhân viên có bị trùng.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', CompanyPhone: '0834567891', Description: 'Laundry task1' },
    ]);
    await tapId('Laundry task2');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('labelEmployeeTasker 04', 'Tasker 04');
    await expectIdToHaveText('labelEmployeeTasker 02', 'Tasker 02');
    await expectIdToHaveText('labelEmployeeTasker 03', 'Tasker 03');
    await expectIdToHaveText('labelEmployeeTasker 01', 'Tasker 01');
    await expectElementVisible('Đang nhận 1 CV vào thời điểm này', 'text');
    await tapId('labelEmployeeTasker 01');
    await expectElementVisible('Phân công việc này cho nhân viên Tasker 01', 'text');
    await tapText('Đồng ý');
    await waitForElement('Chat', 500, 'text');
    await tapText('Chat');
  });
})

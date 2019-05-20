const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-accept-air-conditioner-task.spec.js - Company accept Air-Conditioner task', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
      { Phone: '0834567893' },
    ]});
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Vệ sinh máy lạnh', En: 'Air-conditioner Service', Ko: '에어컨 수리', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createACServiceDetail', {});
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567892', Service: 'Vệ sinh máy lạnh' },
      { Action: 'Add', Phone: '0834567893', Service: 'Vệ sinh máy lạnh' },
    ]);
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'May lanh 01', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'May lanh 01', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 41 - Company accept task', async () => { //Công ty nhận việc vệ sinh máy lạnh.
    await tapId('May lanh 01');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('CHỌN NHÂN VIÊN', 1000, 'text');
    await expectIdToHaveText('labelEmployeeTasker 01', 'Tasker 01');
    await expectIdToHaveText('labelEmployeeTasker 02', 'Tasker 02');
    await tapId('labelEmployeeTasker 01');
    await expectElementVisible('Phân công việc này cho nhân viên Tasker 01', 'text');
    await tapText('Đồng ý');
    await waitForElement('bTaskee', 1000, 'text');
    await expectElementVisible('May lanh 01');
  });
})

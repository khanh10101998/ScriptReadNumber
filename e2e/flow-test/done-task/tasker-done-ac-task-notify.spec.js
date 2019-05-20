const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectIdToHaveText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: flow-test/done-task/tasker-done-ac-task-notify.spec.js - Tasker done AC task using credit', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
    ]});
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Vệ sinh máy lạnh', En: 'Air-conditioner Service', Ko: '에어컨 수리', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createACServiceDetail', {});
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567892', Service: 'Vệ sinh máy lạnh' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 30 - Notification COMPANY when increase main account in case pay by CREDIT', async () => { //Công ty nhận được thông báo sau khi hoàn tất công việc (khách thanh toán bằng credit).
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'May lanh 01', PaymentMethod: 'CREDIT', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'May lanh 01', CompanyPhone: '0834567891', Progress: 'DONE' },
    ]);
    await tapText('XÁC NHẬN');
    await waitForElement('btnDoneMay lanh 01', 1000);
    await tapId('btnDoneMay lanh 01');
    await waitForElement('Tài khoản của bạn đã được cộng thêm 100,000 VND', 3500, 'text');
    await tapText('Xem');
    await expectIdToHaveText('txtMainAccount', '100,000 ₫');
    await expectIdToHaveText('txtProAccount', '85,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '185,000 ₫');
  });

  it('LINE 48 - Notification EMPLOYEE when increase main account in case pay by CREDIT', async () => { //Nhân viên nhận được thông báo sau khi hoàn tất công việc (khách thanh toán bằng credit).
    await loginWithPhoneAndPassword('0834567892', '123456');
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'May lanh 01', PaymentMethod: 'CREDIT', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'May lanh 01', CompanyPhone: '0834567891', Progress: 'DONE' },
    ]);
    await tapText('XÁC NHẬN');
    await waitForElement('btnDoneMay lanh 01', 1000);
    await tapId('btnDoneMay lanh 01');
    await waitForElement('Công việc đã thanh toán xong.', 3500, 'text');
    await tapText('Đóng');
  });
})

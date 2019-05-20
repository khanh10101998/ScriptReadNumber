const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  typeToTextField,
  waitForElement,
  expectElementNotVisible,
} = require('../../step-definitions');

describe('FILE: flow-test/company/employee-chat-with-customer.spec.js - Employee chat with customer', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
    ]});
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 28 - Employee chat with customer', async () => { //Nhân viên của công ty chat với khách hàng.
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891', Progress: 'CONFIRMED' },
    ]);
    await tapText('XÁC NHẬN');
    await expectElementVisible('Don dep nha 01', 'text');
    await tapText('Don dep nha 01');
    await tapId('btnChat');
    await typeToTextField('txtChatMessage', 'Hi');
    await tapId('btnSendMessage');
    await waitForElement('Liên hệ lại với người quản lý của bạn', 1000, 'text');
    await tapText('Đóng');
    await expectElementNotVisible('Hi');
  });
})

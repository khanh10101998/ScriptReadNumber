const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotExist,
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-not-enough-money.spec.js - Company not enough money', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892', AcceptPermission: false },
    ]});
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 32 - Company not enough money to accept task', async () => { //Công ty không đủ tiền để nhận việc.
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 20000 },
    ]);
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await tapId('Don dep nha 01');
    await expectIdToHaveText('labelNotEnoughMoney', 'Bạn thiếu 10,000 VND để nhận công việc này, vui lòng nạp thêm.');
    await expectElementVisible('btnSkip');
    await expectElementVisible('btnDepositeMoney');
    await expectElementNotExist('btnAcceptTask');
  });

  it('LINE 45 - Company not enough money to accept task (include acceptedTask)', async () => { //Công ty không đủ tiền để nhận việc, không thể nhận việc.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 02', CompanyPhone: '0834567891' },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Promotion: 20000 },
    ]);
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await tapId('Don dep nha 01');
    await expectIdToHaveText('labelNotEnoughMoney', 'Bạn thiếu 10,000 VND để nhận công việc này, vui lòng nạp thêm.');
    await expectElementVisible('btnDepositeMoney');
  });
})

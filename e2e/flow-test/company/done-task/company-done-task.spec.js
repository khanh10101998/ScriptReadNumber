const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  tapIdAtIndex,
  expectIdToHaveText,
  swipe
} = require('../../../step-definitions');

describe('FILE: flow-test/company/done-task/company-done-task.spec.js - company-done-task.spec.js', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE', level: 1, level: 1 },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833057', Name: 'Employee', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', {
      companyPhone: '0828833055',
      employeePhones: [{Phone: '0828833057'}]
    });
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', AcceptedTasker: '0828833057', CompanyPhone: '0828833055', Status: 'CONFIRMED', Progress: 'DONE'},
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 32 - Company done task and check account, transactions', async () => { //Công ty hoàn thành công việc và kiểm tra tài khoản.
    await tapText('XÁC NHẬN');
    await tapId('btnDoneDon dep nha 01');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '70,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '70,000 ₫');
    await tapIdAtIndex('btnBack');
    await tapText('Thu nhập');
    // await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 200,000 VND');
  });
});

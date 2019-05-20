const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotExist,
  expectElementNotVisible,
  expectElementVisibleAtIndex,
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-accept-task.spec.js - Company accept task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567894', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567895', Name: 'Tasker 04', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567896', Name: 'Tasker 05', Type: 'TASKER', Status: 'LOCKED' },
      { Phone: '0834567897', Name: 'Tasker 06', Type: 'TASKER', Status: 'LOCKED' },
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
      { Phone: '0834567894' },
      { Phone: '0834567895' },
      { Phone: '0834567896' },
    ]});
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
      { Description: 'Don dep nha 01', TaskerPhone: '0834567892' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 47 - Company accept task', async () => { //Công ty nhận việc cho nhân viên.
    await tapId('Don dep nha 01');
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
    await expectElementVisible('Don dep nha 01');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Don dep nha 01');
  });

  it('LINE 64 - Locked Company assign employee', async () => { //Công ty nhận việc khi tài khoản bị khóa.
    await tapId('Don dep nha 01');
    await initData('user/updateUser', [
      { Phone: '0834567891', Status: 'LOCKED' },
    ]);
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementNotExist('labelEmployeeTasker 06');
    await tapId('labelEmployeeTasker 01');
    await expectElementVisible('Phân công việc này cho nhân viên Tasker 01', 'text');
    await tapText('Đồng ý');
    await expectElementVisibleAtIndex('Tài khoản của bạn bị tạm khóa. Bạn không thể nhận những việc mới. Liên hệ chúng tôi để biết thêm chi tiết.', 0, 'text');
    await tapText('Đóng');
  });
})

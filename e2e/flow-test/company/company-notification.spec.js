const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotExist,
  scrollTo,
  waitForElement
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-notification.spec.js Company notification', () => {
  before(async () => {
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
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 33 - Asker choose tasker, send notification to tasker and company tasker', async () => { //Nhận được thông báo có việc mới từ tài khoản của công ty và asker.
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Type: 2, Description: 'Don dep nha 01' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.', 2000, 'text');
    await tapText('Chat');
    await expectElementVisible('Hãy bắt đầu cuộc trò chuyện với tin nhắn của bạn.', 'text');
    await tapIdAtIndex('btnBack');
    await tapText('XÁC NHẬN');
    await tapId('Don dep nha 01');
    await expectIdToHaveText('labelStatus', 'Công việc đã có người thực hiện.');
    await expectIdToHaveText('labelEmployee', 'Nhân viên của bạn: Tasker');
    await tapIdAtIndex('btnBack');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await initData('notify/sendNotification', [
      { Phone: '0834567892', Type: 2, Description: 'Don dep nha 01' },
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    await waitForElement('Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.', 2000, 'text');
    await tapText('Chat');
    await expectElementVisible('Hãy bắt đầu cuộc trò chuyện với tin nhắn của bạn.', 'text');
    await tapIdAtIndex('btnBack');
    await tapText('XÁC NHẬN');
    await tapId('Don dep nha 01');
    await expectIdToHaveText('labelStatus', 'Bạn đã nhận được công việc này. Chúc bạn làm việc tốt!');
    await expectElementNotExist('labelEmployee');
  });
})

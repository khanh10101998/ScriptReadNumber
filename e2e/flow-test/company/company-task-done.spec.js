const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  scrollTo,
  swipe
} = require('../../step-definitions');

describe('FILE: flow-test/company/company-task-done.spec.js - Company task done', () => {
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

  it('LINE 29 - Tasker done task, Check FAccount of company and employee', async () => { //Tasker hoàn thành công việc, kiểm tra tài khoản của công ty và nhân viên của công ty.
    await loginWithPhoneAndPassword('0834567892', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
      { Phone: '0834567892', Level: 1 },
    ]);
    await tapText('XÁC NHẬN');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891', Progress: 'DONE' },
    ]);
    await tapId('btnDoneDon dep nha 01');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');    
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '70,000 ₫');
    await tapIdAtIndex('btnBack');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');    
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thu nhập');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 200,000 VND');
    await expectIdToHaveText('historyName', 'Tasker');
    await expectIdToHaveText('historyIncome', 'Thu nhập 200,000 VND');
    await tapId('btnHistoryItem');
    await expectIdToHaveText('historyService0', 'DỌN DẸP NHÀ');
    await expectIdToHaveText('labelCost0', '200,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
  });

  it('LINE 75 - Asker rate Tasker 3 stars and Company receive the warning', async () => { //Asker đánh giá tasker 3 sao.
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891', Rated: true },
    ]);
    await initData('task/createRating', [
      { Description: 'Don dep nha 01', Rate: 3, Review: 'Good job 1', FeedBack: 'ON_TIME' },
    ]);
    await initData('notify/sendNotification', [
      { Phone: '0834567891', Description: 'Don dep nha 01', Type: 25, Text: 'Nhân viên Employee 01 không hoàn thành tốt công việc và bị đánh giá thấp' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('Nhân viên Employee 01 không hoàn thành tốt công việc và bị đánh giá thấp', 'text');
    await tapText('Đóng');
  });
})

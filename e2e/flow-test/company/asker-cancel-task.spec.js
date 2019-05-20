const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  expectElementNotExist,
  tapIdAtIndex,
  waitForLoading,
  scrollTo, swipe
} = require('../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/company/asker-cancel-task.spec.js - Asker cancel task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
    ]});
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 02' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'Don dep nha 01', CompanyPhone: '0834567891' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567893', Description: 'Don dep nha 02' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567892', '123456');
  });

  it('LINE 38 - Asker cancel the confirmed task accepted by company with Tasker request - Before 1 hour when task is started with reason tasker not come', async () => { //Asker hủy công việc với lý do tasker không đến.
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await initData('task/askerCancelTask', [
      { Description: 'Don dep nha 01', Reason: 'TASKER_NOT_COME', Company: true },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForLoading(4000);
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await tapText('Đóng');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '-200,000 ₫');
  });

  it('LINE 67 - Asker cancel the confirmed task accepted by company with Tasker request - Within 1 hour when task is started', async () => {
    await initData('task/updateTask', [
      { Progress: 'BEFORE_WORKING_50M', Description: 'Don dep nha 01' },
    ]);
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('task/askerCancelTask', [
      { Description: 'Don dep nha 01', Reason: 'TASKER_NOT_COME_WITH_ANNOUCEMENT', Company: true },
    ]);
    const data = await initData('notify/isNotificationExist', [
      { userPhone: '0834567891', type: 25, taskNote: 'Don dep nha 01' },
    ]);
    expect(data.data).to.be.true;
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await tapText('Đóng');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '-200,000 ₫');
  });

  it('LINE 102 - Asker cancel the confirmed task accepted by company and task has been started', async () => { //Asker hủy công việc khi công việc đã bắt đầu.
    await initData('task/updateTask', [
      { Progress: 'AFTER_WORKING', Description: 'Don dep nha 01' },
    ]);
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('task/askerCancelTask', [
      { Description: 'Don dep nha 01', Reason: 'TASKER_NOT_COME', Company: true },
    ]);
    var data = await initData('notify/isNotificationExist', [
      { userPhone: '0834567891', type: 25, taskNote: 'Don dep nha 01' },
    ]);
    expect(data.data).to.be.true;
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await tapText('Đóng');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '-200,000 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567892', '123456');
    data = await initData('notify/isNotificationExist', [
      { userPhone: '0834567892', type: 25, taskNote: 'Don dep nha 01' },
    ]);
    expect(data.data).to.be.false;
  });

  it('LINE 148 - Asker cancel the confirmed task accepted by Tasker before join company and task has been started', async () => {
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
      { Phone: '0834567893' },
    ]});
    await initData('task/updateTask', [
      { Progress: 'AFTER_WORKING', Description: 'Don dep nha 02' },
    ]);
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567891', '123456');
    var data = await initData('notify/isNotificationExist', [
      { userPhone: '0834567891', type: 25, taskNote: 'Don dep nha 02' },
    ]);
    expect(data.data).to.be.false;
    await expectElementNotExist('Tài khoản của bạn bị trừ 200,000 VND vì lý do: không tới làm', 'text');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    await loginWithPhoneAndPassword('0834567893', '123456');
    await initData('task/askerCancelTask', [
      { Description: 'Don dep nha 02', Reason: 'TASKER_NOT_COME', Company: true },
    ]);
    data = await initData('notify/isNotificationExist', [
      { userPhone: '0834567893', type: 25, taskNote: 'Don dep nha 02' },
    ]);
    expect(data.data).to.be.true;
    await waitForElement('Số tiền trong tài khoản của bạn còn quá ít, vui lòng nạp thêm', 3500, 'text');
    await tapText('OK');
    await tapText('Đóng');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '-200,000 ₫');
  });
})

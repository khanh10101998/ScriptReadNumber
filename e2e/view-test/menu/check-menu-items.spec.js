const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  waitForElement,
  expectElementVisible,
  swipe,
  expectElementNotExist,
} = require('../../step-definitions');

describe('FILE: view-test/menu/check-menu-items.spec.js - Check menu UI', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 20 - Only show Things To Know menu item if serviceChannel of user is Cleaning', async () => { //chỉ hiện mục những điều cần biết khi tasker đăng ký dịch vụ dọn dẹp.
    await initData('serviceChannel/updateServiceChannel', [
      { Service:'Dọn dẹp nhà', Phone: '0834567890', Action: 'Remove' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await expectElementNotExist('Những điều cần biết', 'text');
  });

  it('LINE 30 - Check menu items', async () => { //Kiểm tra những item trong menu.
    await initData('serviceChannel/updateServiceChannel', [
      { Service:'Dọn dẹp nhà', Phone: '0834567890', Action: 'Add' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await expectElementVisible('Lịch làm việc', 'text');
    await expectElementVisible('Xem thông tin tài khoản', 'text');
    await expectElementVisible('Cộng đồng', 'text');
    await expectElementVisible('Thông báo từ bTaskee', 'text');
    await waitForElement('Quà tặng bTaskee', 1000, 'text');
    await expectElementVisible('Thông tin tài chính', 'text');
    await swipe('scrollViewMenu', 'up');
    await expectElementVisible('Thu nhập', 'text');
    await expectElementVisible('Hướng dẫn nạp tiền', 'text');
    await expectElementVisible('Tổng kết hàng tuần', 'text');
    await expectElementVisible('Những điều cần biết', 'text');
    await expectElementVisible('Hỗ trợ', 'text');
    await expectElementVisible('Phiên bản 1.1.2-dev - Build 1080', 'text');
  });

  it('LINE 52 - Hide menu cancel task history', async () => { //Ẩn lịch sử hủy việc ở menu.
    await loginWithPhoneAndPassword('0834567890', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await expectElementNotExist('Lịch sử huỷ công việc', 'text');
  });

  it('LINE 59 - Show menu cancel task history', async () => {//Hiện lịch sử hủy việc ở menu.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Status: 'CANCELED' },
    ]);
    await initData('cancelTaskHistory/createCancelTaskHistory', [
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 01', From: 'ASKER_APP', Reason: 'TASKER_NOT_COME_WITH_ANNOUCEMENT' },
      ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await expectElementVisible('Lịch sử huỷ công việc', 'text');
  });

  it('LINE 72 - Hide menu job calendar if serviceChannel of user is Laudry ', async () => { //Ẩn lịch làm việc nếu taker dùng dịch vụ giặt ủi.
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await expectElementNotExist('Lịch làm việc', 'text');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  waitForElement,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: view-test/services/see-services-when-inactive.spec - See service when tesing', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createLaundryServiceDetail');
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Giặt ủi' },
    ]);
    await initData('service/updateService', {service: 'Giặt ủi', data: {status: 'INACTIVE', isTesting: false}});
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task', Status: 'POSTED'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Laundry task', TaskerPhone: '0834567891' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 34 - See new service when status INACTIVE and not Testing', async () => { //Tasker thấy công việc giặt ủi mới khi trạng thái công việc là INATIVE và không kiểm tra.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('labelServiceDistrictLaundry task', 5000);
    await expectIdToHaveText('labelServiceDistrictLaundry task', ' - QUẬN 7');
  });
})

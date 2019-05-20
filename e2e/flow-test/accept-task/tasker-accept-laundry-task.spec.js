const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  waitForElement,
  tapIdAtIndex,
  tapAtPoint, 
  sleep,
  waitForLoading
} = require('../../step-definitions');
const moment = require('moment');

describe('FILE: flow-test/accept-task/tasker-accept-laundry-task.spec.js - Tasker want to see and accept laundry task', () => {
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
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 36 - Tasker accept Laundry task', async () => { //Tasker nhận việc giặt ủi.
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task1', Status: 'POSTED'},
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task2', Status: 'POSTED'},
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task3', Status: 'POSTED'},
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task4', Status: 'POSTED'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Laundry task1', TaskerPhone: '0834567891' },
      { Description: 'Laundry task2', TaskerPhone: '0834567891' },
    ]);
    await waitForElement('labelServiceDistrictLaundry task1', 1000);
    await expectIdToHaveText('labelServiceDistrictLaundry task1', 'GIẶT ỦI - QUẬN 7');
    await tapId('labelServiceDistrictLaundry task1');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapText('Chat');
    await expectElementVisible('chatHeader');
    await tapIdAtIndex('btnBack');
    await expectElementVisible('labelServiceDistrictLaundry task1');
  });

  it('LINE 59 - Tasker accept task, received clothers ', async () => { //Tasker kiểm tra đồ đã nhận.
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task1', Status: 'POSTED'},
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Laundry task1', CollectionDate: moment().toDate() },
    ]);
    await tapText('CHỜ NHẬN');
    await expectIdToHaveText('labelServiceDistrictLaundry task1', 'GIẶT ỦI - QUẬN 7');
    await tapId('labelServiceDistrictLaundry task1');
    await tapId('btnCollectClothes');
    await expectElementVisible('KIỂM TRA VÀ XÁC NHẬN ĐỒ', 'text');
    await tapId('checkBox3 kg');
    await tapId('checkBoxBộ áo dài');
    await tapId('checkBoxQuần thể thao');
    await tapId('checkBoxChăn dạ');
    await tapId('checkBoxOther text');
    await tapId('btnConfirmedLaundry');
    await expectElementVisible('labelServiceDistrictLaundry task1');
    await tapId('labelServiceDistrictLaundry task1');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', IsReceived: true, AcceptedTasker: '0834567891', Description: 'Laundry task1', date: moment().toDate() },
    ]);
    await waitForLoading(500);
    await expectElementVisible('btnDeliverClothes');
  });

  it('LINE 86 - Tasker delivery clothers ', async () => { //Tasker trả lại đồ.
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task1', Status: 'POSTED'},
    ]);
    await initData('settings/changeSettingSystem', {
      numOfTaskToRating: 20,
    });
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', IsReceived: true, AcceptedTasker: '0834567891', Description: 'Laundry task1', Progress: 'IN_PROGRESS', CollectionDate: moment().subtract(1, 'h') },
    ]);
    await sleep(1000);
    await tapText('CHỜ TRẢ');
    await expectIdToHaveText('labelServiceDistrictLaundry task1', 'GIẶT ỦI - QUẬN 7');
    await tapId('labelServiceDistrictLaundry task1');
    await tapId('btnDeliverClothes');
    await expectElementVisible('Đánh giá khách hàng', 'text');
    await tapAtPoint('modalRating', 0, -25);
  });

  it('LINE 108 - check reactive when Asker change clothers ', async () => { //khách hàng thêm đồ trong khi tasker đang nhận đồ tại màn hình kiểm tra và nhận đồ.
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task1', Status: 'POSTED'},
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Laundry task1', CollectionDate: moment().toDate() },
    ]);
    await tapText('CHỜ NHẬN');
    await expectIdToHaveText('labelServiceDistrictLaundry task1', 'GIẶT ỦI - QUẬN 7');
    await tapId('labelServiceDistrictLaundry task1');
    await tapId('btnCollectClothes');
    await expectElementVisible('KIỂM TRA VÀ XÁC NHẬN ĐỒ', 'text');
    await tapId('checkBox3 kg');
    await tapId('checkBoxBộ áo dài');
    await tapId('checkBoxQuần thể thao');
    await tapId('checkBoxChăn dạ');
    await tapId('checkBoxOther text');
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Laundry task1', DetailLaundry: {
         add: {
           dryClean:[
             {name: 'Áo da', quantity: 1},
             {name: 'Áo len', quantity: 1},
             {name: 'Áo lông', quantity: 1},
           ]
       },
     }},
    ]);
    await waitForElement('Áo da', 3000, 'text');
    await expectElementVisible('checkBoxÁo len');
    await expectElementVisible('checkBoxÁo lông');
    await tapId('checkBoxÁo da');
    await tapId('checkBoxÁo len');
    await tapId('checkBoxÁo lông');
    await tapId('btnConfirmedLaundry');
    await tapId('labelServiceDistrictLaundry task1');
  });

  it('LINE 146 - Tasker accept Laundry task with promotion', async () => { //Tasker nhận việc với mã khuyến mãi.
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567890', Description: 'Laundry task1', Status: 'POSTED'},
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: '50000', Target: 'ASKER', TypeOfPromotion: 'CURRENT', TypeOfValue: 'MONEY', Limit: '100' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Laundry task1', PromotionCode: 'abc123' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Laundry task1', TaskerPhone: '0834567891' },
      { Description: 'Laundry task2', TaskerPhone: '0834567891' },
    ]);
    await waitForElement('labelServiceDistrictLaundry task1', 1000);
    await expectIdToHaveText('labelServiceDistrictLaundry task1', 'GIẶT ỦI - QUẬN 7');
    await expectIdToHaveText('labelPromotionLaundry task1', '50,000 VND');
    await expectIdToHaveText('labelAddToPromotionLaundry task1', '+50,000 VND vào tài khoản khuyến mãi');
  });
})

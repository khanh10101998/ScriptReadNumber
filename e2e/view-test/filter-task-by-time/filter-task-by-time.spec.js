const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  tapText,
  swipe,
  scroll,
  expectElementNotExist,
  waitForLoading,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: view-test/filter-task-by-time/filter-task-by-time.spec.js - Tasker see task when filter by time', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', ChooseTasker: 'manual', Date: 'tomorrow', Time: '10,11' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 02', ChooseTasker: 'auto' , Date: 'tomorrow', Time: '11,8'},
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 03', ChooseTasker: 'manual' , Date: 'tomorrow', Time: '13,14'},
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 04', ChooseTasker: 'auto' , Date: 'tomorrow', Time: '14,15'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 03', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 04', TaskerPhone: '0834567890' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567890', '123456');
  });

  it('LINE 37 - Tasker click filter', async () => { //Tasker lọc công việc.
    await expectElementVisible('Don dep nha 01', 'text');
    await swipe('listViewnewTask', 'up');
    await expectElementVisible('Don dep nha 02', 'text');
    await waitForLoading(1000);
    await tapId('btnFilter');
    await tapText('Mới đăng');
    await waitForLoading(500);
    await expectElementVisible('Don dep nha 04', 'text');
    await swipe('listViewnewTask', 'up');
    await waitForElement('Don dep nha 01', 1000,'text');
  });

  it("LINE 50 - Tasker click filter the tasks by Tasker's working places", async () => { //Tasker lọc các khu vực đã đăng ký.
    await initData('user/updateUser', [
      { Phone: '0834567890', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 05', Date: 'tomorrow', TaskPlace: 'VN;Hồ Chí Minh;Quận 4', Time: '15,16' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 06', Date: 'tomorrow', TaskPlace: 'VN;Hồ Chí Minh;Quận 5', Time: '16,17' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 05', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 06', TaskerPhone: '0834567890' },
    ]);
    const scrollPixel = device.getPlatform() === 'ios' ? 450 : 450;
    await expectElementVisible('labelDescriptionDon dep nha 01');
    await expectElementVisible('labelDescriptionDon dep nha 02');
    await scroll('listViewnewTask', scrollPixel, 'down');
    await expectElementVisible('labelDescriptionDon dep nha 03');
    await expectElementVisible('labelDescriptionDon dep nha 04');
    await swipe('listViewnewTask', 'up');
    await expectElementVisible('labelDescriptionDon dep nha 05');
    await expectElementVisible('labelDescriptionDon dep nha 06');
    await waitForLoading(1500);
    await tapId('btnFilter');
    await expectElementVisible('Chỉ hiện công việc trong khu vực đã đăng ký', 'text');
    await tapId('cbFilterArea');
    await waitForLoading(1500);
    await expectElementVisible('labelDescriptionDon dep nha 01');
    await expectElementVisible('labelDescriptionDon dep nha 02');
    await swipe('listViewnewTask', 'up');
    await expectElementVisible('labelDescriptionDon dep nha 03');
    await expectElementVisible('labelDescriptionDon dep nha 04');
    await waitForLoading(1500);
    await tapId('btnFilter');
    await tapId('cbFilterArea');
    await waitForLoading(1500);
    await expectElementVisible('labelDescriptionDon dep nha 01');
    await expectElementVisible('labelDescriptionDon dep nha 02');
    await scroll('listViewnewTask', 450, 'down');
    await waitForLoading(1500);
    await expectElementVisible('labelDescriptionDon dep nha 03');
    await expectElementVisible('labelDescriptionDon dep nha 04');
    if (device.getPlatform() === 'ios') {
      await swipe('listViewnewTask', 'up');
    } else {
      await scroll('listViewnewTask', 450, 'down');
    }
    await expectElementVisible('labelDescriptionDon dep nha 05');
    await expectElementVisible('labelDescriptionDon dep nha 06');
  });

  it("LINE 100 - Tasker have WAITING_ASKER_CONFIRMATION task and CONFIRMED task. Tasker click filter the tasks by Tasker's working places", async () => { //Tasker đợi asker chấp nhận và hoàn thành công việc.
    await initData('user/updateUser', [
      { Phone: '0834567890', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
      { Phone: '0834567892', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 5' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 05', TaskPlace: 'VN;Hồ Chí Minh;Quận 5', Date: 'tomorrow', Time: '15,20' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 06', TaskPlace: 'VN;Hồ Chí Minh;Quận 5', Date: 'tomorrow', Time: '15,50' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 07', TaskPlace: 'VN;Hồ Chí Minh;Quận 5', Date: 'tomorrow', Time: '16,00' }
    ]);
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567890', Description: 'Don dep nha 05' },
      { Status: 'CONFIRMED', AcceptedTasker: '0834567890', Description: 'Don dep nha 06' },
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567892', Description: 'Don dep nha 07' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 07', TaskerPhone: '0834567890' },
    ]);
    await expectElementVisible('labelDescriptionDon dep nha 01');
    await expectElementVisible('labelDescriptionDon dep nha 02');
    if (device.getPlatform() === 'ios') {
      await swipe('listViewnewTask', 'up');
    } else {
      await scroll('listViewnewTask', 700, 'down');
    }
    await waitForLoading(1500);
    await expectElementVisible('labelDescriptionDon dep nha 03');
    await expectElementVisible('labelDescriptionDon dep nha 04');
    await expectElementVisible('labelDescriptionDon dep nha 07');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('labelDescriptionDon dep nha 05');
    await tapText('XÁC NHẬN');
    await expectElementVisible('labelDescriptionDon dep nha 06');
    await tapText('VIỆC MỚI');
    await waitForLoading(1500);
    await tapId('btnFilter');
    await tapId('cbFilterArea');
    await waitForLoading(1000);
    await expectElementVisible('labelDescriptionDon dep nha 01');
    await expectElementVisible('labelDescriptionDon dep nha 02');
    await swipe('listViewnewTask', 'up');
    await waitForLoading(1500);
    await expectElementVisible('labelDescriptionDon dep nha 03');
    await expectElementVisible('labelDescriptionDon dep nha 04');
    await expectElementNotExist('labelDescriptionDon dep nha 07');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('labelDescriptionDon dep nha 05');
    await tapText('XÁC NHẬN');
    await expectElementVisible('labelDescriptionDon dep nha 06');
  });
})

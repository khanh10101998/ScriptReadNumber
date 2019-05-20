const {
  initData,
  loginWithPhoneAndPassword,
  expectElementNotExist,
  expectIdToHaveText,
  tapId,
  tapText,
  tapHeaderBack,
  waitForElement,
  waitForLoading,
  tapIdAtIndex
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/not-show-tasks-same-datetime.spec.js - Does not show the task that have the same datetime with the confirmed task', () => { //Tasker không thấy công việc khác cùng khoản thời gian công việc đã nhận
  before(async () => {
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Vệ sinh máy lạnh', En: 'Air-conditioner Service', Ko: '에어컨 수리', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createACServiceDetail');
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20, WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 01', ChooseTasker: 'auto' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 02' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 03' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Task 04', NextDate: 2 },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 01', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 03', TaskerPhone: '0834567891' },
      { Description: 'Task 04', TaskerPhone: '0834567891' },
    ]);
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'AC 01', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 43 - Does not show the tasks that have the same datetime with the confirmed task', async () => {
    await expectIdToHaveText('labelDescriptionTask 01', 'Task 01');
    await expectIdToHaveText('labelDescriptionTask 02', 'Task 02');
    await expectIdToHaveText('labelDescriptionTask 03', 'Task 03');
    await expectIdToHaveText('labelDescriptionTask 04', 'Task 04');
    await expectElementNotExist('labelDescriptionAC 01');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('Chat');
    await tapIdAtIndex('btnBack');
    await tapText('VIỆC MỚI');
    await expectElementNotExist('labelDescriptionTask 02');
    await expectElementNotExist('labelDescriptionTask 03');
    await expectIdToHaveText('labelDescriptionTask 04', 'Task 04');
    await expectElementNotExist('labelDescriptionAC 01');
    await tapText('XÁC NHẬN');
    await tapId('Task 01');
    await tapText("XIN HỦY VIỆC");
    await waitForElement('Lưu ý xin hủy việc', 1000, 'text');
    await tapText('Xin hủy việc này');
    await tapText('Lỡ nhận công việc quá xa.');
    await waitForElement('Xác nhận hủy công việc', 1000, 'text');
    await tapText('Xin hủy việc này');
    await tapText('Đóng');
    await waitForLoading(4000);
    await tapText('Xem');
    await tapHeaderBack('notificationDetailContainer');
    await tapText('VIỆC MỚI');
    await expectElementNotExist('labelDescriptionTask 01');
    await expectIdToHaveText('labelDescriptionTask 02', 'Task 02');
    await expectIdToHaveText('labelDescriptionTask 03', 'Task 03');
    await expectIdToHaveText('labelDescriptionTask 04', 'Task 04');
    await expectElementNotExist('labelDescriptionAC 01');
  });
})

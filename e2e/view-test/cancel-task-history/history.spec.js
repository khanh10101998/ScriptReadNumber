const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  swipe,
  waitForElement,
  expectIdToHaveText,
  scroll
} = require('../../step-definitions');

describe('FILE: view-test/cancel-task-history/history.spec.js - Check deposite', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 02', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 03', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 04', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 05', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 06', Status: 'CANCELED' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 03', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 04', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 05', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 06', TaskerPhone: '0834567890' },
    ]);
    await initData('cancelTaskHistory/createCancelTaskHistory', [
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 01', From: 'ASKER_APP', Reason: 'TASKER_NOT_COME_WITH_ANNOUCEMENT' },
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 02', From: 'TASKER_APP', Reason: 'TASKER_NOT_COME' },
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 03', From: 'BACKEND', Reason: 'WRONG_DATE' },
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 04', From: 'TASKER_APP', Reason: 'SO_FAR_AWAY' },
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 05', From: 'TASKER_APP', Reason: 'OTHER_REASON' },
      { Phone: '0834567890', ServiceName: 'Dọn dẹp nhà', Description: 'Don dep nha 06', From: 'TASKER_APP', Reason: 'OTHER_REASON', TextDetail: 'Con bi om' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567890', '123456');
  });

  it('LINE 46 - See cancel task history', async () => { //Kiểm tra màn hình ở lịch sử hủy việc.
    await waitForElement("bTaskee", 1000, 'text');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Lịch sử huỷ công việc');
    await waitForElement("LỊCH SỬ HUỶ CÔNG VIỆC", 1000, 'text');
    await expectIdToHaveText('txtTitle0', 'DỌN DẸP NHÀ - QUẬN 7');
    await expectIdToHaveText('txtCancelBy0', 'Bạn');
    await expectIdToHaveText('txtReason0', 'Con bi om');
    await expectIdToHaveText('txtTitle1', 'DỌN DẸP NHÀ - QUẬN 7');
    await expectIdToHaveText('txtCancelBy1', 'Bạn');
    await expectIdToHaveText('txtReason1', 'Sự cố bất khả kháng không thể đi làm.');
    await scroll('lstCancelTask', 200,'down');
    await expectIdToHaveText('txtTitle2', 'DỌN DẸP NHÀ - QUẬN 7');
    await expectIdToHaveText('txtCancelBy2', 'Bạn');
    await expectIdToHaveText('txtReason2', 'Lỡ nhận công việc quá xa.');
    await expectIdToHaveText('txtTitle3', 'DỌN DẸP NHÀ - QUẬN 7');
    await expectIdToHaveText('txtCancelBy3', 'Hệ thống');
    await expectIdToHaveText('txtReason3', 'Xem nhầm ngày không đi làm được.');
    await scroll('lstCancelTask', 500,'down');
    await expectIdToHaveText('txtTitle4', 'DỌN DẸP NHÀ - QUẬN 7');
    await expectIdToHaveText('txtCancelBy4', 'Bạn');
    await expectIdToHaveText('txtReason4', 'Tự ý không đi làm');
    await expectIdToHaveText('txtTitle5', 'DỌN DẸP NHÀ - QUẬN 7');
    await expectIdToHaveText('txtCancelBy5', 'Khách hàng');
    await expectIdToHaveText('txtReason5', 'Có báo không đi làm được');
  });
})

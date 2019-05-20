const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotVisible,
  swipe
} = require('../../step-definitions');

describe('FILE: view-test/worked-for-asker/see-task.spec.js - Tasker see task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker 01', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Asker 02', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Asker 03', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567894', Name: 'Asker 04', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567895', Name: 'Asker 05', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      dataAnalysisTask: {inMonth: 2, numberOfTaskInMonth: 5}
    });
    await device.reloadReactNative();
  });

  it('LINE 26 - Tasker see task with worked for asker and often cleaning', async () => { //Tasker thấy công việc đã làm cho asker
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Date: 'tomorrow', Status: 'DONE' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567892', Description: 'Don dep nha 02', Date: 'tomorrow', Status: 'DONE' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567892', Description: 'Don dep nha 03', Date: 'tomorrow', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567893', Description: 'Don dep nha 04', Date: 'tomorrow', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567894', Description: 'Don dep nha 05', Date: 'tomorrow', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567895', Description: 'Don dep nha 06', Date: 'tomorrow', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567895', Description: 'Don dep nha 07', Date: 'tomorrow', Status: 'DONE' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 01', Rated: true },
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 02', Rated: true },
      { Description: 'Don dep nha 05', IsRegularCleaning: true },
      { Description: 'Don dep nha 06', IsRegularCleaning: true },
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 07', Rated: true },
    ]);
    await initData('task/createRating', [
      { Description: 'Don dep nha 01', Rate: 5, Review: 'abc', FeedBack: 'ON_TIME;CHEERFUL;CLEAN' },
      { Description: 'Don dep nha 02', Review:  'Good job 2', Rate:  5   },
      { Description: 'Don dep nha 07', Review:  'Good job 3', Rate:  5   },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 03', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 04', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 05', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 06', TaskerPhone: '0834567890' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await expectElementVisible('bTaskee', 'text');
    await expectIdToHaveText('txtWorkedForAskerDon dep nha 03', 'Đã từng làm cho người này');
    await expectElementNotVisible('txtOftenClearningDon dep nha 30', 'id');
    await expectElementNotVisible('txtWorkedForAskerDon dep nha 04', 'Đã từng làm cho người này');
    await expectElementNotVisible('txtOftenClearningDon dep nha 04', 'Khách quen (nhà dọn dẹp thường xuyên)');
    await swipe('listViewnewTask', 'up');
    await expectElementNotVisible('txtWorkedForAskerDon dep nha 05', 'Đã từng làm cho người này');
    await expectIdToHaveText('txtOftenClearningDon dep nha 05', 'Khách quen (nhà dọn dẹp thường xuyên)');
    await expectIdToHaveText('txtWorkedForAskerDon dep nha 06', 'Đã từng làm cho người này');
    await expectIdToHaveText('txtOftenClearningDon dep nha 06', 'Khách quen (nhà dọn dẹp thường xuyên)');
  });
})

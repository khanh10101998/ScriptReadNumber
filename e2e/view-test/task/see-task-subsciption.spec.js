const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
} = require('../../step-definitions');
const moment = require('moment');

describe('FILE: view-test/task/see-task-subsciption.spec.js - Tasker see task subscription', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE'},
      { Phone: '0834567891', Name: 'Asker 01', Type: 'ASKER', Status: 'ACTIVE'},
      { Phone: '0834567892', Name: 'Asker 02', Type: 'ASKER', Status: 'ACTIVE'},
      { Phone: '0834567893', Name: 'Asker 03', Type: 'ASKER', Status: 'ACTIVE'},

    ]);
    await device.reloadReactNative();
  });

  it('LINE 23 - Tasker see subscription', async () => { //Tasker thấy công việc đã đăng ký.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567892', Description: 'Don dep nha 02', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567893', Description: 'Don dep nha 03', Status: 'POSTED' },
    ]);
    await initData('subscription/createSubscription', [
      {Description: 'Subscription 01', TaskDescription: 'Don dep nha 01', TaskerPhone: '0834567890', AskerPhone: '0834567891', WeekDay: [1,2]},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 02', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 03', TaskerPhone: '0834567890' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 01', SubscriptionDescription: 'Subscription 01' },
      { Description: 'Don dep nha 02', SubscriptionDescription: 'Subscription 01' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapText('XÁC NHẬN');
    await tapId('Don dep nha 01');
    await waitForElement('txtStartDateSubscription', 3000, 'id');
    const subs = await initData('subscription/getSubscription', {Description: 'Subscription 01'});
    await expectIdToHaveText('txtStartDateSubscription', moment(subs.data.schedule[0]).format('DD/MM/YYYY'));
    await expectIdToHaveText('txtEndDateSubscription', moment(subs.data.schedule[subs.data.schedule.length - 1]).format('DD/MM/YYYY'));
    await expectIdToHaveText('txtWeekdaySubscription', 'T2, T3');
  });
})

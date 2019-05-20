const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementNotExist,
  waitForLoading,
  scrollTo,
} = require('../../step-definitions');

describe('FILE: flow-test/deep-cleaning/tasker-rates-asker.spec.js - Tasker rates Asker', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', Score: 9 },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE', Score: 8 },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfTaskToRating: 20,
    });
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 26 - Tasker which has the TaskDone < 20, she can not rate asker', async () => { //Tasker không thể đánh giá app khi công việc hoàn thành dưới 20
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 19 },
      { Phone: '0834567892', TaskDone: 19 },
    ]);
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0834567891,0834567892', Description: 'Don dep nha 01', TaskerRated: 'false', isLeader: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    await waitForLoading(1000);
    await expectElementNotExist('modalRating');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementNotExist('modalRating', 1000);
    await expectElementNotExist('modalRating');
  });
})

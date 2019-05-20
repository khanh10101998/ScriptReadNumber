const {
  initData,
  loginWithPhoneAndPassword,
  expectElementNotExist,
} = require('../../step-definitions');

describe('FILE: flow-test/rating/tasker-rate-asker.spec.js - Level 2 Tasker rate asker after done task', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', level: 1 },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfTaskToRating: 20,
    });
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0828833055', TaskDone: 20 },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 26 - Tasker level up to 2 and can not rate before tasks', async () => { //Tasker level 2 không thể đánh giá khách hàng.
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', AcceptedTasker: '0828833055', Status: 'CONFIRMED', Progress: 'DONE', TaskerRated: true},
    ]);
    await expectElementNotExist('Đánh giá khách hàng', 'text');
    await expectElementNotExist('askerAvatar', 'id');
    await expectElementNotExist('Asker', 'text');
  });
})

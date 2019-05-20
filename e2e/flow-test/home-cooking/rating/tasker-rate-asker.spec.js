const {
  initData,
  loginWithPhoneAndPassword,
  expectElementNotExist, expectElementVisible, tapText, swipe
} = require('../../../step-definitions');

describe('FILE: flow-test/rating/tasker-rate-asker.spec.js -Tasker complete more than 20 task can rate', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', level: 1 },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfTaskToRating: 20,
    });
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nau an 01' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0828833055', TaskDone: 20 },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 26 - Tasker complete more than 20 task can rate', async () => { //Tasker hoàn thành hơn 20 công việc thì có thể đánh giá khách hàng.
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0828833055', Description: 'Nau an 01', TaskerRated: 'false' },
    ]);
    await expectElementVisible('Đánh giá khách hàng', 'text');
    await expectElementVisible('askerAvatar', 'id');
    await expectElementVisible('Asker', 'text');
  });
})

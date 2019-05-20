const {
  initData,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/unverified-tasker-accept-task.spec.js - UNVERIFIED Tasker accept task', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'UNVERIFIED' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0828833055' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 24 - UNVERIFIED Tasker can not accept task', async () => { //Tasker nhận việc trong trong trạng thái UNVERIFIED.
    await expectIdToHaveText('labelUnVerifiedTitle', 'Vui lòng hoàn tất hồ sơ để nhận được các công việc trên hệ thống. Hồ sơ gồm có:');
    await waitForElement('GỌI HỖ TRỢ', 500, 'text');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForLoading,
  expectElementVisible,
  expectElementNotVisible,
  expectElementNotExist,
  expectIdToHaveText,
  scrollTo,
  waitForElement
} = require('../../step-definitions');

describe('FILE: view-test/task/tasker-see-new-asker-note.spec.js', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 25 - Tasker see new Asker note in task', async () => { //Tasker thấy khách hàng mới.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 01', TaskNote: 'hello' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', IsNewAsker: true, AcceptedTasker: '0834567891', Status: 'CONFIRMED' }
    ]);
    await tapText('XÁC NHẬN');
    await expectElementVisible('Don dep nha 01');
    await expectIdToHaveText('labelNewAsker', 'Đây là khách hàng mới sử dụng dịch vụ, bạn nên liên hệ khách hàng trước khi đi làm.');
  });
})

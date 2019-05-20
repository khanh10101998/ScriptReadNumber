const {
  initData,
  tapId,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
  tapText,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-task-with-work-instruction.spec.js - Tasker accept task with work instruction', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 21 - Tasker accept task with work instruction', async () => { //Tasker xem mô tả chi tiết công việc nấu ăn.
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'My Task',
        WorkInstruction: {
          otherNote: 'Không dùng dầu và bột ngọt cho món xào',
        }
      },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'My Task', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('showTaskNote');
    await expectIdToHaveText('lbOtherNote', 'Không dùng dầu và bột ngọt cho món xào');
    await tapText('Đóng');
  });
})

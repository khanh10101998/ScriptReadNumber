const {
  initData,
  tapId,
  loginWithPhoneAndPassword,
  expectIdToHaveText,
  tapText,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-task-with-work-instruction.spec.js - Tasker accept task with work instruction', () => {
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

  it('LINE 21 - Tasker accept task with work instruction', async () => { //Tasker xem mô tả công việc.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'My Task',
        WorkInstruction: {
          room: [
            { roomType: 'LIVING_ROOM', quantity: 1, instruction: 'Ghi chú phòng khách' },
            { roomType: 'BED_ROOM', quantity: 2, instruction: 'Ghi chú phòng ngủ' },
            { roomType: 'BATH_ROOM', quantity: 3, instruction: 'Ghi chú toilet' },
            { roomType: 'KITCHEN', quantity: 4, instruction: 'Ghi chú nhà bếp' },
          ],
          otherNote: 'Ghi chú khác',
        }
      },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'My Task', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('showTaskNote');
    await expectIdToHaveText('lbRoomType0', '1 Phòng khách');
    await expectIdToHaveText('lbRoomType1', '2 Phòng ngủ');
    await expectIdToHaveText('lbRoomType2', '3 Phòng vệ sinh');
    await expectIdToHaveText('lbRoomType3', '4 Nhà bếp');
    await expectIdToHaveText('lbOtherNote', 'Ghi chú khác');
    await tapText('Đóng');
  });
})

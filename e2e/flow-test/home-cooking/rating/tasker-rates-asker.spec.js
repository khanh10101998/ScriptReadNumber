const {
  initData,
  loginWithPhoneAndPassword,
  typeToTextField,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotExist,
  swipe,
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/rating/tasker-rates-asker.spec.js - Tasker rates Asker', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfTaskToRating: 20,
    });
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 29 - Home cooking Tasker level 2 rates Asker do not need to input review', async () => { //Tasker level 2 đánh giá asker.
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0834567891', Description: 'Nau an 01', TaskerRated: 'false' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('modalRating', 1000);
    await expectIdToHaveText('lbRatingTitle', 'Đánh giá khách hàng');
    await expectIdToHaveText('lbServiceName', 'Nấu ăn');
    await expectIdToHaveText('lbAddress', 'Tại: Mỹ Khánh 1, Nguyễn Đức Cảnh, Tân Phong, Ho Chi Minh, Vietnam');
    await expectIdToHaveText('lbAskerName', 'Asker');
    await tapId('btnStar4');
    await expectElementVisible('txtReview');
    await expectIdToHaveText('lbReasonTitle', 'Điều gì bạn mong muốn tốt hơn?');
    await expectIdToHaveText('lbReason0', 'Không nên lôi kéo làm riêng');
    await expectIdToHaveText('lbReason1', 'Đảm bảo an toàn lao động');
    await expectIdToHaveText('lbReason2', 'Cân đối công việc và thời gian khi đặt trên ứng dụng');
    await expectIdToHaveText('lbReason3', 'Nên giữ liên lạc khi sắp đến giờ làm');
    await expectIdToHaveText('lbReason4', 'Thân thiện hơn');
    await expectIdToHaveText('lbReason5', 'Khác');
    await tapId('lbReason0');
    await tapId('buttonEnable');
    await expectElementNotExist('modalRating');
  });

  it('LINE 56 - Home cooking Tasker level 2 done task and rates Asker do not need to input review', async () => { //Tasker level 2 đánh giá tasker sau khi hoàn thành công việc.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 01', Progress: 'DONE', TaskerRated: 'false' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await tapText('XÁC NHẬN');
    await swipe('listViewconfirmed', 'up');
    await tapId('btnDoneNau an 01');
    await waitForElement('modalRating', 1000);
    await tapId('btnStar4');
    await tapId('lbReason0');
    await tapId('buttonEnable');
    await expectElementNotExist('modalRating');
  });

  it('LINE 74 - Home cooking Tasker level 2 done task and rates Asker. Choose OTHER reason', async () => { //Tasker đánh giá khách hàng với lựa chọn khác.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 01', Progress: 'DONE' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await tapText('XÁC NHẬN');
    await swipe('listViewconfirmed', 'up');
    await tapId('btnDoneNau an 01');
    await waitForElement('modalRating', 1000);
    await tapId('btnStar4');
    await tapId('lbReason5');
    await tapId('buttonEnable');
    await typeToTextField('txtReview', 'abc');
    await tapId('buttonEnable');
    await expectElementNotExist('modalRating');
  });

  it('LINE 94 - Home cooking Tasker is not in level 2 rates Asker', async () => { //Tasker nhỏ hơn level 2 thì không thấy thông báo đánh giá khách hàng.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Nau an 01', Progress: 'DONE' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 10 },
    ]);
    await tapText('XÁC NHẬN');
    await swipe('listViewconfirmed', 'up');
    await tapId('btnDoneNau an 01');
    await expectElementNotExist('modalRating');
  });
})

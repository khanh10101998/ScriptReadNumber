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
} = require('../../step-definitions');

describe('FILE: flow-test/rating/tasker-rates-asker.spec.js - Tasker rates Asker', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      numOfTaskToRating: 20,
    });
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567890', Description: 'Don dep nha 01' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 28 - Tasker level 2 rates Asker do not need to input review', async () => { //Tasker level 2 đánh giá khách hàng không nên lôi kéo làm riêng.
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await initData('task/updateTask', [
      { Status: 'DONE', AcceptedTasker: '0834567891', Description: 'Don dep nha 01', TaskerRated: 'false' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('modalRating', 1000);
    await expectIdToHaveText('lbRatingTitle', 'Đánh giá khách hàng');
    await expectIdToHaveText('lbServiceName', 'Dọn dẹp nhà');
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

  it('LINE 55 - Tasker level 2 done task and rates Asker do not need to input review', async () => { //Tasker level 2 hoàn thành công việc và đánh giá khách hàng.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01', Progress: 'DONE', TaskerRated: 'false' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await tapText('XÁC NHẬN');
    await tapId('btnDoneDon dep nha 01');
    await waitForElement('modalRating', 1000);
    await tapId('btnStar4');
    await tapId('lbReason0');
    await tapId('buttonEnable');
    await expectElementNotExist('modalRating');
  });

  it('LINE 72 - Tasker level 2 done task and rates Asker. Choose OTHER reason', async () => { //Tasker level 2 hoàn thành công việc, đánh giá asker, chọn lý do khác,
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01', Progress: 'DONE' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 20 },
    ]);
    await tapText('XÁC NHẬN');
    await tapId('btnDoneDon dep nha 01');
    await waitForElement('modalRating', 1000);
    await tapId('btnStar4');
    await tapId('lbReason5');
    await tapId('buttonEnable');
    await typeToTextField('txtReview', 'abc');
    await tapId('buttonEnable');
    await expectElementNotExist('modalRating');
  });

  it('LINE 91 - Tasker is not in level 2 rates Asker', async () => { //Tasker dưới level 2 không thể đánh giá khách hàng.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567891', Description: 'Don dep nha 01', Progress: 'DONE' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 10 },
    ]);
    await tapText('XÁC NHẬN');
    await tapId('btnDoneDon dep nha 01');
    await expectElementNotExist('modalRating');
  });
})

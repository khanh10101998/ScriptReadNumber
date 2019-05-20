const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotExist,
  scrollTo,
  tapHeaderBack,
  expectIdToHaveText,
  scroll,
  waitForLoading,
  tapAtPoint
} = require('../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/deep-cleaning/tasker-done-deep-cleaning-task.spec.js - Tasker done task Deep Cleaning', () => {
  beforeEach(async () => {
    await initData('service/updateService', {
      service: 'Tổng vệ sinh', data: {minTaskDone: 20, minAvgRating: 4.6}
    });
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', Score: 9, AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE', Score: 8, AvgRating: 4.7, TaskDone: 21 },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0834567892', Service: 'Tổng vệ sinh' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Task 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 01', TaskerPhone: '0834567891' },
      { Description: 'Task 01', TaskerPhone: '0834567892' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 42 - Only Leader Tasker can done task. Free task fee for leader', async () => { //Chỉ leader mới có thể hoàn thành công việc.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await expectElementVisible('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 'text');
    await tapText('Xem');
    await initData('task/updateTask', [
      { Description: 'Task 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDone', 1000);
    await tapId('btnDone');
    await waitForElement('Bạn không thể hoàn tất công việc, vui lòng liên hệ nhóm trưởng.', 2000, 'text');
    await tapText('Đóng');
    await tapHeaderBack();
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForLoading(1000);
    await expectElementVisible('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 'text');
    await tapText('Xem');
    await tapId('btnDone');
    await waitForElement('Đánh giá khách hàng', 2000,'text');
    await tapAtPoint('modalRating', 0, -25);
    await expectElementNotExist('Task 01');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '100,000 ₫');
    await tapHeaderBack();
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectElementVisible('Cảm ơn bạn! Công việc của bạn đã hoàn thành.', 'text');
    await tapText('Đóng');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '85,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '85,000 ₫');
  });

  it('LINE 100 - Calculate task fee for Leader Tasker', async () => { //Leader kiểm tra thông tin tài chính.
    await initData('service/updateService', { service: 'Tổng vệ sinh', data: { serviceFeeLeaderTasker: 0.1 }});
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 2000, 'text');
    await tapText('Xem');
    await initData('task/updateTask', [
      { Description: 'Task 01', Progress: 'DONE' },
    ]);
    await waitForElement('btnDone', 1000);
    await tapId('btnDone');
    await waitForElement('Đánh giá khách hàng', 2000,'text');
    await tapAtPoint('modalRating', 0, -25);
    await expectElementNotExist('Task 01');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '90,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '90,000 ₫');
    await tapHeaderBack();
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectElementVisible('Cảm ơn bạn! Công việc của bạn đã hoàn thành.', 'text');
    await tapText('Đóng');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '85,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '85,000 ₫');
  });

  it('LINE 145 - Leader Tasker done promotion task, check financial account', async () => { //Leader hoàn thành việc khuyến mãi, kiểm tra thông tin tài chính.
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: 50000, Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Task 02', detailDeepCleaning: {
        costPerLeaderTasker: {
          main: 75000,
          promotion: 25000,
          total: 100000
        },
        costPerTasker: {
          main: 75000,
          promotion: 25000,
          total: 100000
        },
        numberOfTaskersDeepCleaning: 2
      }},
    ]);
    await initData('task/updateTask', [
      { Description: 'Task 02', PromotionCode: 'abc123' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await tapText('Xem');
    await initData('task/updateTask', [
      { Description: 'Task 02', Progress: 'DONE' },
    ]);
    await waitForElement('btnDone', 1000);
    await tapId('btnDone');
    await waitForElement('Đánh giá khách hàng', 2000,'text');
    await tapAtPoint('modalRating', 0, -25);
    await expectElementNotExist('Task 02');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '125,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '125,000 ₫');
    await tapHeaderBack();
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectElementVisible('Cảm ơn bạn! Công việc của bạn đã hoàn thành.', 'text');
    await tapText('Đóng');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '110,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '110,000 ₫');
  });

  it('LINE 224 - Promotion task payment by CREDIT, check financial account', async () => { //Thanh toán tiền bằng CREDIT, kiểm tra thông tin tài chính.
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: 50000, Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Task 02', detailDeepCleaning: {
        costPerLeaderTasker: {
          main: 75000,
          promotion: 25000,
          total: 100000
        },
        costPerTasker: {
          main: 75000,
          promotion: 25000,
          total: 100000
        },
        numberOfTaskersDeepCleaning: 2
      }},
    ]);
    await initData('task/updateTask', [
      { PaymentMethod: 'CREDIT', Description: 'Task 02', PromotionCode: 'abc123' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await tapText('Xem');
    await initData('task/updateTask', [
      { Description: 'Task 02', Progress: 'DONE' },
    ]);
    await waitForElement('btnDone', 1000);
    await tapId('btnDone');
    if (device.getPlatform() === 'android') {
      await waitForElement('Đánh giá khách hàng', 2000,'text');
      await tapAtPoint('modalRating', 0, -25);
    }
    await waitForElement('Tài khoản của bạn đã được cộng thêm 100,000 VND', 2000, 'text');
    await tapText('Xem');
    await expectIdToHaveText('txtMainAccount', '75,000 ₫');
    await expectIdToHaveText('txtProAccount', '125,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '200,000 ₫');
    await tapHeaderBack();
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectElementVisible('Cảm ơn bạn! Công việc của bạn đã hoàn thành.', 'text');
    await tapText('Đóng');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '75,000 ₫');
    await expectIdToHaveText('txtProAccount', '110,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '185,000 ₫');
  });

  it('LINE 305 - Task payment by CREDIT, check financial account', async () => { //Công việc thanh toán bằng credit, kiểm tra thông tin tài chính.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Task 02', detailDeepCleaning: {
        costPerLeaderTasker: {
          main: 100000,
          total: 100000
        },
        costPerTasker: {
          main: 100000,
          total: 100000
        },
        numberOfTaskersDeepCleaning: 2
      }},
    ]);
    await initData('task/updateTask', [
      { PaymentMethod: 'CREDIT', Description: 'Task 02' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 2000, 'text');
    await tapText('Xem');
    await initData('task/updateTask', [
      { Description: 'Task 02', Progress: 'DONE' },
    ]);
    await waitForElement('btnDone', 1000);
    await tapId('btnDone');
    if (device.getPlatform() === 'android') {
      await waitForElement('Đánh giá khách hàng', 2000,'text');
      await tapAtPoint('modalRating', 0, -25);      
    }
    await waitForElement('Tài khoản của bạn đã được cộng thêm 100,000 VND', 2000, 'text');
    await tapText('Xem');
    await expectIdToHaveText('txtMainAccount', '100,000 ₫');
    await expectIdToHaveText('txtProAccount', '100,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '200,000 ₫');
    await tapHeaderBack();
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectElementVisible('Cảm ơn bạn! Công việc của bạn đã hoàn thành.', 'text');
    await tapText('Đóng');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '100,000 ₫');
    await expectIdToHaveText('txtProAccount', '85,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '185,000 ₫');

    var fa = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567890' });
    expect(fa.FMainAccount).to.equal(-200000);
    expect(fa.Promotion).to.equal(100000);
  });

  it('LINE 385 - Done task and rating', async () => { //Tasker hoàn thành công việc và đánh giá khách hàng.
    await initData('user/updateUser', [
      { Phone: '0834567891', TaskDone: 21 },
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: 50000, Target: 'ASKER', TypeOfPromotion: 'NEW', TypeOfValue: 'MONEY', Limit: 100 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567890', Description: 'Task 02', detailDeepCleaning: {
        costPerLeaderTasker: {
          main: 75000,
          promotion: 25000,
          total: 100000
        },
        costPerTasker: {
          main: 75000,
          promotion: 25000,
          total: 100000
        },
        numberOfTaskersDeepCleaning: 2
      }},
    ]);
    await initData('task/updateTask', [
      { Description: 'Task 02', PromotionCode: 'abc123' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567891', '123456');
    if (device.getPlatform() === 'ios') {
      await scroll('listViewnewTask', 50, 'down');
    } else {
      await scroll('listViewnewTask', 400, 'down');
    }
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 2000, 'text');
    await tapText('Xem');
    await initData('task/updateTask', [
      { Description: 'Task 02', Progress: 'DONE' },
    ]);
    await waitForElement('btnDone', 2000);
    await tapId('btnDone');
    await expectElementNotExist('Task 02');

    await waitForElement('modalRating', 1000);
    await expectIdToHaveText('lbRatingTitle', 'Đánh giá khách hàng');
    await expectIdToHaveText('lbServiceName', 'Tổng vệ sinh');
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

    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '125,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '125,000 ₫');
    await tapHeaderBack();
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectElementVisible('Cảm ơn bạn! Công việc của bạn đã hoàn thành.', 'text');
    await tapText('Đóng');
    await tapId('btnMenu');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '110,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '110,000 ₫');
  });
})

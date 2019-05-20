const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  expectElementNotVisible,
  expectIdToHaveText,
  tapText,
  scrollTo,
  waitForLoading,
  tapIdAtIndex,
  waitForElement
} = require('../../step-definitions');

describe('FILE: flow-test/deep-cleaning/tasker-accept-deep-cleaning.spec.js - Tasker accept deep cleaning task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567893', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567894', Name: 'Tasker 04', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 20 },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Score: 1 },
      { Phone: '0834567892', Score: 5 },
      { Phone: '0834567893', Score: 10 },
      { Phone: '0834567894', Score: 10 }

    ]);
    await initData('service/initDeepCleaningService'); //default 2 member in a team
    
    await initData('service/updateService', { service: 'Tổng vệ sinh', data: {
      listOfToolsForTasker: {
        vi: 'Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet',
        en: 'Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet',
        ko: 'Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet'
      },
      minNumTasks: 20,
      minStarRating: 4.7
    }});
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0834567892', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0834567893', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0834567894', Service: 'Tổng vệ sinh' }
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Main: 45000, Promotion: 1 },
      { Phone: '0834567892', Main: 1000000 },
      { Phone: '0834567893', Main: 1000000 },
      { Phone: '0834567894', Main: 1000000 }
    ]);
    
    await device.reloadReactNative();
  });

  it('LINE 58 - Tasker accept task. After that, tab new task and do not see this task', async () => { //Tasker nhận việc và không hiện việc đó không còn hiện ở screen việc mới.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Task 03'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 03', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
      { Description: 'Task 02', TaskerPhone: '0834567893' }
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Dụng cụ cần mang');
    await tapText('Đóng');
    await tapId('Task 02');
    await expectElementVisible('CHI TIẾT CÔNG VIỆC', 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Task 02', 'text');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Task 02', 'text');
    await tapId('Task 03');
    await expectElementVisible('CHI TIẾT CÔNG VIỆC', 'text');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    // Check financial account holding amount
    await tapId('btnMenu');
    await waitForElement('Thông tin tài chính', 1000, 'text');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtHoldAmount', '-45,000 ₫');
    // Check 
  });

  it('LINE 92 - All of taskers (in a team) accept task. Task status changes to CONFIRMED', async () => { //Tất cả tasker trong 1 tem đều nhận việc thì chuyển sang trạn thái CONFIRMED.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
      { Description: 'Task 02', TaskerPhone: '0834567893' }
    ]);

    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Dụng cụ cần mang');
    await expectElementVisible('- Chổi', 'text');
    await expectElementVisible('- Ki hốt rác', 'text');
    await expectElementVisible('- Cây lau nhà, xô', 'text');
    await expectElementVisible('- Khăn lông', 'text');
    await expectElementVisible('- Nước lau sàn', 'text');
    await expectElementVisible('- Vim bồn cầu', 'text');
    await expectElementVisible('- Nước lau kính', 'text');
    await expectElementVisible('- Bàn chải toilet', 'text');
    await tapText('Đóng');
    await tapId('Danh sách công việc');
    await expectElementVisible('Tổng quát', 'text');
    await expectElementVisible('- Quét bụi, quét mạng nhện trên trần nhà', 'text');
    await expectElementVisible('Phòng khách', 'text');
    await expectElementVisible('- Vệ sinh kỹ phần cửa, các bề mặt kính, các tủ kệ...', 'text');
    await expectElementVisible('Nhà bếp', 'text');
    await expectElementVisible('- Vệ sinh tủ lạnh, lò vi ba, lò nướng, bếp nấu, các tủ kệ', 'text');
    await expectElementVisible('Phòng ngủ', 'text');
    await expectElementVisible('- Vệ sinh vạc giường, quét bụi, lau đầu giường, gầm giường...', 'text');
    await expectElementVisible('Nhà vệ sinh', 'text');
    await expectElementVisible('- Vệ sinh tường, sàn nhà, các góc tường; khu vực bồn rửa mặt, bồn tắm; tẩy uế bồn cầu; vệ sinh khu vực cống, nắp thoát nước...', 'text');
    await tapText('Đóng');
    await expectIdToHaveText('labelCostTask 02', '100,000');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Task 02', 'text');
    await tapId('Dụng cụ cần mang');
    await expectElementVisible('- Chổi', 'text');
    await expectElementVisible('- Ki hốt rác', 'text');
    await expectElementVisible('- Cây lau nhà, xô', 'text');
    await expectElementVisible('- Khăn lông', 'text');
    await expectElementVisible('- Nước lau sàn', 'text');
    await expectElementVisible('- Vim bồn cầu', 'text');
    await expectElementVisible('- Nước lau kính', 'text');
    await expectElementVisible('- Bàn chải toilet', 'text');
    await tapText('Đóng');
    await tapId('Danh sách công việc');
    await expectElementVisible('Tổng quát', 'text');
    await expectElementVisible('- Quét bụi, quét mạng nhện trên trần nhà', 'text');
    await expectElementVisible('Phòng khách', 'text');
    await expectElementVisible('- Vệ sinh kỹ phần cửa, các bề mặt kính, các tủ kệ...', 'text');
    await expectElementVisible('Nhà bếp', 'text');
    await expectElementVisible('- Vệ sinh tủ lạnh, lò vi ba, lò nướng, bếp nấu, các tủ kệ', 'text');
    await expectElementVisible('Phòng ngủ', 'text');
    await expectElementVisible('- Vệ sinh vạc giường, quét bụi, lau đầu giường, gầm giường...', 'text');
    await expectElementVisible('Nhà vệ sinh', 'text');
    await expectElementVisible('- Vệ sinh tường, sàn nhà, các góc tường; khu vực bồn rửa mặt, bồn tắm; tẩy uế bồn cầu; vệ sinh khu vực cống, nắp thoát nước...', 'text');
    await tapText('Đóng');
    await expectIdToHaveText('labelCostTask 02', '100,000');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Task 02', 'text');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapId('Dụng cụ cần mang');
    await expectElementVisible('- Chổi', 'text');
    await expectElementVisible('- Ki hốt rác', 'text');
    await expectElementVisible('- Cây lau nhà, xô', 'text');
    await expectElementVisible('- Khăn lông', 'text');
    await expectElementVisible('- Nước lau sàn', 'text');
    await expectElementVisible('- Vim bồn cầu', 'text');
    await expectElementVisible('- Nước lau kính', 'text');
    await expectElementVisible('- Bàn chải toilet', 'text');
    await tapText('Đóng');
    await tapId('Danh sách công việc');
    await expectElementVisible('Tổng quát', 'text');
    await expectElementVisible('- Quét bụi, quét mạng nhện trên trần nhà', 'text');
    await expectElementVisible('Phòng khách', 'text');
    await expectElementVisible('- Vệ sinh kỹ phần cửa, các bề mặt kính, các tủ kệ...', 'text');
    await expectElementVisible('Nhà bếp', 'text');
    await expectElementVisible('- Vệ sinh tủ lạnh, lò vi ba, lò nướng, bếp nấu, các tủ kệ', 'text');
    await expectElementVisible('Phòng ngủ', 'text');
    await expectElementVisible('- Vệ sinh vạc giường, quét bụi, lau đầu giường, gầm giường...', 'text');
    await expectElementVisible('Nhà vệ sinh', 'text');
    await expectElementVisible('- Vệ sinh tường, sàn nhà, các góc tường; khu vực bồn rửa mặt, bồn tắm; tẩy uế bồn cầu; vệ sinh khu vực cống, nắp thoát nước...', 'text');
    await tapText('Đóng');
    await expectIdToHaveText('labelCostTask 02', '100,000');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await expectElementVisible('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 'text');
    await tapText('Xem');
    await tapId('Dụng cụ cần mang');
    await expectElementVisible('- Chổi', 'text');
    await expectElementVisible('- Ki hốt rác', 'text');
    await expectElementVisible('- Cây lau nhà, xô', 'text');
    await expectElementVisible('- Khăn lông', 'text');
    await expectElementVisible('- Nước lau sàn', 'text');
    await expectElementVisible('- Vim bồn cầu', 'text');
    await expectElementVisible('- Nước lau kính', 'text');
    await expectElementVisible('- Bàn chải toilet', 'text');
    await tapText('Đóng');
    await tapId('Danh sách công việc');
    await expectElementVisible('Tổng quát', 'text');
    await expectElementVisible('- Quét bụi, quét mạng nhện trên trần nhà', 'text');
    await expectElementVisible('Phòng khách', 'text');
    await expectElementVisible('- Vệ sinh kỹ phần cửa, các bề mặt kính, các tủ kệ...', 'text');
    await expectElementVisible('Nhà bếp', 'text');
    await expectElementVisible('- Vệ sinh tủ lạnh, lò vi ba, lò nướng, bếp nấu, các tủ kệ', 'text');
    await expectElementVisible('Phòng ngủ', 'text');
    await expectElementVisible('- Vệ sinh vạc giường, quét bụi, lau đầu giường, gầm giường...', 'text');
    await expectElementVisible('Nhà vệ sinh', 'text');
    await expectElementVisible('- Vệ sinh tường, sàn nhà, các góc tường; khu vực bồn rửa mặt, bồn tắm; tẩy uế bồn cầu; vệ sinh khu vực cống, nắp thoát nước...', 'text');
    await tapText('Đóng');
    await expectIdToHaveText('labelCostTask 02', '200,000');
    await tapText('• Công việc của bạn', 'text');
    await expectElementVisible('- Nhóm trưởng cần liên hệ với những thành viên trong nhóm trước khi công việc bắt đầu. Nếu có thành viên nào không đi làm được, cần liên hệ với tổng đài để được hỗ trợ.', 'text');
    await tapText('• Công việc của bạn', 'text');
    await tapText('• Ưu đãi dành cho nhóm trưởng');
    await expectElementVisible('- Nhóm trưởng được miễn phí 15% phí của công việc.', 'text');
    await tapText('• Ưu đãi dành cho nhóm trưởng');
    await scrollTo('taskDetailScrollView', 'bottom');
    await expectIdToHaveText('costPerLeader', '100,000 VND');
    await expectIdToHaveText('costPerTaskerTasker 01', '100,000 VND');
    await expectElementVisible('btnChat');
    await tapIdAtIndex('btnBack');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    //relogin with account Tasker 01 to receive notification Receive task successfully.

    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForLoading(1000);
    await expectElementVisible('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 'text');
    await tapText('Xem');
    await tapText('• Công việc của bạn', 'text');
    await expectElementVisible('- Làm việc theo sự phân công của nhóm trưởng.', 'text');
    await tapText('• Công việc của bạn', 'text');
    await scrollTo('taskDetailScrollView', 'bottom');
    await expectElementNotVisible('costPerLeader');
    await expectElementNotVisible('costPerTaskerTasker 01');
    await expectElementNotVisible('btnChat');
  });

  it('LINE 247 - All of taskers (in a team) accept task with promotion', async () => { //Tất cả thành viên trong team đểu nhận công việc khuyến mãi.
    //Create task for promotion
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 01', Cost: 220000,
        detailDeepCleaning: {
          costPerLeaderTasker : {
            main : 110000,
            promotion: 10000,
            total : 120000
          },
          costPerTasker : {
              main : 90000,
              promotion: 10000,
              total : 100000
          },
          numberOfTaskersDeepCleaning : 2
        }
      },
    ]);
    await initData('promotion/createPromotionCode', [
      { Code: 'abc123', Value: '20000', Target: 'ASKER', TypeOfPromotion: 'CURRENT', TypeOfValue: 'MONEY', Limit: '100' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Task 01', PromotionCode: 'abc123' }
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 01', TaskerPhone: '0834567891' },
      { Description: 'Task 01', TaskerPhone: '0834567892' },
      { Description: 'Task 01', TaskerPhone: '0834567893' }
    ]);

    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectIdToHaveText('labelCostTask 01', '100,000');
    await expectIdToHaveText('labelPromotionTask 01', '90,000');
    await expectIdToHaveText('labelAddToPromotionTask 01', '+10,000 VND vào tài khoản khuyến mãi');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Task 01', 'text');
    await expectIdToHaveText('labelCostTask 01', '100,000');
    await expectIdToHaveText('labelPromotionTask 01', '90,000');
    await expectIdToHaveText('labelAddToPromotionTask 01', '+10,000 VND vào tài khoản khuyến mãi');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Task 01', 'text');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567892', '123456');
    await expectIdToHaveText('labelCostTask 01', '100,000');
    await expectIdToHaveText('labelPromotionTask 01', '90,000');
    await expectIdToHaveText('labelAddToPromotionTask 01', '+10,000 VND vào tài khoản khuyến mãi');
    await tapId('Task 01');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await expectElementVisible('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 'text');
    await tapText('Xem');
    await expectIdToHaveText('labelCostTask 01', '220,000');
    await expectIdToHaveText('labelPromotionTask 01', '200,000');
    await expectIdToHaveText('labelAddToPromotionTask 01', '+20,000 VND vào tài khoản khuyến mãi');
    await scrollTo('taskDetailScrollView', 'bottom');
    await expectIdToHaveText('costPerLeader', '110,000 VND');
    await expectIdToHaveText('costPerTaskerTasker 01', '90,000 VND');
    await expectIdToHaveText('promotionPerLeader', '+10,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('promotionPerTaskerTasker 01', '+10,000 VND vào tài khoản khuyến mãi');
    await waitForLoading(2000);
    await tapId('phoneCallTasker 01');
    await expectElementVisible('Bạn có muốn gọi cho Tasker 01', 'text');
    await tapText('Đóng');
    await expectElementVisible('btnChat');
    await tapIdAtIndex('btnBack');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');
    //relogin with account Tasker 01 to receive notification Receive task successfully.
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForLoading(1000);
    await expectElementVisible('Chúc mừng bạn đã nhận được công việc. XEM chi tiết công việc.', 'text');
    await tapText('Xem');
    await expectIdToHaveText('labelCostTask 01', '100,000');
    await expectIdToHaveText('labelPromotionTask 01', '90,000');
    await expectIdToHaveText('labelAddToPromotionTask 01', '+10,000 VND vào tài khoản khuyến mãi');
    await scrollTo('taskDetailScrollView', 'bottom');
    await waitForLoading(2000);
    await tapId('phoneCallTasker 02');
    await expectElementVisible('Bạn có muốn gọi cho Tasker 02', 'text');
    await tapText('Đóng');
    await expectElementNotVisible('costPerLeader');
    await expectElementNotVisible('costPerTaskerTasker 01');
    await expectElementNotVisible('btnChat');
  });

  it('LINE 346 - Tasker accept task. Check Leader Tasker', async () => { //Tasker nhận việc và kiểm tra leader.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
      { Description: 'Task 02', TaskerPhone: '0834567893' }
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567893', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await tapText('Xem');
    await scrollTo('taskDetailScrollView', 'bottom');
    await expectElementVisible('Tasker 03Leader');
  });

  it('LINE 376 - Tasker can not accept task if number of TaskDone = 20', async () => { //Tasker không thể nhận việc tổng vệ sinh khi mới hoàn thành 20 công việc.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567894' }
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567894', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Để nhận được công việc này, bạn cần hoàn thành trên 20 công việc và có Đánh giá sao trên 4.6', 1000, 'text');
    await tapText('Đóng');
    await waitForElement('checkBoxConfirm', 1000);
  });

  it('LINE 393 - Tasker can not accept task if AvgRating = 4.6', async () => { //Tasker không thể nhận tổng vệ sinh khi có đánh giá sao 4.6
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567894' }
    ]);

    await device.reloadReactNative();
    await initData('user/updateUser', [{
      Phone: '0834567894', AvgRating: 4.6, TaskDone: 21
    }]);
    await loginWithPhoneAndPassword('0834567894', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForElement('Để nhận được công việc này, bạn cần hoàn thành trên 20 công việc và có Đánh giá sao trên 4.6', 1000, 'text');
    await tapText('Đóng');
    await waitForElement('checkBoxConfirm', 1000);
  });

  it('LINE 414 - Tasker accept task if AvgRating > 4.6 and TaskDone > 20', async () => { //Tasker nhận tổng vệ sinh với đánh giá sao trên 4.6 và hoàn thành trên 20 công việc.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567894' }
    ]);

    await device.reloadReactNative();
    await initData('user/updateUser', [{
      Phone: '0834567894', AvgRating: 4.7, TaskDone: 21
    }]);
    await loginWithPhoneAndPassword('0834567894', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await tapText('CHỜ XÁC NHẬN');
    await waitForElement('Task 02', 1000, 'text');
  });
})

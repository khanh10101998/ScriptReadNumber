const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapId,
  tapText,
  scrollTo,
  expectIdToHaveText,
} = require('../../step-definitions');

describe('FILE: flow-test/home-cooking/tasker-weekly-report/tasker-weekly-report.spec.js - Tasker see weekly reports', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 21 - Tasker has 1 week report', async () => { //Tasker xem tổng kết hàng tuần.
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 01', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 02', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 03', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 04', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 05', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 06', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 07', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 08', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 09', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 10', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 11', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 12', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 13', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 14', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 15', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 16', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 17', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 18', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 19', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 20', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 21', Date: 'Last 1 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 22', Date: 'Last 1 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 23', Date: 'Last 1 week', Status: 'DONE' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567891', Description: 'History 01', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 02', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 03', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 04', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 05', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 06', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 07', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 08', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 09', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 10', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 11', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 12', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 13', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 14', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 15', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 16', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 17', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 18', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 19', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 20', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 21', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 22', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 23', Rated: true },
    ]);
    await initData('task/createRating', [
      { Description: 'History 01', Rate: 5, Review: 'abc', Feedback: 'ON_TIME;CHEERFUL' },
       { Description: 'History 02', Review:  'Good job 2', Rate:  5   },
       { Description: 'History 03', Review:  'Good job 3', Rate:  5   },
       { Description: 'History 04', Review:  'Good job 4', Rate:  5, Feedback:  'CHEERFUL'  },
       { Description: 'History 05', Review:  'Good job 5', Rate:  5, Feedback:  'ON_TIME;CHEERFUL'  },
       { Description: 'History 06', Review:  'Good job 6', Rate:  5, Feedback:  'ON_TIME'  },
       { Description: 'History 07', Review:  'Good job 7', Rate:  5   },
       { Description: 'History 08', Review:  'Good job 8', Rate:  5   },
       { Description: 'History 09', Review:  'Good job 9', Rate:  5   },
       { Description: 'History 10', Review:  'Good job 10', Rate:  5   },
       { Description: 'History 11', Review:  'Bad job 11', Rate:  4, Feedback:  'ON_TIME'  },
       { Description: 'History 12', Review:  'Bad job 12', Rate:  3, Feedback:  'ON_TIME'  },
       { Description: 'History 13', Review:  'Bad job 13', Rate:  2   },
       { Description: 'History 14', Review:  'Bad job 14', Rate:  1   },
       { Description: 'History 15', Review:  'Bad job 15', Rate:  3, Feedback:  'ON_TIME'  },
       { Description: 'History 16', Review:  'Bad job 16', Rate:  3   },
       { Description: 'History 17', Review:  'Bad job 17', Rate:  3   },
       { Description: 'History 18', Review:  'Bad job 18', Rate:  3, Feedback:  'OTHER'  },
       { Description: 'History 19', Review:  'Bad job 19', Rate:  3   },
       { Description: 'History 20', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
       { Description: 'History 21', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
       { Description: 'History 22', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
       { Description: 'History 23', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
    ]);
    await initData('taskerReport/createTaskReportTasker', {phone: '0834567891', nWeek: 4});
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await scrollTo('scrollViewMenu', 'bottom');
    await tapText('Tổng kết hàng tuần');
    await expectElementVisible('20 Công việc - 4,000,000 VND', 'text');
    await expectElementVisible('Tăng 17 công việc so với tuần trước đó.', 'text');
    await expectElementVisible('Chất lượng công việc trung bình cao hơn.', 'text');
    await expectElementVisible('Đánh giá tốt - 5 sao', 'text');
    //TODO: fix this, ambiguious
    //await expectElementVisibleAtIndex('10 Công việc', 0, 'text');
    await expectElementVisible('Tăng 10 so với tuần trước.', 'text');
    await expectElementVisible('Đánh giá chưa tốt', 'text');
    //TODO: fix this, ambiguious
    //await expectElementVisibleAtIndex('10 Công việc', 1, 'text');
    await expectElementVisible('Tăng 7 so với tuần trước. Bạn phải xem chi tiết và cố gắng cải thiện.', 'text');
    await expectElementVisible('Lời đề nghị đến từ bTaskee:', 'text');
    await expectElementVisible('Vui lòng đi sớm hơn.', 'text');
    await expectElementVisible('Danh sách sẽ được cập nhật vào thứ 2 hàng tuần.', 'text');
    await expectElementVisible('Lưu ý một số công việc có thể chưa được đánh giá.', 'text');
    await tapText('Chọn tuần:');
    await tapText('Đóng');
  });

  it('LINE 121 - Tasker has many report', async () => { //Tasker xem report của nhiều tuần.
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 01', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 02', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 03', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 04', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 05', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 06', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 07', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 08', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 09', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 10', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 11', Date: 'Last 1 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 12', Date: 'Last 1 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 13', Date: 'Last 1 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 14', Date: 'Last 1 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 15', Date: 'Last 2 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 16', Date: 'Last 2 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 17', Date: 'Last 2 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 18', Date: 'Last 2 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 19', Date: 'Last 3 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 20', Date: 'Last 3 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 21', Date: 'Last 3 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 22', Date: 'Last 3 week', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 23', Date: 'Last 4 week', Status: 'DONE' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567891', Description: 'History 01', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 02', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 03', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 04', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 05', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 06', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 07', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 08', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 09', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 10', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 11', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 12', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 13', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 14', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 15', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 16', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 17', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 18', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 19', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 20', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 21', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 22', Rated: true },
      { AcceptedTasker: '0834567891', Description: 'History 23', Rated: true },
    ]);
    await initData('task/createRating', [
      { Description: 'History 01', Rate: 5, Review: 'abc', Feedback: 'ON_TIME;CHEERFUL' },
       { Description: 'History 02', Review:  'Good job 2', Rate:  5   },
       { Description: 'History 03', Review:  'Good job 3', Rate:  5   },
       { Description: 'History 04', Review:  'Good job 4', Rate:  5, Feedback:  'CHEERFUL'  },
       { Description: 'History 05', Review:  'Good job 5', Rate:  5, Feedback:  'ON_TIME;CHEERFUL'  },
       { Description: 'History 06', Review:  'Good job 6', Rate:  5, Feedback:  'ON_TIME'  },
       { Description: 'History 07', Review:  'Good job 7', Rate:  5   },
       { Description: 'History 08', Review:  'Good job 8', Rate:  5   },
       { Description: 'History 09', Review:  'Good job 9', Rate:  5   },
       { Description: 'History 10', Review:  'Good job 10', Rate:  5   },
       { Description: 'History 11', Review:  'Bad job 11', Rate:  4, Feedback:  'ON_TIME'  },
       { Description: 'History 12', Review:  'Bad job 12', Rate:  3, Feedback:  'ON_TIME'  },
       { Description: 'History 13', Review:  'Bad job 13', Rate:  2   },
       { Description: 'History 14', Review:  'Bad job 14', Rate:  1   },
       { Description: 'History 15', Review:  'Bad job 15', Rate:  3, Feedback:  'ON_TIME'  },
       { Description: 'History 16', Review:  'Bad job 16', Rate:  3   },
       { Description: 'History 17', Review:  'Bad job 17', Rate:  3   },
       { Description: 'History 18', Review:  'Bad job 18', Rate:  3, Feedback:  'OTHER'  },
       { Description: 'History 19', Review:  'Bad job 19', Rate:  3   },
       { Description: 'History 20', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
       { Description: 'History 21', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
       { Description: 'History 22', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
       { Description: 'History 23', Review:  'Bad job 20', Rate:  3, Feedback:  'ON_TIME;OTHER'  },
    ]);
    await initData('taskerReport/createTaskReportTasker', {phone: '0834567891', nWeek: 6});
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await scrollTo('scrollViewMenu', 'bottom');
    await tapText('Tổng kết hàng tuần');
    await expectElementVisible('10 Công việc - 2,000,000 VND', 'text');
    await tapId('goodRatingItem');
    await expectIdToHaveText('goodRatingFeedbackHeader', 'Khách hàng hài lòng về bạn:');
    await expectIdToHaveText('goodTxtFeedback0', '- Đúng giờ');
    await expectIdToHaveText('goodTxtFeedback1', '- Vui vẻ');
    await expectIdToHaveText('goodRatingReviewHeader', 'Nhận xét của khách hàng:');
    await expectIdToHaveText('goodTxtReview0', 'abc');
    await tapText('Đóng');
    await tapId('badRatingItem');
    await expectIdToHaveText('badNoRatingFeedback', 'Không có đánh giá nào chưa tốt.');
    await tapText('Đóng');
    await tapText('Chọn tuần:');
    await tapId('week1');
    await expectElementVisible('4 Công việc - 800,000 VND', 'text');
    await tapId('goodRatingItem');
    await expectIdToHaveText('goodNoRatingFeedback', 'Không có đánh giá nào.');
    await tapText('Đóng');
    await tapId('badRatingItem');
    await expectIdToHaveText('badRatingFeedbackHeader', 'Khách hàng chưa hài lòng về bạn:');
    await expectIdToHaveText('badTxtFeedback0', '- Đúng giờ');
    await tapText('Đóng');
    await tapText('Chọn tuần:');
    await tapId('week2');
    await expectElementVisible('4 Công việc - 800,000 VND', 'text');
    await tapText('Chọn tuần:');
    await tapId('week3');
    await expectElementVisible('4 Công việc - 800,000 VND', 'text');
    await tapText('Chọn tuần:');
    await tapId('week4');
    await expectElementVisible('1 Công việc - 200,000 VND', 'text');
  });

  it('LINE 234 - Tasker has no report', async () => { //Tasker chưa có tổng kết hàng tuần.
    await initData('taskerReport/createTaskReportTasker', {phone: '0834567891', nWeek: 5});
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await scrollTo('scrollViewMenu', 'bottom');
    await tapText('Tổng kết hàng tuần');
    await expectElementVisible('Bạn chưa có tổng kết nào.', 'text');
  });
})

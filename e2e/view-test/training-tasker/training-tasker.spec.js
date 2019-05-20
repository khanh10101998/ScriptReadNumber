const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapId,
  tapText,
  waitForElement,
  expectElementNotVisible,
  waitForLoading,
  fillActiveCode,
  tapIdAtIndex,
  scrollTo,
  scroll,
  swipe
} = require('../../step-definitions');

describe('FILE: view-test/training-tasker/training-tasker.spec.js - Tasker see task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker 01', Type: 'TASKER', Status: 'INACTIVE' },
      { Phone: '0834567891', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' }

    ]);
    await initData('settings/changeSettingSystem', {
      trainingCourseV2: 'https://raw.githubusercontent.com/dantn93/TrainingV2/master/courses.json'
    });
    await device.reloadReactNative();
  });

  it('LINE 30 - INACTIVE Tasker can not login and do not see "Training Course" in Menu', async () => { //Tasker không thể login khi tài khoản chưa được active.
    await loginWithPhoneAndPassword('0834567890', '123456');
    await expectElementVisible('Tài khoản của bạn chưa được kích hoạt, hãy kích hoạt ngay', 'text');
    await tapText('Kích hoạt');
    await waitForLoading(500);
    await tapText('Đồng ý');
    await waitForElement('KÍCH HOẠT TÀI KHOẢN', 1000, 'text');
    await fillActiveCode('0834567890');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementNotVisible('Chương trình đào tạo');

    //see Training Course with status ACTIVE
    await initData('user/updateUser', [
      { Phone: '0834567890', Status: 'ACTIVE' },
    ]);
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await expectElementVisible('Chương 1: Kiến thức cơ bản', 'text');
    await tapIdAtIndex('btnBack');

    await initData('user/updateUser', [
      { Phone: '0834567890', Status: 'LOCKED' },
    ]);

    //see Training Course with status LOCKED
    await initData('user/updateUser', [
      { Phone: '0834567890', Status: 'LOCKED' },
    ]);
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await expectElementVisible('Chương 1: Kiến thức cơ bản', 'text');
    await tapIdAtIndex('btnBack');

    //see Training Course with status IN_PROBATION
    await initData('user/updateUser', [
      { Phone: '0834567890', Status: 'IN_PROBATION' },
    ]);
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await expectElementVisible('Chương 1: Kiến thức cơ bản', 'text');
    await tapIdAtIndex('btnBack');

    //DO NOT see Training Course with status UNVERIFIED
    await initData('user/updateUser', [
      { Phone: '0834567890', Status: 'UNVERIFIED' },
    ]);
    await expectElementNotVisible('Chương trình đào tạo');
  });

  it.only('LINE 83 - ACTIVE TASKER see welcome dialog', async () => { //Tasker thấy chương trình đào tạo khi tài khoản được active.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');
    await tapText('Đồng ý');

  });
  it('LINE 97 - ACTIVE TASKER see welcome dialog from lesson detail screen', async () => { //Tasker thấy chương trình đào tạo.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000, 'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Mô hình bTaskee là gì?', 2000, 'text');
    await tapText('Mô hình bTaskee là gì?');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');
    await tapText('Đồng ý');
  });

  it('LINE 114 - ACTIVE TASKER see welcome dialog from quizz detail screen', async () => { //Tasker thấy các bài kiểm tra.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await expectElementVisible('Bài kiểm tra: thái độ, tác phong, ứng xử', 'text');
    await tapText('Bài kiểm tra: thái độ, tác phong, ứng xử');
    await waitForElement('quizzTitleBài kiểm tra: thái độ, tác phong, ứng xử', 2000);
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');
    await tapText('Đồng ý');
  });

  it('LINE 131 - ACTIVE TASKER do not see submit button if app is in view mode', async () => { //Không hiện button submit nếu đang chế độ view
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000, 'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Mô hình bTaskee là gì?', 2000, 'text');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'bottom');      
    } else {
      await swipe('lessonList', 'up');
    }
    await expectElementNotVisible('submitButtonInLesson');
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'bottom');      
    } else {
      await swipe('lessonList', 'up');
    }
    await expectElementVisible('submitButtonInLesson');
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: false, resetData: false}});
    await tapText('Bài kiểm tra tổng quát');
    await waitForElement('quizzTitleBài kiểm tra tổng quát', 2000);    
    await expectElementNotVisible('submitButtonInQuizz');
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'bottom');      
    } else {
      await swipe('lessonList', 'up');
    }
    await tapText('Bài kiểm tra tổng quát');
    await expectElementVisible('submitButtonInQuizz',);
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: false, resetData: false}});
    await expectElementNotVisible('submitButtonInQuizz');
    await tapIdAtIndex('btnBack');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'top');
    } else {
      await swipe('lessonList', 'down');
      await swipe('lessonList', 'down');
    }

    await tapText('Mô hình bTaskee là gì?');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');      
    } else {
      await swipe('lessonDetail', 'up');
    }
    await expectElementNotVisible('finishButton');
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    await tapText('Mô hình bTaskee là gì?');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');      
    } else {
      await swipe('lessonDetail', 'up');
    }
    await expectElementVisible('finishButton');
  });

  it('LINE 201 - ACTIVE TASKER finish a lesson', async () => { //Tasker kết thúc bài học.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000, 'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    await waitForElement('Mô hình bTaskee là gì?', 2000, 'text');
    await tapText('Mô hình bTaskee là gì?');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');      
    } else {
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');
    await waitForElement('lessonMô tả cách nhận việc', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');      
    } else {
      await swipe('lessonDetail', 'up');
    }
    await expectElementNotVisible('finishButton');
  });

  it('LINE 233 - ACTIVE Tasker use the next button', async () => { //Taser sử dụng button tiếp theo.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await tapText('Mô hình bTaskee là gì?');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonMô tả cách nhận việc', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonLợi ích khi trở thành bTasker', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonThái độ', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonTác phong', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonỨng xử', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: thái độ, tác phong, ứng xử', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonQuy tắc vệ sinh nhà cửa chung', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: quy tắc vệ sinh nhà cửa chung', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonDụng cụ dọn dẹp', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: dụng cụ dọn dẹp', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonCách sử dụng chất tẩy rửa', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: cách sử dụng chất tẩy rửa', 2000);
    await tapId('tapNextLesson');    
    await waitForElement('lessonDọn nhà bếp', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn nhà bếp', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonDọn phòng ngủ', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn phòng ngủ', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonDọn phòng khách', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn phòng khách', 2000);
    await tapId('tapNextLesson');
    await waitForElement('lessonDọn nhà vệ sinh', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn nhà vệ sinh', 2000);
    await tapId('tapNextLesson');
    await waitForElement('quizzTitleBài kiểm tra tổng quát', 2000);
  });

  it('LINE 288 - ACTIVE Tasker use the previous button', async () => { //Tasker sủ dụng button quay lại.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'bottom');      
    } else {
      await swipe('lessonList', 'up');
      await swipe('lessonList', 'up');
    }
    await tapText('Bài kiểm tra tổng quát');
    await waitForElement('quizzTitleBài kiểm tra tổng quát', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn nhà vệ sinh', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonDọn nhà vệ sinh', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn phòng khách', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonDọn phòng khách', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn phòng ngủ', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonDọn phòng ngủ', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: dọn nhà bếp', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonDọn nhà bếp', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: cách sử dụng chất tẩy rửa', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonCách sử dụng chất tẩy rửa', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: dụng cụ dọn dẹp', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonDụng cụ dọn dẹp', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: quy tắc vệ sinh nhà cửa chung', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonQuy tắc vệ sinh nhà cửa chung', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('quizzTitleBài kiểm tra: thái độ, tác phong, ứng xử', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonỨng xử', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonTác phong', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonThái độ', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonLợi ích khi trở thành bTasker', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonMô tả cách nhận việc', 2000);
    await tapId('tapPreviousLesson');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
  });

  it('LINE 349 - ACTIVE Tasker finish a lesson before going to next lesson', async () => { //Tasker hoàn thành bài học mới có thể qua bài tiếp theo.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 2000, 'text');   
    await tapText('Đồng ý');
    await tapText('Mô hình bTaskee là gì?');
    await waitForElement('lessonMô hình bTaskee là gì?', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');      
    } else {
      await swipe('lessonDetail', 'up');
    }
    await tapId('tapNextLesson');
    await waitForElement('Vui lòng học bài, sau đó bấm vào nút Hoàn thành trước khi sang bài học tiếp theo', 2000, 'text');
    await tapText('Đóng');
    await tapId('finishButton');
    await waitForElement('lessonMô tả cách nhận việc', 2000);
  });

  it('LINE 375 - ACTIVE Tasker fill in all answers before going to next lesson', async () => { //Taser trả lời tất cả câu hỏi mới có thể sang bài học mới.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    await tapText('Bài kiểm tra: thái độ, tác phong, ứng xử');
    await tapId('tapNextLesson');
    await waitForElement('Vui lòng trả lời tất cả câu hỏi trước khi sang bài mới', 1000, 'text');
    await tapText('Đóng');
    await tapText('Gọi khách hàng nhờ chỉ địa chỉ nhà');
    await tapText('Không tìm được địa chỉ khách hàng');

    if (device.getPlatform() === 'ios') {
      await scroll('quizzDetail', 300, 'down');      
    } else {
      await swipe('quizzDetail', 'up');      
    }
    await tapText('Chào khách, giới thiệu tên, đến từ công ty bTaskee để dọn dẹp nhà cho khách. Hỏi khách cần mình làm gì trước và nơi để dụng cụ làm việc.');
    if (device.getPlatform() === 'ios') {
      await scroll('quizzDetail', 250, 'down');
    } else {
      await swipe('quizzDetail', 'up');      
    }
    await tapText('Luôn luôn mặc đồng phục của công ty khi làm việc');
    await tapText('Sai');
    await tapId('tapNextLesson');
    await waitForElement('lessonQuy tắc vệ sinh nhà cửa chung', 2000);
  });

  it('LINE 411 - ACTIVE Tasker do quizzes and pass the course', async () => { //Tasker làm bài kiểm tra và pass.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    await waitForElement('bTaskee là gì', 1500, 'text');
    await waitForElement('Mô hình bTaskee là gì?', 1000, 'text');
    //Mô hình btaskee là gì
    await tapText('Mô hình bTaskee là gì?');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');      
    } else {
      await swipe('lessonDetail', 'up');
    }
    await waitForElement('finishButton', 1000);
    await tapId('finishButton');

    //Mô tả cách nhận việc
    await waitForElement('lessonMô tả cách nhận việc', 2000);
    await tapId('finishButton');

    //Lợi ích khi trở thành bTasker
    await waitForElement('lessonLợi ích khi trở thành bTasker', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');

    //Thái độ
    await waitForElement('lessonThái độ', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await waitForElement('finishButton', 1000);
    await tapId('finishButton');

    //Tác phong
    await waitForElement('lessonTác phong', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await waitForElement('finishButton', 1000);
    await tapId('finishButton');

    //Ứng xử
    await waitForElement('lessonỨng xử', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await waitForElement('finishButton', 1000);
    await tapId('finishButton');

    //Bài kiểm tra: thái độ, tác phong, ứng xử
    await waitForElement('quizzTitleBài kiểm tra: thái độ, tác phong, ứng xử', 2000);
    await tapText('Gọi khách hàng nhờ chỉ địa chỉ nhà');
    await tapText('Không tìm được địa chỉ khách hàng');

    if (device.getPlatform() === 'ios') {
      await scroll('quizzDetail', 300, 'down');
    } else {
      await swipe('quizzDetail', 'up');
    }
    
    await tapText('Chào khách, giới thiệu tên, đến từ công ty bTaskee để dọn dẹp nhà cho khách. Hỏi khách cần mình làm gì trước và nơi để dụng cụ làm việc.');
    if (device.getPlatform() === 'ios') {
      await scroll('quizzDetail', 250, 'down');
    } else {
      await swipe('quizzDetail', 'up');      
    }
    await tapText('Luôn luôn mặc đồng phục của công ty khi làm việc');
    await tapText('Sai');
    await tapId('tapNextLesson');

    //Qui tắc vệ sinh nhà cửa chung
    await waitForElement('lessonQuy tắc vệ sinh nhà cửa chung', 2000);
    await tapId('finishButton');

    //Bài kiểm tra: qui tắc vệ sinh nhà cửa chung
    await waitForElement('quizzTitleBài kiểm tra: quy tắc vệ sinh nhà cửa chung', 2000);
    await tapText('Nhà tắm/toilet');
    await tapText('Đúng');
    await tapText('Vứt rác sau khi dọn vệ sinh xong');
    await tapId('tapNextLesson');

    //Dụng cụ dọn dẹp
    await waitForElement('lessonDụng cụ dọn dẹp', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');

    //Bài kiểm tra: dụng cụ dọn dẹp
    await waitForElement('quizzTitleBài kiểm tra: dụng cụ dọn dẹp', 2000);
    await tapText('Nước rửa chén, nước xịt kính, giấm');
    await tapText('Vim, kem tẩy đa năng');
    await tapText('Không đổ lông, không gây trầy xước');
    if (device.getPlatform() === 'ios') { 
      await scroll('quizzDetail', 300, 'down');
      await tapText('Lăn tóc và bụi trên sàn');
      await tapText('Lăn bụi trên quần áo');
      await scroll('quizzDetail', 200, 'down');
      await tapText('Có. Găng tay sẽ giúp bảo vệ da tay và sức khỏe');
      await tapId('choose-3-0');
      await scroll('quizzDetail', 300, 'down');
      await tapText('Gạt nước trên mặt gương, kính');
      await tapText('Gạt nước dưới sàn còn ướt');
      await tapId('choose-6-0');
      await scrollTo('quizzDetail', 'bottom');
      await tapText('Dựa vào màu sắc để ghi nhớ công dụng cụ thể từng khăn');
    } else {
      await swipe('quizzDetail', 'up');
      await tapText('Lăn tóc và bụi trên sàn');
      await tapText('Lăn bụi trên quần áo');
      await tapId('choose-3-0');
      await swipe('quizzDetail', 'up');
      await tapText('Có. Găng tay sẽ giúp bảo vệ da tay và sức khỏe');
      await tapText('Gạt nước trên mặt gương, kính');
      await tapText('Gạt nước dưới sàn còn ướt');
      await tapId('choose-6-0');
      await swipe('quizzDetail', 'up');
      await tapText('Dựa vào màu sắc để ghi nhớ công dụng cụ thể từng khăn');
    }
    await tapId('tapNextLesson');

    //Cách sử dụng chất tẩy rửa
    await waitForElement('lessonCách sử dụng chất tẩy rửa', 2000);

    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');

    //Bài kiểm tra: cách sử dụng chất tẩy rửa
    await waitForElement('quizzTitleBài kiểm tra: cách sử dụng chất tẩy rửa', 2000);
    await tapText('Loại bỏ cặn bã, tẩy vết ố bám');
    await tapText('Làm sáng gương');
    await tapText('Làm sạch sàn');
    await tapText('Chỉ sử dụng khi biết công dụng chính xác của nó');
    await tapText('Tuyệt đối không sử dụng chất tẩy rửa mạnh cho các vật dụng inox');
    await tapText('Sau khi sử dụng cần rửa lại bằng nước sạch để đảm bảo sức khỏe cho gia đình khách');
    if (device.getPlatform() === 'ios') {
      await scrollTo('quizzDetail', 'bottom');
      await tapText('Có thể đem theo, nhưng phải hỏi Khách xem có được sử dụng hay không.');
    } else {
      await swipe('quizzDetail', 'up');
      await tapText('Có thể đem theo, nhưng phải hỏi Khách xem có được sử dụng hay không.');
    }
    await tapId('tapNextLesson');

    //Dọn nhà bếp
    await waitForElement('lessonDọn nhà bếp', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');

    //Bài kiểm tra: dọn nhà bếp
    await waitForElement('quizzTitleBài kiểm tra: dọn nhà bếp', 2000);
    await tapText('Được. Nước lau kính không gây hư hại nếu sử dụng đúng cách');
    await tapText('Tủ và tường bếp');
    await tapId('tapNextLesson');

    //Dọn phòng ngủ
    await waitForElement('lessonDọn phòng ngủ', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');

    //Bài kiểm tra: dọn phòng ngủ
    await waitForElement('quizzTitleBài kiểm tra: dọn phòng ngủ', 2000);
    await tapText('Tất cả các đáp án trên');
    await tapText('Mở cửa khi thao tác bên trong phòng');
    await tapText('Gỡ ga cũ và thay ga mới hoặc mang đi giặt nếu khách yêu cầu');
    await tapText('Mở rèm cửa cho thông thoáng trước khi bắt đầu làm');
    if (device.getPlatform() === 'ios') {
      await scroll('quizzDetail', 450, 'down');
      await tapText('Dùng khăn ẩm vắt khô để lau');
      await tapText('Gỡ ga cũ và thay ga mới hoặc mang đi giặt; dùng khăn ẩm lau đầu gường, sắp xếp lại gối mền.');
      await scrollTo('quizzDetail', 'bottom');
      await tapText('Sai. quét trước cho bớt rác và bụi rồi lau');
    } else {
      await swipe('quizzDetail', 'up');
      await tapText('Dùng khăn ẩm vắt khô để lau');
      await tapText('Gỡ ga cũ và thay ga mới hoặc mang đi giặt; dùng khăn ẩm lau đầu gường, sắp xếp lại gối mền.');
      await swipe('quizzDetail', 'up');
      await tapText('Sai. quét trước cho bớt rác và bụi rồi lau');
    }
    await tapId('tapNextLesson');

    //Dọn dẹp phòng khách
    await waitForElement('lessonDọn phòng khách', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');

    //Bài kiểm tra dọn phòng khách
    await waitForElement('quizzTitleBài kiểm tra: dọn phòng khách', 2000);
    await tapText('Khăn ẩm đã được vắt khô');
    await tapText('Xịt nước lau kính lên khăn rồi lau');
    await tapText('Đem đi rửa');
    await tapId('tapNextLesson');

    //Dọn nhà vệ sinh
    await waitForElement('lessonDọn nhà vệ sinh', 2000);
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonDetail', 'bottom');
    } else {
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
      await swipe('lessonDetail', 'up');
    }
    await tapId('finishButton');
    //Bài kiểm tra: dọn nhà vệ sinh
    await waitForElement('quizzTitleBài kiểm tra: dọn nhà vệ sinh', 2000);
    await tapText('Lấy tóc, rác trên miệng nắp cống');
    await tapText('Đổ và thay bọc rác');
    await tapText('Làm khô sàn nhà vệ sinh');
    await tapText('Đúng. Vì sẽ tiết kiệm được thời gian và hiệu quả tẩy rửa cao hơn');
    await tapId('tapNextLesson');

    await waitForElement('quizzTitleBài kiểm tra tổng quát', 2000);
    await tapText('Gom rác, lau dọn tủ, bàn ghế và các đồ vật từ trên xuống dưới, chú ý nóc và gầm bàn, ghế và gầm tủ và cuối cùng là sắp xếp lại đồ đạc vào vị trí cũ.');
    await tapText('Kiểm tra vệ sinh bàn ủi, kiểm tra nhiệt độ bàn ủi đảm bảo phù hợp với đồ cần ủi.');
    await scroll('quizzDetail', 470, 'down');
    await tapText('Phủi bụi thảm và mang đi phơi để tránh dơ thảm trong quá trình dọn dẹp');
    await tapText('Dọn dẹp lau chùi, vệ sinh nhà cửa, giặt quần áo, ủi đồ, nấu ăn');
    await scroll('quizzDetail', 470, 'down');
    await tapText('Từ trên xuống dưới từ trong ra ngoài làm đến đâu gọn sạch đến đó theo hình thức cuốn chiếu');
    await tapText('Phân loại quần áo trắng, quần áo màu đậm, quần áo màu nhạt để tránh bị lem màu khi giặt');
    await scroll('quizzDetail', 470, 'down');
    await tapText('Nhà vệ sinh vì là nơi dùng để sử dụng và vệ sinh các công cụ vệ sinh cần thiết cho các công việc tiếp theo');
    await tapId('choose-7-1');
    await scroll('quizzDetail', 200, 'down');
    await tapText('Lau bằng khăn ướt vắt thật khô');
    if (device.getPlatform() === 'android') {
      await scroll('quizzDetail', 470, 'down');
    }
    await tapText('Cho Vim vệ sinh vào bồn cầu để ngâm');
    await scroll('quizzDetail', 470, 'down');
    await tapText('Dùng dung dịch lau kính xịt lên bề mặt kính, tiếp theo dùng khăn mềm hoặc các công cụ gạt kính để làm sạch và lau khô');
    await scroll('quizzDetail', 350, 'down');
    await tapText('Hỏi khách xem có cần thay ga giường, gối không? Sau đó phủi bụi và làm giường trước rồi mới lau bụi bàn ghế, giường và quét, lau sàn');
    // await tapText('Sắp xếp các dụng cụ trên bếp gọn gàng, bỏ chén dĩa và ly tách dơ vào bồn rửa ngâm trong 5 phút bằng nước thường hoặc nước ấm để giảm độ bám của chất bẩn, đầu mỡ…');
    await tapText('Lau chùi các dụng cụ trên bếp trước (lò vi sóng, lò nướng, bếp…) sau đó đến mặt bếp');
    await tapId('submitButtonInQuizz');
    await waitForElement('Bạn chắc chắn muốn nộp bài?', 2000, 'text');
    await tapId('Đồng ý');
    await waitForElement('Bạn đã trả lời được 42 trong 43 câu hỏi. Chúc mừng bạn đã vượt qua bài kiểm tra.', 3000, 'text');
    await tapText('Đóng');
  });

  it('LINE 716 - ACTIVE Tasker do quizzes and does not pass the course', async () => { //Tasker không làm bài kiểm tra và không đậu.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    await waitForElement('bTaskee là gì', 1500, 'text');
    await waitForElement('Mô hình bTaskee là gì?', 1000, 'text');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'bottom');      
    } else {
      await swipe('lessonList', 'up');
      await swipe('lessonList', 'up');
    }
    await tapId('submitButtonInLesson');
    await waitForElement('Vui lòng học bài và làm các bài kiểm tra trước khi bấm nút nộp bài', 2000, 'text');
    await tapText('Đóng');
    await tapText('Bài kiểm tra tổng quát');
    await waitForElement('quizzTitleBài kiểm tra tổng quát', 2000);
    await tapId('choose-0-1');
    await tapIdAtIndex('btnBack');
    await tapId('submitButtonInLesson');
    await waitForElement('Bạn chắc chắn muốn nộp bài?', 2000, 'text');
    await tapId('Đồng ý');
    await waitForElement('Bạn đã trả lời được 0 trong 43 câu hỏi. Rất tiếc, bạn không vượt qua bài kiểm tra.', 4000, 'text');
    await tapText('Đóng');
    await tapId('seeResult');
    await waitForElement('Bạn đã trả lời được 0 trong 43 câu hỏi. Rất tiếc, bạn không vượt qua bài kiểm tra.', 4000, 'text');
    await tapText('Đóng');
  });

  it('LINE 753 - ACTIVE Tasker do quizzes and do not pass the course', async () => { //Tasker làm 1 trong 43 câu hỏi và không đậu.
    await initData('trainingTasker/changeDoQuizzPermission', {phone: '0834567891', trainingPermission: {ableDoQuizz: true, resetData: true}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chương trình đào tạo');
    await tapText('Chương trình đào tạo');
    await waitForLoading(2000);
    await waitForElement('Chương 1: Kiến thức cơ bản', 2000,'text');
    await tapText('Chương 1: Kiến thức cơ bản');
    await waitForElement('Bạn đang bước vào khoá học của bTaskee. Nếu đã sẵn sàng, vui lòng bấm Đồng ý', 1000, 'text');   
    await tapText('Đồng ý');
    await waitForElement('bTaskee là gì', 1500, 'text');
    await waitForElement('Mô hình bTaskee là gì?', 1000, 'text');
    await tapText('Bài kiểm tra: thái độ, tác phong, ứng xử');
    await waitForElement('quizzTitleBài kiểm tra: thái độ, tác phong, ứng xử', 2000);
    await tapText('Gọi khách hàng nhờ chỉ địa chỉ nhà');
    await tapIdAtIndex('btnBack');
    if (device.getPlatform() === 'ios') {
      await scrollTo('lessonList', 'bottom');      
    } else {
      await swipe('lessonList', 'up');
      await swipe('lessonList', 'up');
      await swipe('lessonList', 'up');
    }
    await tapId('submitButtonInLesson');
    await waitForElement('Bạn chắc chắn muốn nộp bài?', 1000, 'text');
    await tapId('Đồng ý');
    await waitForElement('Bạn đã trả lời được 1 trong 43 câu hỏi. Rất tiếc, bạn không vượt qua bài kiểm tra.', 2000, 'text');
    await tapText('Đóng');
    await tapId('seeResult');
    await waitForElement('Bạn đã trả lời được 1 trong 43 câu hỏi. Rất tiếc, bạn không vượt qua bài kiểm tra.', 2000, 'text');
    await tapText('Đóng');
  });
});

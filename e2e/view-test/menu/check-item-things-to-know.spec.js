const {
    initData,
    loginWithPhoneAndPassword,
    tapId,
    tapText,
    waitForElement,
    expectElementVisible,
    swipe,
    expectElementVisibleAtIndex,
    expectElementNotExist, expectElementNotVisible
  } = require('../../step-definitions');
  
  describe('FILE: view-test/menu/check-items-things-to-know.spec.js - Check menu UI', () => {
    beforeEach(async () => {
      await initData('user/createUser', [
        { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      ]);
      await device.reloadReactNative();
    });

    it('LINE 21 - Check item Things to know', async () => { //Kiểm tra item những điều cần biết.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Quy trình làm việc với 7 bước', 'text');
      await expectElementVisible('Chuyên môn', 'text');
    });
    it('LINE 37 - Check working process ', async () => { //Kiểm tra quy trình làm việc 7 bước.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Quy trình làm việc với 7 bước', 'text');
      await tapText('Quy trình làm việc với 7 bước', 'text');
      await expectElementVisible('Khi có thông báo công việc mới, mở ứng dụng lên hoặc bấm vào thông báo để xem công việc.', 'text');
    });
    it('LINE 54 - Check specialize ', async () => { //Kiểm tra item chuyên môn.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Chuyên môn', 'text');
      await tapText('Chuyên môn', 'text');
      await expectElementVisible('Qui trình chung', 'text');
      await expectElementVisible('Dọn dẹp bếp', 'text');
      await tapText('Qui trình chung', 'text');
      await expectElementVisible('- Dọn dẹp theo quy tắc: từ trên xuống dưới và từ trong ra ngoài.', 'text');
    });
    it('LINE 74 - Check how to get 5 start ', async () => { //Kiểm tra nội dung làm sao để được 5 sao.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Làm sao để được 5 sao?', 'text');
      await tapText('Làm sao để được 5 sao?', 'text');
      await expectElementVisible('- Chủ động liên lạc và chat với khách hàng', 'text');
    });
    it('LINE 91 - Check Regulations and Benefits ', async () => { //Kiểm tra nội dung quy định và lợi ích.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Quy định và lợi ích', 'text');
      await tapText('Quy định và lợi ích', 'text');
      await expectElementVisible('Lợi ích khi là CTV của bTaskee', 'text');
      await tapText('Lợi ích khi là CTV của bTaskee', 'text');
      await expectElementVisible('- Thu nhập cao và ổn định.', 'text');
      await tapText('Lợi ích khi là CTV của bTaskee', 'text');
      await expectElementNotVisible('- Thu nhập cao và ổn định.', 'text');
      await tapText('Các quy định', 'text');
      await expectElementVisible('- Làm đúng theo quy trình nhận và làm việc.', 'text');
      await tapText('Các quy định', 'text');
      await expectElementNotVisible('- Làm đúng theo quy trình nhận và làm việc.', 'text');
      await tapText('Thưởng', 'text');
      await expectElementVisible('- CTV sẽ nhận phần thưởng theo mức độ công việc hoàn thành sau:', 'text');
      await tapText('Thưởng', 'text');
      await expectElementNotVisible('- CTV sẽ nhận phần thưởng theo mức độ công việc hoàn thành sau:', 'text');
      await tapText('Phạt', 'text');
      await expectElementVisible('- THƯƠNG LƯỢNG RIÊNG với khách: khóa tài khoản vĩnh viễn và phạt bồi thường 5.000.000 (5 triệu) VND.', 'text');
      await tapText('Phạt', 'text');
      await expectElementNotVisible('- THƯƠNG LƯỢNG RIÊNG với khách: khóa tài khoản vĩnh viễn và phạt bồi thường 5.000.000 (5 triệu) VND.', 'text');
    });
    it('LINE 124 - Check Question and reply ', async () => { //Kiểm tra Câu hỏi và trả lời.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Câu hỏi và trả lời?', 'text');
      await tapText('Câu hỏi và trả lời?', 'text');
      await expectElementVisible('Công việc thanh toán bằng hình thức chuyển khoản là gì ?', 'text');
      await tapText('Công việc thanh toán bằng hình thức chuyển khoản là gì ?', 'text');
      await expectElementVisible('- Đây là những công việc khách hàng chọn thanh toán bằng thẻ, không phải tiền mặt.', 'text');
      await tapText('Công việc thanh toán bằng hình thức chuyển khoản là gì ?', 'text');
      await expectElementNotVisible('- Đây là những công việc khách hàng chọn thanh toán bằng thẻ, không phải tiền mặt.','text')
      await tapText('Nếu làm nhiều hơn thời gian khách đặt thì sao ?', 'text');
      await expectElementVisible('- Nếu làm lố từ 15 – 30 phút, các chị có thể khéo léo trao đổi với khách lúc thanh toán : “ Dạ, anh/chị đặt 2h mà em làm 2h30 phút đấy ạ “.', 'text');
      await tapText('Nếu làm nhiều hơn thời gian khách đặt thì sao ?', 'text');
      await expectElementNotVisible('- Nếu làm lố từ 15 – 30 phút, các chị có thể khéo léo trao đổi với khách lúc thanh toán : “ Dạ, anh/chị đặt 2h mà em làm 2h30 phút đấy ạ “.','text')
      await tapText('Nếu khách đặt công việc không yêu cầu mang theo dụng cụ và nhà khách cũng không có dụng cụ thì sao ?', 'text');
      await expectElementVisible('- Khi đến nhà khách gặp trường hợp này các chị thông báo là do khách không yêu cầu “ Mang theo dụng cụ “ nên các chị không mang theo và khéo léo hỏi khách xem có bất cứ dụng cụ cũng như hóa chất gì để dọn dẹp không, nếu khách có và đồng ý để mình sử dụng dọn dẹp thì các chị cố gắng tận dụng và hoàn thành tốt nhất công việc có thể.  Hoàn thành công việc nhớ báo lại với khách do không đầy đủ dụng cụ nên có thể chưa được kỹ và nhắc khách lần tới nhớ chọn chức năng “ Mang theo dụng cụ “.', 'text');
      await tapText('Nếu khách đặt công việc không yêu cầu mang theo dụng cụ và nhà khách cũng không có dụng cụ thì sao ?', 'text');
      await expectElementNotVisible('- Khi đến nhà khách gặp trường hợp này các chị thông báo là do khách không yêu cầu “ Mang theo dụng cụ “ nên các chị không mang theo và khéo léo hỏi khách xem có bất cứ dụng cụ cũng như hóa chất gì để dọn dẹp không, nếu khách có và đồng ý để mình sử dụng dọn dẹp thì các chị cố gắng tận dụng và hoàn thành tốt nhất công việc có thể.  Hoàn thành công việc nhớ báo lại với khách do không đầy đủ dụng cụ nên có thể chưa được kỹ và nhắc khách lần tới nhớ chọn chức năng “ Mang theo dụng cụ “.','text')
      await tapText('Xem số sao mà khách đánh giá cho mình ở đâu ?', 'text');
      await expectElementVisible('- Hằng tuần hệ thống sẽ tổng kết xem tuần đó chị làm được bao nhiêu công việc và có bao nhiêu đánh giá sao tốt,xấu, khách hàng đánh giá như thế nào . Các chị có thể xem trong mục “ Tổng Kết Hàng Tuần “ từ đó rút kinh nghiệm cho những công việc sau tốt hơn.', 'text');
      await tapText('Xem số sao mà khách đánh giá cho mình ở đâu ?', 'text');
      await expectElementNotVisible('- Hằng tuần hệ thống sẽ tổng kết xem tuần đó chị làm được bao nhiêu công việc và có bao nhiêu đánh giá sao tốt,xấu, khách hàng đánh giá như thế nào . Các chị có thể xem trong mục “ Tổng Kết Hàng Tuần “ từ đó rút kinh nghiệm cho những công việc sau tốt hơn.','text')
      await tapText('Nếu khách hàng là người nước ngoài, mình không hiểu khách nói gì thì sao ?', 'text');
      await expectElementVisible('- Nếu khách là người nước ngoài, và trao đổi công việc nhưng các chị không hiểu, hãy gọi về công ty theo số hotline để được hỗ trợ.', 'text');
      await tapText('Nếu khách hàng là người nước ngoài, mình không hiểu khách nói gì thì sao ?', 'text');
      await expectElementNotVisible('- Nếu khách là người nước ngoài, và trao đổi công việc nhưng các chị không hiểu, hãy gọi về công ty theo số hotline để được hỗ trợ.','text')
      await tapText('Lỡ chị làm hư đồ nhà khách thì sao ?', 'text');
      await expectElementVisible('- Trong bảng cam kết có ghi rõ, khi chị đến nhà khách làm nếu làm hư hại đồ nhà khách các chị phải chịu trách nhiệm bồi thường cho khách nếu họ yêu cầu. Phải thông báo ngay với khách về đồ vật bị mình làm hư hại, tuyệt đối không giấu đi.', 'text');
      await tapText('Lỡ chị làm hư đồ nhà khách thì sao ?', 'text');
      await expectElementNotVisible('- Trong bảng cam kết có ghi rõ, khi chị đến nhà khách làm nếu làm hư hại đồ nhà khách các chị phải chịu trách nhiệm bồi thường cho khách nếu họ yêu cầu. Phải thông báo ngay với khách về đồ vật bị mình làm hư hại, tuyệt đối không giấu đi.','text')
      await tapText('Tài khoản bị trừ tiền khi chưa đi làm ?', 'text');
      await swipe('scrollviewQuestionAndReply', 'up');
      await expectElementVisible('- Các chị kiểm tra trong THÔNG TIN TÀI CHÍNH , có mục CÁC CÔNG VIỆC ĐANG NHẬN, bên cạnh có ghi số tiền sẽ bị trừ, số tiền này là số tiền sẽ bị trừ cho những công việc mà chị đã nhận và đang nằm trong mục XÁC NHẬN và cả CHỜ XÁC NHẬN, mục này chỉ là trừ ảo, khi nào chị đến nhà khách làm và hoàn thành công việc thì mới bị trừ thật .', 'text');
      await tapText('Tài khoản bị trừ tiền khi chưa đi làm ?', 'text');
      await expectElementNotVisible('- Các chị kiểm tra trong THÔNG TIN TÀI CHÍNH , có mục CÁC CÔNG VIỆC ĐANG NHẬN, bên cạnh có ghi số tiền sẽ bị trừ, số tiền này là số tiền sẽ bị trừ cho những công việc mà chị đã nhận và đang nằm trong mục XÁC NHẬN và cả CHỜ XÁC NHẬN, mục này chỉ là trừ ảo, khi nào chị đến nhà khách làm và hoàn thành công việc thì mới bị trừ thật .','text')
    });
    it('LINE 170 - Check Insurance policy ', async () => { //Kiểm tra nội dung chính sách bảo hiểm.
      await initData('service/createNewService', [
        { Icon: '/icons/service-icon/laundry.png', Vi: 'Giặt ủi', En: 'Laundry', Ko: 'Laundry', Cost: 100000, Weight: 10 },
      ]);
      await initData('serviceChannel/updateServiceChannel', [
        { Service:'Giặt ủi', Phone: '0834567890', Action: 'Add' },
      ]);
      await loginWithPhoneAndPassword('0834567890', '123456');
      await waitForElement('bTaskee', 1000, 'text');
      await tapId('btnMenu');
      await swipe('scrollViewMenu', 'up');
      await expectElementVisible('Những điều cần biết', 'text');
      await tapText('Những điều cần biết', 'text');
      await expectElementVisible('Chính sách bảo hiểm', 'text');
      await tapText('Chính sách bảo hiểm', 'text');
      await expectElementVisible('THÔNG BÁO VỀ VIỆC BẢO HIỂM TAI NẠN DÀNH CHO CTV CỦA BTASKEE', 'text');
    });
});

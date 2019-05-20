const {
    initData,
    loginWithPhoneAndPassword,
    typeToTextField,
    tapId,
    tapText,
    waitForElement,
    expectElementVisible, tapIdAtIndex, swipe,expectElementNotVisible, scrollTo
  } = require('../../../step-definitions');
  
  describe('FILE:  view-text/menu/check-things-to-known-item/check-things-to-known-items.spec.js - things-to-known', () => {
    beforeEach(async () => {
      await initData('user/createUser', [
        { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      ]);
      await device.reloadReactNative();
    });

      it('LINE 19 - Test view profile items', async () => { //Kiểm tra danh mục những điều cần biết.
        await loginWithPhoneAndPassword('0834567890', '123456');
        await tapId('btnMenu');
        await swipe('scrollViewMenu', 'up');
        await tapText('Những điều cần biết')
        await waitForElement('NHỮNG ĐIỀU CẦN BIẾT', 1000, 'text');
        await expectElementVisible('Quy trình làm việc với 7 bước','text')
        await expectElementVisible('Chuyên môn','text')
        await expectElementVisible('Làm sao để được 5 sao?','text')
        await expectElementVisible('Quy định và lợi ích','text')
        await expectElementVisible('Câu hỏi và trả lời?','text')
        await expectElementVisible('Chính sách bảo hiểm','text')
      });

      it('LINE 33 - Test PROCESS_WORK_FLOW items', async () => { // kiểm tra quy trình làm việc 7 bước của những điều cần biết.
        await loginWithPhoneAndPassword('0834567890', '123456');
        await tapId('btnMenu');
        await swipe('scrollViewMenu', 'up');
        await tapText('Những điều cần biết')
        await waitForElement('NHỮNG ĐIỀU CẦN BIẾT', 1000, 'text');
        await tapText('Quy trình làm việc với 7 bước')
        await expectElementVisible('Khi có thông báo công việc mới, mở ứng dụng lên hoặc bấm vào thông báo để xem công việc.','text')
        await expectElementVisible('imgB1aWorkingWorkflow')
        await expectElementVisible('- Hoặc bấm hình con ong xanh để mở ứng dụng','text')
        await swipe('scrollviewB1WorkingWorkflow','up')
        await expectElementVisible('imgB1bWorkingWorkflow')
        await swipe('swiperWorkingWorkflow','left')
        await expectElementVisible('Đọc kỹ nội dung và yêu cầu công việc. Chú ý ĐỊA CHỈ và THỜI GIAN LÀM VIỆC','text')
        await expectElementVisible('imgB2aWorkingWorkflow')
        await scrollTo('scrollviewB2WorkingWorkflow','bottom')
        await expectElementVisible('imgB2bWorkingWorkflow')
        await swipe('swiperWorkingWorkflow','left')
        await expectElementVisible('Bấm vào ô “Bạn đã đọc kỹ thông tin và muốn nhận việc” sau đó bấm “Nhận việc”.','text')
        await swipe('scrollviewB3WorkingWorkflow','up')
        await expectElementVisible('imgB3aWorkingWorkflow')
        await swipe('swiperWorkingWorkflow','left')
        await expectElementVisible('Để tiết kiệm chi phí cho các chị, sau khi nhận việc thành công, các chị xác nhận lại với khách bằng cách bấm vào chức năng “CHAT” và chat xác nhận với khách.','text')
        await expectElementVisible('imgB4aWorkingWorkflow')
        await scrollTo('scrollviewB4WorkingWorkflow','bottom')
        await expectElementVisible('imgB4cWorkingWorkflow')
        await swipe('swiperWorkingWorkflow','left')
        await expectElementVisible('GỌI XÁC NHẬN cho khách trước khi đến làm.','text')
        await expectElementVisible('imgB5aWorkingWorkflow')
        await swipe('swiperWorkingWorkflow','left')
        await expectElementVisible('Khi đến nhà khách, tươi cười niềm nở với khách và nói:','text')
        await expectElementVisible('Chào anh/chị, tôi/em tên là…., cộng tác viên của bTaskee, đến để dọn dẹp nhà cho anh/chi trong … giờ.','text')
        await expectElementVisible('imgB6aWorkingWorkflow')
        await swipe('swiperWorkingWorkflow','left')
        await expectElementVisible('- Sau khi hoàn thành công việc báo khách kiểm tra lại.','text')
        await expectElementVisible('- Nếu khách yêu cầu làm lại chỗ nào thì mình vui vẻ làm lại thêm một vài phút nhằm mục đích ghi điểm và giữ khách hàng, họ sẽ đánh sao tốt, lần sau sẽ muốn mình đến làm nữa.','text')
        await expectElementVisible('- Thu đúng số tiền trên ứng dụng. Tuyệt đối không yêu cầu khách hàng trả tiền mặt khi công việc là chuyển khoản.','text')
        await expectElementVisible('- Mở ứng dụng bTaskee bấm “ Hoàn Tất “, sau đó đánh giá khách hàng (nếu được đánh giá).','text')
        await swipe('scrollviewB7WorkingWorkflow','up')
        await expectElementVisible('- Trước khi ra về, cám ơn khách và nhờ khách đặt lại công việc trên ứng dụng nếu lần tới có nhu cầu.','text')  
      });

      it('LINE 82 - Test SPECIALIZE items', async () => { //Kiểm tra nội dung chuyên môn của những điều cần biết.
        await loginWithPhoneAndPassword('0834567890', '123456');
        await tapId('btnMenu');
        await swipe('scrollViewMenu', 'up');
        await tapText('Những điều cần biết')
        await waitForElement('NHỮNG ĐIỀU CẦN BIẾT', 1000, 'text');
        await tapText('Chuyên môn')
        await waitForElement('CHUYÊN MÔN', 1000, 'text');
        await tapText('Qui trình chung')
        await expectElementVisible('- Dọn dẹp theo quy tắc: từ trên xuống dưới và từ trong ra ngoài.','text')  
        await tapText('Qui trình chung')
        await expectElementNotVisible('- Dọn dẹp theo quy tắc: từ trên xuống dưới và từ trong ra ngoài.','text')
        await tapText('Dọn dẹp bếp')
        await expectElementVisible('- Quan sát thật kỹ khu vực bếp.','text')  
        await tapText('Dọn dẹp bếp')
        await expectElementNotVisible('- Quan sát thật kỹ khu vực bếp.','text')
        await tapText('Dọn dẹp phòng ngủ')
        await expectElementVisible('- Kéo rèm cửa, mở cửa sổ phòng cho thoáng.','text')  
        await tapText('Dọn dẹp phòng ngủ')
        await expectElementNotVisible('Kéo rèm cửa, mở cửa sổ phòng cho thoáng.','text')
        await tapText('Dọn dẹp phòng khách')
        await expectElementVisible('- Gom rác.','text')  
        await tapText('Dọn dẹp phòng khách')
        await expectElementNotVisible('- Gom rác.','text')
        await tapText('Dọn toilet')
        await expectElementVisible('- Nếu nhà khách có trên 02 toilet thì lúc nào cũng để lại 01 toilet dọn cuối cùng, vì phải ra vào thường xuyên để lấy nước lau dọn.','text')  
        await tapText('Dọn toilet')
        await expectElementNotVisible('- Nếu nhà khách có trên 02 toilet thì lúc nào cũng để lại 01 toilet dọn cuối cùng, vì phải ra vào thường xuyên để lấy nước lau dọn.','text')
        await tapText('Giặt đồ')
        await expectElementVisible('- Phân loại đồ màu và đồ trắng để giặt riêng.','text')  
        await tapText('Giặt đồ')
        await expectElementNotVisible('- Phân loại đồ màu và đồ trắng để giặt riêng.','text')
        await tapText('Ủi (là) quần áo')
        await expectElementVisible('- KHÔNG BIẾT ỦI QUẦN ÁO THÌ KHÔNG NHẬN VIỆC CÓ YÊU CẦU ỦI ĐỒ.','text')  
        await tapText('Ủi (là) quần áo')
        await expectElementNotVisible('- KHÔNG BIẾT ỦI QUẦN ÁO THÌ KHÔNG NHẬN VIỆC CÓ YÊU CẦU ỦI ĐỒ.','text')
        await tapText('Nguyên tắc sử dụng hóa chất')
        await expectElementVisible('- Tuyệt đối không sử dụng hóa chất khi chưa biết rõ công dụng và chức năng của nó.','text')  
        await tapText('Nguyên tắc sử dụng hóa chất')
        await expectElementNotVisible('- Tuyệt đối không sử dụng hóa chất khi chưa biết rõ công dụng và chức năng của nó.','text')
        await tapText('Quy trình thực hiện công việc Tổng vệ sinh')
        await scrollTo('scrollviewSpeciallize','bottom')
        await expectElementVisible('IV. HÌNH THỨC THANH TOÁN','text')  
      });

      it('LINE 82 - Test Support items', async () => { //Kiểm tra mục hổ trợ.
        await loginWithPhoneAndPassword('0834567890', '123456');
        await tapId('btnMenu');
        await swipe('scrollViewMenu', 'up');
        await tapText('Hỗ trợ')
        await waitForElement('HỖ TRỢ', 1000, 'text');
        await expectElementVisible('supportTitle')  
        await expectElementVisible('btnSupportCall')  
        await expectElementVisible('* Thứ 2 - thứ 7','text')  
        await expectElementVisible('Giờ hành chính','text')
        await expectElementVisible('08:00 - 12:00','text')  
        await expectElementVisible('13:30 - 18:00','text')  
        await expectElementVisible('Giờ hành chính','text')  
        await expectElementVisible('Ngoài giờ','text')  
        await expectElementVisible('06:30 - 08:00','text')  
        await expectElementVisible('18:00 - 22:00','text')  
        await expectElementVisible('* Chủ nhật','text')  
        await expectElementVisible('08:00 - 18:00','text')  
        await expectElementVisible('Lưu ý: ','text')  
        await expectElementVisible('- Trong giờ làm việc: hỗ trợ tất cả các trường hợp.','text')  
        await expectElementVisible('- Ngoài giờ làm việc: chỉ hỗ trợ những trường hợp khẩn cấp.','text')  
      });
  })
  
const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  tapText,
  waitForLoading,
  expectElementNotVisible,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: view-test/task/task-note-with-translate.spec.js - Tasker see task note with translate', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 21 - Tasker see task note with translate text', async () => { //Tasker xem mô tả chi tiết công việc được dịch sang tiếng việt.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 01', TaskNote: 'hello' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await initData('task/updateTask', [
      { Status: 'POSTED', Description: 'Don dep nha 01', taskNoteTranslatedText: 'xin chào' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('showTaskNote');
    await expectIdToHaveText('txtTaskNoteTranslated', 'xin chào');
    await expectElementNotVisible('Dịch');
    await tapText('Đóng');
  });

  it('LINE 38 - Tasker press translate button and see the translated note', async () => { //Tasker nhấn button dịch trong mô tả chi tiết công việc.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 01', TaskNote: 'please clean all of windows and floor in the kitchen' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('showTaskNote');
    await tapText('Dịch');
    await waitForElement('txtTaskNoteTranslated', 3000, 'xin vui lòng làm sạch tất cả các cửa sổ và sàn trong nhà bếp');
    await expectElementNotVisible('Dịch');
    await tapText('Đóng');
  });

  it('LINE 53 - Tasker press translate button with vietnamese note', async () => {
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567899', Description: 'Don dep nha 01', TaskNote: 'ủi đồ li, sơ chế đồ ăn, quét nhà lau nhà,rửa bát. Chủ nhà kỹ tính' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567891' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('showTaskNote');
    await tapText('Dịch');
    await waitForLoading(2000);
    await expectElementNotVisible('Dịch:');
    await expectElementNotVisible('Dịch');
    await tapText('Đóng');
  });
})

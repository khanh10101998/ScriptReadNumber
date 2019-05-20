const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  expectElementNotVisible,
  tapText,
  scrollTo,
  waitForLoading,
  waitForElement,
  waitForElementAtIndex,
  typeToTextField
} = require('../../step-definitions');

describe('FILE: flow-test/deep-cleaning/leader-chat-with-asker.spec.js - Tasker accept deep cleaning task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567893', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.7, TaskDone: 21 },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Score: 1 },
      { Phone: '0834567892', Score: 5 },
      { Phone: '0834567893', Score: 10 }
    ]);
    await initData('service/initDeepCleaningService'); //default 2 member in a team
    
    await initData('service/updateService', { service: 'Tổng vệ sinh', data: { listOfToolsForTasker: {
      vi: 'Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet',
      en: 'Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet',
      ko: 'Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet'
    }}});
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0834567892', Service: 'Tổng vệ sinh' },
      { Action: 'Add', Phone: '0834567893', Service: 'Tổng vệ sinh' }
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567891', Main: 1000000 },
      { Phone: '0834567892', Main: 1000000 },
      { Phone: '0834567893', Main: 1000000 }
    ]);
    
    await device.reloadReactNative();
  });

  it('LINE 49 - The leader receive chat message from asker', async () => { //Leader nhận được tin nhắn từ asker.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
      { Description: 'Task 02', TaskerPhone: '0834567893' }
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567893', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await tapText('Xem');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('btnChat');

    const data = await initData('chat/createChatFromAsker', {description: 'Task 02'});
    await waitForElement('Test here', 1000, 'text');
  });

  it('LINE 80 - The leader chat with asker and translate the message', async () => { //Leader chat với asker và translate tin nhắn.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
      { Description: 'Task 02', TaskerPhone: '0834567893' }
    ]);
    await loginWithPhoneAndPassword('0834567892', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapId('btnMenu');
    await tapId('btnProfile');
    await scrollTo('profileSrollView', 'bottom');
    await tapId('btnLogout');

    await loginWithPhoneAndPassword('0834567893', '123456');
    await tapId('Task 02');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await waitForLoading(1000);
    await tapText('Xem');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('btnChat');

    const data = await initData('chat/createChatFromAsker', {description: 'Task 02', messages: []});
    await initData('chat/addChat', {description: 'Task 02', message: {from: 'TASKER', message: 'Tôi là Tasker'}});
    await waitForElement('Tôi là Tasker', 1000, 'text');
    await initData('chat/addChat', {description: 'Task 02', message: {from: 'ASKER', message: 'Hello'}});
    await waitForElement('Hello', 1000, 'text');
    await waitForElementAtIndex('Dịch sang TV', 1000, 'text', 1);
    await tapId('btnTranslateHello');
    await waitForElement('Dịch: xin chào', 1000, 'text');
  });

  it('LINE 117 - A leader is chating with asker, then change the leader, the current conversation is stopped', async () => { //Leader chat với asker trong lúc công việc kết thúc việc.
    await initData('task/createTask', [
      { ServiceName: 'Tổng vệ sinh', AskerPhone: '0834567899', Description: 'Task 02'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567891' },
      { Description: 'Task 02', TaskerPhone: '0834567892' },
      { Description: 'Task 02', TaskerPhone: '0834567893' }
    ]);
    // Tasker 01 accepted
    await initData('task/updateTask', [
      { Description: 'Task 02', AcceptedTasker: '0834567891,0834567892', Status: 'CONFIRMED', isLeader: '0834567891' },
    ]);
    // Chat exists Asker and Tasker 01
    await initData('chat/createChatFromAsker', {description: 'Task 02'}); //the tasker leader is Tasker 02: 0834567892. She has the hightest score
    await loginWithPhoneAndPassword('0834567892', '123456');
    // Change Tasker 02 accepted
    await initData('task/updateTask', [
      { Description: 'Task 02', AcceptedTasker: '0834567891,0834567892', Status: 'CONFIRMED', isLeader: '0834567892' },
    ]);
    await tapText('XÁC NHẬN');
    await expectElementVisible('Task 02', 'text');
    await tapText('Task 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('btnChat');
    await typeToTextField('txtChatMessage', 'Xin chao !');
    setTimeout(() => {
      initData('task/updateTask', [
        { Description: 'Task 02', Status: 'POSTED' },
      ]);
    }, 600);
    await tapId('btnSendMessage');
    await expectElementNotVisible('Xin chao !', 'text');
    await typeToTextField('txtChatMessage', 'Xin chao !');
    await tapId('btnSendMessage');
    await expectElementVisible('Cuộc hội thoại đã kết thúc.', 'text');
    await tapText('OK');
  });
});
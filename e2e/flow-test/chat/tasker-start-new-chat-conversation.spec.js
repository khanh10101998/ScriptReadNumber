const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapText,
  tapId,
  typeToTextField,
  expectElementNotVisible,
  waitForLoading
} = require('../../step-definitions');

describe('FILE: flow-test/chat/tasker-start-new-chat-conversation.spec.js - The 2nd Tasker start the chat conversation when Task is changed to POSTED', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0987654321', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0987654322', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0987654323', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0987654321', Description: 'Don dep nha 01' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0987654323', '123456');
  });

  it('LINE 26 - Tasker start the chat conversation while task is changed to POSTED', async () => { //Tasker chat với asker trong trạng thái POSTED.
    // Tasker 01 accepted
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', AcceptedTasker: '0987654322', Status: 'CONFIRMED' },
    ]);
    // Chat exists Asker and Tasker 01
    await initData('chat/createChatFromAsker', {description: 'Don dep nha 01'});
    // Change Tasker 02 accepted
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', AcceptedTasker: '0987654323', Status: 'CONFIRMED' },
    ]);
    await tapText('XÁC NHẬN');
    await expectElementVisible('Don dep nha 01', 'text');
    await tapText('Don dep nha 01');
    await tapId('btnChat');
    await typeToTextField('txtChatMessage', 'Xin chao !');
    setTimeout(() => {
      initData('task/updateTask', [
        { Description: 'Don dep nha 01', Status: 'POSTED' },
      ]);
    }, 600);
    await waitForLoading(1000);
    await tapId('btnSendMessage');
    await expectElementNotVisible('Xin chao !', 'text');
    await expectElementVisible('Cuộc hội thoại đã kết thúc.', 'text');
    await tapText('OK');
  });
})

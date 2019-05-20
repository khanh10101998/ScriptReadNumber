const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapText,
  waitForElement,
  tapId, typeToTextField, waitForElementAtIndex
} = require('../../step-definitions');

describe('FILE: flow-test/chat/tasker-chat.spec.js - Tasker chat with Asker, check message time', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0828833056', Description: 'Don dep nha 01' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', AcceptedTasker: '0828833055', Status: 'CONFIRMED' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 26 - Tasker close new task notification modal', async () => { //Tasker nhận được tin nhắn từ asker.
    await tapText('XÁC NHẬN');
    await expectElementVisible('Don dep nha 01', 'text');
    await tapText('Don dep nha 01');
    await tapId('btnChat');
    const data = await initData('chat/createChatFromAsker', {description: 'Don dep nha 01'});
    const messageTime = new Date(data.data);
    //TODO: need to sparse time to match with the format in source code
    const timeString = `${messageTime.getHours()}:${messageTime.getMinutes()}`;
    await waitForElement('Test here', 1000, 'text');
  });

  it('LINE 38 - Tasker chat with asker and translate', async () => { //Tasker chat với asker.
    await tapText('XÁC NHẬN');
    await expectElementVisible('Don dep nha 01', 'text');
    await tapText('Don dep nha 01');
    await tapId('btnChat');
    const data = await initData('chat/createChatFromAsker', {description: 'Don dep nha 01'});
    await waitForElement('Test here', 1000, 'text');
    await waitForElement('Dịch sang TV', 1000, 'text');
    await typeToTextField('txtChatMessage', 'con chim');
    await tapId('btnSendMessage');
    await waitForElement('con chim', 2000, 'text');
  });

  it('LINE 51 - Tasker chat with asker and show translate button when Asker chat first message', async () => { //Dịch tin nhắn của asker từ tiếng anh sang tiếng việt.
    await tapText('XÁC NHẬN');
    await expectElementVisible('Don dep nha 01', 'text');
    await tapText('Don dep nha 01');
    await tapId('btnChat');
    const data = await initData('chat/createChatFromAsker', {description: 'Don dep nha 01', messages: []});
    await initData('chat/addChat', {description: 'Don dep nha 01', message: {from: 'TASKER', message: 'Tôi là Tasker'}});
    await waitForElement('Tôi là Tasker', 1000, 'text');
    await initData('chat/addChat', {description: 'Don dep nha 01', message: {from: 'ASKER', message: 'Hello'}});
    await waitForElement('Hello', 1000, 'text');
    await waitForElementAtIndex('Dịch sang TV', 1000, 'text', 1);
    await tapId('btnTranslateHello');
    await waitForElement('Dịch: xin chào', 1000, 'text');
  });
})

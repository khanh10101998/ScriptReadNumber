const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapId,
  tapText,
  waitForElement,
  expectElementNotVisible,
  swipe,
} = require('../../step-definitions');
const moment = require('moment');

describe('FILE: flow-test/home-cooking/your-income.spec.js - Tasker see your income', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it( 'LINE 23 - Tasker see income in 12 month', async () => { //Tasker thấy thu nhập 12 tháng.
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
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'History 8', Date: 'Last 1 week', Status: 'DONE' },
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
      { AcceptedTasker: '0834567891', Description: 'History 8', Rated: true },
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
    await initData('taskerTaskHistory/createTaskerTaskHistory');
    await waitForElement('bTaskee', 2000, 'text');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thu nhập');
    await waitForElement('THU NHẬP', 1000, 'text');
    await tapId('btnOpenListMonths');
    await expectElementNotVisible('chooseMonth2', 'text');
    await initData('user/updateUser', [
      { Phone: '0834567891', CreatedAt: moment().subtract(5, 'months').toDate() },
    ]);
    await waitForElement('chooseMonth6', 2000);
    await expectElementNotVisible('chooseMonth7', 'text');
    await initData('user/updateUser', [
      { Phone: '0834567891', CreatedAt: moment().subtract(11, 'months').toDate() },
    ]);
    await waitForElement('chooseMonth12', 2000);
    await expectElementNotVisible('chooseMonth13', 'text');
    await tapId('chooseMonth1');
    await expectElementVisible('Không có công việc nào được hoàn thành.', 'text');
  });
})

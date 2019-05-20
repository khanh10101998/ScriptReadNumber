const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  swipe,
  waitForElement,
  expectIdToHaveText,
  expectElementNotExist
} = require('../../step-definitions');
const moment = require('moment');

describe('FILE: view-test/job-calendar/job-calendar.spec.js - See job calendar', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 02', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 03', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 04', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 05', Status: 'CONFIRMED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 06', Status: 'CONFIRMED' },
    ]);
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567891', Description: 'Fix air conditioner', Detail: 'split,0,1.5,1,clean_gas,100000', Status: 'CONFIRMED' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 1', Status: 'CONFIRMED', GoToMarket: true, ChooseTasker: 'auto'},
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 01', NewDate: moment().toDate().setHours(8, 8) },
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 02', NewDate: moment().add(1, 'd').toDate().setHours(9, 9) },
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 03', NewDate: moment().add(1, 'd').toDate().setHours(10, 10) },
      { AcceptedTasker: '0834567890', Description: 'Don dep nha 04', NewDate: moment().add(2, 'days').toDate().setHours(11, 11) },
      { AcceptedTasker: '0834567890', Description: 'Nau an 1', NewDate: moment().toDate().setHours(12, 12) },
      { AcceptedTasker: '0834567890', Description: 'Fix air conditioner', NewDate: moment().toDate().setHours(18, 18) },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567890', '123456');
  });

  it('LINE 46 - Tasker see work schedule', async () => { //Tasker xem lịch làm việc.
    await waitForElement("bTaskee", 1000, 'text');
    await tapId('btnMenu');
    await tapText('Lịch làm việc');
    await waitForElement('Sáng', 1000, 'text');
    await expectElementVisible('Sáng', 'text');
    await expectElementVisible('Chiều', 'text');
    await expectElementVisible('Tối', 'text');
    await expectElementVisible('Dọn dẹp nhà', 'text');
    await expectElementVisible('Nấu ăn', 'text');
    await expectElementVisible('Vệ sinh máy lạnh', 'text');
    await expectIdToHaveText('numberTask0', '3 cv');
    await expectIdToHaveText('numberTask1', '2 cv');
    await expectIdToHaveText('numberTask2', '1 cv');
    await expectElementNotExist('numberTask3');
  });

  it('LINE 63 - Tasker see work schedule by morning, afternoon, night', async () => { //Tasker xem lịch làm việc buổi sáng, trưa, tối.
    await waitForElement("bTaskee", 1000, 'text');
    await tapId('btnMenu');
    await tapText('Lịch làm việc');
    await waitForElement('Sáng', 1000, 'text');
    await expectElementVisible('Sáng', 'text');
    await expectElementVisible('Chiều', 'text');
    await expectElementVisible('Tối', 'text');
    await expectElementVisible('Dọn dẹp nhà', 'text');
    await expectElementVisible('08:08 - 10:08 Sáng', 'text');
    await expectElementVisible('Nấu ăn', 'text');
    await expectElementVisible('12:12 - 14:12 Chiều', 'text');
    await expectElementVisible('Vệ sinh máy lạnh', 'text');
    await expectElementVisible('18:18 - 20:18 Tối', 'text');
    await tapId('slectedDate1');
    await expectElementVisible('Sáng', 'text');
    await expectElementVisible('09:09 - 11:09 Sáng', 'text');
    await expectElementVisible('10:10 - 12:10 Chiều', 'text');
    await tapId('slectedDate2');
    await expectElementVisible('Sáng', 'text');
    await expectElementVisible('11:11 - 13:11 Chiều', 'text');
    await tapId('slectedDate3');
    await expectElementNotExist('Sáng', 'text');
    await expectElementVisible('Bạn chưa nhận công việc nào.', 'text');
  })
})

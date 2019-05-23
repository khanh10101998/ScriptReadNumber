const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectElementVisible,
  expectElementNotVisible,
  waitForLoading,
  tapHeaderBack,
} = require('../../step-definitions');
const moment = require('moment');

describe('FILE: view-test/show-button-start-working/show-button.spec - Tasker see button start task', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      startWorkingSetting: {
        beforeAt: 5,
        afterAt: 20,
        isChargeTasker: false,
        isLockTasker: false,
        isCheckGPS: false,
        distance: 500,
      },
    });
    await initData('user/createUser', [
      { Phone: '01234567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '01234567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TaskDone: 20 },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '01234567890', Description: 'Don dep nha 01' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '01234567890', Description: 'Don dep nha 02', Date: 'today', Time: 'now' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '01234567890', Description: 'Don dep nha 03' },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '01234567891', Description: 'Don dep nha 01' },
      { Status: 'CONFIRMED', AcceptedTasker: '01234567891', Description: 'Don dep nha 02' },
      { Status: 'CONFIRMED', AcceptedTasker: '01234567891', Description: 'Don dep nha 03' },
    ]);
    await device.reloadReactNative();
  });
  
  afterEach(async () => {
    await initData('settings/changeSettingSystem', {
      startWorkingSetting: null
    });
  })

  it('LINE 49 - Tasker see button start task in task detail and notify in home page', async () => { //Tasker thấý button bắt đầu công việc và thông báo ở màn hình hơme.
    await loginWithPhoneAndPassword('01234567891', '123456');
    await waitForElement('btnStarWorking', 2000, 'id');
    await tapId('btnStarWorkingx');
    await waitForElement('Xem công việc', 1000, 'text');
    await expectElementVisible('Công việc đã được bắt đầu. Hãy làm việc chăm chỉ để được đánh giá 5 sao nhé!', 'text');
    await tapText('Xem công việc');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await expectElementNotVisible('btnStarWorking', 'id');
  });

  it('LINE 60 - Check time show and hide button start task', async () => {
    await loginWithPhoneAndPassword('01234567891', '123456');
    await waitForElement('btnStarWorking', 2000, 'id');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 02', NewDate: moment().add(10, "minutes").toDate() },
    ]);
    await waitForLoading(1000);
    await expectElementNotVisible('btnStarWorking', 'id');
    await tapHeaderBack();
    await waitForLoading(1000);
    await expectElementNotVisible('Xem công việc', 'text');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 02', NewDate: moment().toDate() },
    ]);
    await waitForElement('Xem công việc', 2000, 'text');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 02', NewDate: moment().subtract(2, 'hours').add(10, 'minutes').toDate() },
    ]);
    await waitForLoading(1000);
    await expectElementNotVisible('Xem công việc', 'text');
    await initData('task/updateTask', [
      { Description: 'Don dep nha 02', NewDate: moment().subtract(2, 'hours').add(30, 'minutes').toDate() },
    ]);
    await waitForElement('Xem công việc', 2000, 'text');
  });

  //TODO, test handle
  it.skip('LINE 87 - Tasker see click button start task when GPS required, task not enabled GPS', async () => { //Skip
    await initData('settings/changeSettingSystem', {
      startWorkingSetting: {
        beforeAt: 5,
        afterAt: 20,
        isChargeTasker: false,
        isLockTasker: false,
        isCheckGPS: true,
        distance: 500,
      },
    });
    await loginWithPhoneAndPassword('01234567891', '123456');
    await waitForElement('btnStarWorking', 2000, 'id');
    await tapId('btnStarWorking');
    await waitForElement('Không xác định được vị trí hiện tại của bạn. Vui lòng bật định vị (GPS), sau đó khởi động lại ứng dụng để bắt đầu công việc.', 1100, 'text');
    await tapText('Đóng');
  })
});

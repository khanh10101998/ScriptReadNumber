const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectIdToHaveText,
  waitForElement,
  expectElementVisible,
  tapAtPoint
} = require('../../step-definitions');

describe('FILE: flow-test/reward/tasker-monthly-reward.spec.js - Tasker monthly reward', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', nDoneTaskInMonth: 15 },
    ]);
    await initData('settings/changeSettingSystem', {
      "taskerMonthlyAwardByHour" : [ 
        {
            "hours" : 70,
            "gift" : 150000
        }, 
        {
            "hours" : 95,
            "gift" : 200000
        }, 
        {
            "hours" : 115,
            "gift" : 250000
        }, 
        {
            "hours" : 130,
            "gift" : 300000
        }, 
        {
            "hours" : 150,
            "gift" : 350000
        }
      ],
    });
    await device.reloadReactNative();
  });

  it('LINE 43 - Tasker view reward modal', async () => { //Tasker xem nhiệm vụ thưởng.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('btnReward');
    await waitForElement('Bạn sẽ nhận được phần quà có giá trị vào cuối tháng theo số giờ làm việc trong tháng.', 1000, 'text');
    await waitForElement('Tiến độ', 100, 'text');
    await waitForElement('10%', 100, 'text');
    await expectElementVisible('rewardList0');
    await expectIdToHaveText('rewardList0', '70 Giờ làm việc: 150,000 VND.');
    await expectIdToHaveText('rewardList1', '95 Giờ làm việc: 200,000 VND.');
    await expectIdToHaveText('rewardList2', '115 Giờ làm việc: 250,000 VND.');
    await expectIdToHaveText('rewardList3', '130 Giờ làm việc: 300,000 VND.');
    await expectIdToHaveText('rewardList4', '150 Giờ làm việc: 350,000 VND.');
    await expectIdToHaveText('totalHours', 'Tổng số giờ làm trong tháng: 15');
    await tapAtPoint('totalHours', -30, 0);
  });
})

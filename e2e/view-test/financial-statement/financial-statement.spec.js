const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForElement,
  expectIdToHaveText,
  scroll
} = require('../../step-definitions');
const moment = require('moment');

// this feature: TODO
describe.skip('FILE: view-test/financial-statement/financial-statement.spec.js - Check deposite', () => {
  before(async () => {
    await device.reloadReactNative();
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567890', CreatedAt: moment().subtract(5, 'months').toDate() },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567891', Description: 'Nau an 01', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 02', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 03', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 04', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 05', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 06', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 07', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 08', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 09', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 10', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 11', Status: 'CANCELED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 12', Status: 'CANCELED' },
    ]);

    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567891', Description: 'Air conditioner', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await initData('service/createLaundryTask', [
      { ServiceName: 'Giặt ủi', AskerPhone: '0834567891', Description: 'Laundry task1', Status: 'CANCELED'},
    ]);

    await initData('fatransaction/createFATransaction', [
      {Phone: '0834567890', Description: 'Nau an 01', Type: 'C', AccountType: 'M', Reason: 'TASK', Amount: '100001'},
      {Phone: '0834567890', Description: 'Don dep nha 02', Type: 'D', AccountType: 'M', Reason: 'TASK', Amount: '100002'},
      {Phone: '0834567890', Description: 'Don dep nha 03', Type: 'D', AccountType: 'P', Reason: 'PROMOTION', Amount: '100003', Value: 'atamg5c7'},
      {Phone: '0834567890', Description: 'Don dep nha 04', Type: 'D', AccountType: 'M', Reason: 'DEPOSIT', Amount: '100004'},
      {Phone: '0834567890', Description: 'Don dep nha 05', Type: 'D', AccountType: 'M', Reason: 'TASKER MONTHLY REWARD', Amount: '100005'},
      {Phone: '0834567890', Description: 'Don dep nha 06', Type: 'C', AccountType: 'M', Reason: 'WITHDRAW', Amount: '100006'},
      {Phone: '0834567890', Description: 'Air conditioner', Type: 'D', AccountType: 'P', Reason: 'CARD_TASK', Amount: '100007'},
      {Phone: '0834567890', Description: 'Don dep nha 08', Type: 'C', AccountType: 'M', Reason: 'NOT_COMMING', Amount: '100008'},
      {Phone: '0834567890', Description: 'Don dep nha 09', Type: 'C', AccountType: 'M', Reason: 'PENALTY', Amount: '100009'},
      {Phone: '0834567890', Description: 'Don dep nha 10', Type: 'C', AccountType: 'M', Reason: 'WEEKLY_PAYOUT', Amount: '100010'},
      {Phone: '0834567890', Description: 'Don dep nha 11', Type: 'D', AccountType: 'P', Reason: 'SUPPORT_TASKER', Amount: '100011'},
      {Phone: '0834567890', Description: 'Don dep nha 12', Type: 'D', AccountType: 'M', Reason: 'REVERT_WEEKLY_PAYOUT', Amount: '100012', Value: 'PO372017-0001'},
      {Phone: '0834567890', Description: 'Don dep nha 12', Type: 'D', AccountType: 'M', Reason: 'REFERRAL', Amount: '100013', Value: 'atamg5c7'},
      {Phone: '0834567890', Description: 'Nau an 01', Type: 'D', AccountType: 'M', Reason: 'PROMOTION', Amount: '100014', Date: moment().subtract(1, 'months').toDate(), Value: 'Change to company'} ,
      {Phone: '0834567890', Description: 'Don dep nha 02', Type: 'D', AccountType: 'M', Reason: 'NEW_REASON', Amount: '100015', Date: moment().subtract(1, 'months').toDate(), LocalizationText: {vi: 'Lý do mới', en: 'New reason', ko: 'New reason korea'}},
      {Phone: '0834567890', Description: 'Don dep nha 03', Type: 'D', AccountType: 'P', Reason: 'PROMOTION', Amount: '100016', Date: moment().subtract(1, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 04', Type: 'D', AccountType: 'M', Reason: 'DEPOSIT', Amount: '100017', Date: moment().subtract(1, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 05', Type: 'D', AccountType: 'M', Reason: 'TASKER MONTHLY REWARD', Amount: '100018', Date: moment().subtract(1, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 06', Type: 'C', AccountType: 'M', Reason: 'WITHDRAW', Amount: '100019', Date: moment().subtract(1, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 07', Type: 'D', AccountType: 'P', Reason: 'CARD_TASK', Amount: '100020', Date: moment().subtract(1, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 08', Type: 'C', AccountType: 'M', Reason: 'NOT_COMMING', Amount: '100021', Date: moment().subtract(3, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 09', Type: 'C', AccountType: 'M', Reason: 'PENALTY', Amount: '100022', Date: moment().subtract(3, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 10', Type: 'C', AccountType: 'M', Reason: 'WEEKLY_PAYOUT', Amount: '100023', Date: moment().subtract(3, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 11', Type: 'D', AccountType: 'P', Reason: 'SUPPORT_TASKER', Amount: '100024', Date: moment().subtract(4, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 12', Type: 'D', AccountType: 'M', Reason: 'REVERT_WEEKLY_PAYOUT', Amount: '100025', Date: moment().subtract(4, 'months').toDate(), Value: 'PO372017-0002'},
      {Phone: '0834567890', Description: 'Don dep nha 12', Type: 'C', AccountType: 'M', Reason: 'COD', Amount: '100026', Date: moment().subtract(5, 'months').toDate()},
      {Phone: '0834567890', Description: 'Don dep nha 12', Type: 'D', AccountType: 'M', Reason: 'REFERRAL', Amount: '100027', Date: moment().subtract(5, 'months').toDate()},
      {Phone: '0834567890', Description: 'Laundry task1', Type: 'C', AccountType: 'M', Reason: 'COD', Amount: '100028'},
    ]);
    await loginWithPhoneAndPassword('01234567890', '123456');
    
  });

  it('LINE 79 - Check show title financial statements', async () => { //Skip
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('btnMenu');
    await tapText('Lịch sử giao dịch');
    await waitForElement('LỊCH SỬ GIAO DỊCH', 1000, 'text');
    await expectIdToHaveText('txtMonthFAS06/2018', 'THÁNG 06/2018');
    await expectIdToHaveText('txtTitleFAS100028', 'Thu hộ');
    await expectIdToHaveText('txtTypeFAS100028', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100028', '-100,028 ₫');

    await expectIdToHaveText('txtTitleFAS100013', 'Giới thiệu bạn bè');
    await expectIdToHaveText('txtTypeFAS100013', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100013', '+100,013 ₫');

    await expectIdToHaveText('txtTitleFAS100012', 'Hoàn tiền');
    await expectIdToHaveText('txtTypeFAS100012', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100012', '+100,012 ₫');

    await expectIdToHaveText('txtTitleFAS100011', 'Công ty hỗ trợ');
    await expectIdToHaveText('txtTypeFAS100011', 'Tài khoản khuyến mãi');
    await expectIdToHaveText('txtAmountFAS100011', '+100,011 ₫');

    await scroll('lstFAStatement', 300, 'down')

    await expectIdToHaveText('txtTitleFAS100010', 'Rút tiền');
    await expectIdToHaveText('txtTypeFAS100010', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100010', '-100,010 ₫');

    await expectIdToHaveText('txtTitleFAS100009', 'Phạt');
    await expectIdToHaveText('txtTypeFAS100009', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100009', '-100,009 ₫');

    await expectIdToHaveText('txtTitleFAS100008', 'Huỷ việc');
    await expectIdToHaveText('txtTypeFAS100008', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100008', '-100,008 ₫');

    await expectIdToHaveText('txtTitleFAS100007', 'Công việc chuyển khoản');
    await expectIdToHaveText('txtTypeFAS100007', 'Tài khoản khuyến mãi');
    await expectIdToHaveText('txtAmountFAS100007', '+100,007 ₫');

    await expectIdToHaveText('txtTitleFAS100006', 'Rút tiền');
    await expectIdToHaveText('txtTypeFAS100006', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100006', '-100,006 ₫');

    await scroll('lstFAStatement', 300, 'down');

    await expectIdToHaveText('txtTitleFAS100005', 'Phần thưởng của tháng');
    await expectIdToHaveText('txtTypeFAS100005', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100005', '+100,005 ₫');

    await expectIdToHaveText('txtTitleFAS100004', 'Nạp tiền');
    await expectIdToHaveText('txtTypeFAS100004', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100004', '+100,004 ₫');

    await expectIdToHaveText('txtTitleFAS100003', 'Khuyến mãi');
    await expectIdToHaveText('txtTypeFAS100003', 'Tài khoản khuyến mãi');
    await expectIdToHaveText('txtAmountFAS100003', '+100,003 ₫');

    await scroll('lstFAStatement', 300, 'down');

    await expectIdToHaveText('txtTitleFAS100002', 'Chuyển khoản/khuyến mãi');
    await expectIdToHaveText('txtTypeFAS100002', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100002', '+100,002 ₫');

    await expectIdToHaveText('txtTitleFAS100001', 'Hoàn trả cho công ty');
    await expectIdToHaveText('txtTypeFAS100001', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100001', '-100,001 ₫');

    await expectIdToHaveText('txtTitleFAS100015', 'Lý do mới');
    await expectIdToHaveText('txtTypeFAS100015', 'Tài khoản chính');
    await expectIdToHaveText('txtAmountFAS100015', '+100,015 ₫');

  });
})

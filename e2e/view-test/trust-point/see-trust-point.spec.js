const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  waitForElement,
  expectIdToHaveText,
  tapIdAtIndex,
  scroll,
  scrollTo
} = require('../../step-definitions');

describe('FILE: view-test/trust-point/see-trust-point.spec.js - Tasker see trust point on task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', TrustPoint: 100 },
      { Phone: '0834567891', Name: 'Asker 01', Type: 'ASKER', Status: 'ACTIVE', TrustPoint: 100 },
      { Phone: '0834567892', Name: 'Asker 02', Type: 'ASKER', Status: 'ACTIVE', TrustPoint: 90 },
      { Phone: '0834567893', Name: 'Asker 03', Type: 'ASKER', Status: 'ACTIVE', TrustPoint: 80 },
      { Phone: '0834567894', Name: 'Asker 04', Type: 'ASKER', Status: 'ACTIVE', TrustPoint: 70 },
      { Phone: '0834567895', Name: 'Asker 05', Type: 'ASKER', Status: 'ACTIVE'},
    ]);
    await device.reloadReactNative();
  });

  // this feature: TODO
  it.skip('LINE 26 - Tasker see trust point of Asker', async () => { //Skip
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Date: 'today', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567892', Description: 'Don dep nha 02', Date: 'today', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567893', Description: 'Don dep nha 03', Date: 'today', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567894', Description: 'Don dep nha 04', Date: 'today', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567895', Description: 'Don dep nha 05', Date: 'today', Status: 'POSTED' },
      ]);

    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 03', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 04', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 05', TaskerPhone: '0834567890' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await tapId('Don dep nha 01');
    await waitForElement('txtTrustPointDon dep nha 01', 3000);
    await expectIdToHaveText('txtTrustPointDon dep nha 01', 'Uy tín tốt');
    await tapIdAtIndex('btnBack');
    await tapId('Don dep nha 02');
    await waitForElement('txtTrustPointDon dep nha 02', 3000);
    await expectIdToHaveText('txtTrustPointDon dep nha 02', 'Uy tín tốt');
    await tapIdAtIndex('btnBack');
    await waitForElement('bTaskee', 1000, 'text');
    await scroll('listViewnewTask', 400, 'down');
    await tapId('Don dep nha 03');
    await waitForElement('txtTrustPointDon dep nha 03', 3000);
    await expectIdToHaveText('txtTrustPointDon dep nha 03', 'Uy tín trung bình');
    await tapIdAtIndex('btnBack');
    await tapId('Don dep nha 04');
    await waitForElement('txtTrustPointDon dep nha 04', 3000);
    await expectIdToHaveText('txtTrustPointDon dep nha 04', 'Uy tín thấp');
    await tapIdAtIndex('btnBack');
    await scrollTo('listViewnewTask', 'bottom');
    await tapId('Don dep nha 05');
    await waitForElement('txtTrustPointDon dep nha 05', 3000);
    await expectIdToHaveText('txtTrustPointDon dep nha 05', 'Uy tín trung bình');
    await tapIdAtIndex('btnBack');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  tapId,
  tapText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: flow-test/profile/referral-friend-list.spec.js - Tasker see the list of referral friends', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0828833055', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833057', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833058', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833059', Name: 'Tasker 04', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833050', Name: 'Tasker 05', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833051', Name: 'Tasker 06', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/updateUser', [
      {Phone: '0828833055', ReferralCode: 'test'},
      {Phone: '0828833056', FriendCode: 'test'},
      {Phone: '0828833057', FriendCode: 'test'},
      {Phone: '0828833058', FriendCode: 'test'},
      {Phone: '0828833059', FriendCode: 'test'},
      {Phone: '0828833050', FriendCode: 'test'},
      {Phone: '0828833051', FriendCode: 'test'},
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 34 - Tasker view the list of referral fiends - line 25', async () => { //Tasker xem những người đã giới thiệu.
    await expectElementVisible('bTaskee', 'text');
    await tapId('btnMenu');
    await expectElementVisible('Chuyên nghiệp', 'text');
    await tapText('Chuyên nghiệp');
    await waitForElement('txtReferralFriendList', 2000);
    await expectElementVisible('txtReferralFriendList', 'id');
    await tapId('txtReferralFriendList');
    await expectElementVisible('NHỮNG NGƯỜI ĐÃ GIỚI THIỆU', 'text');
    await expectElementVisible('Asker', 'text');
    await expectElementVisible('Tasker 02', 'text');
    await expectElementVisible('Tasker 03', 'text');
    await expectElementVisible('Tasker 04', 'text');
    await expectElementVisible('Tasker 05', 'text');
    await expectElementVisible('Tasker 06', 'text');
  });
})

const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  expectIdToHaveText,
  expectElementNotVisible,
  swipe
} = require('../../step-definitions');

describe('FILE: view-test/pet/see-pet.spec.js - Tasker see pet', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Asker 01', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 19 - Tasker see pet in task item', async () => { //Tasker thấy mục thú cưng.
    await initData('task/createTask', [
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 01', Status: 'POSTED' },
      { ServiceName: 'Dọn dẹp nhà', AskerPhone: '0834567891', Description: 'Don dep nha 02', Status: 'POSTED' },
      ]);
    await initData('task/updateTask', [
      { Description: 'Don dep nha 01', Pet: [{name: 'DOG'}, {name: 'CAT'}, {other: 'ky nhong'}] },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Don dep nha 01', TaskerPhone: '0834567890' },
      { Description: 'Don dep nha 02', TaskerPhone: '0834567890' },
    ]);
    await loginWithPhoneAndPassword('0834567890', '123456');
    await expectElementVisible('bTaskee', 'text');
    await expectIdToHaveText('lblPetDon dep nha 01', 'Nhà có vật nuôi: Chó, Mèo, ky nhong');
    await expectElementNotVisible('lblPet dep nha 02');
  });
})

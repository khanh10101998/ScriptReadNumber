const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  expectElementVisible,
  expectIdToHaveText,
  waitForElement,
} = require('../../step-definitions');

describe('FILE: flow-test/accept-task/tasker-accept-air-conditioner-task.spec.js - Tasker want to see and accept air conditioner task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Vệ sinh máy lạnh', En: 'Air-conditioner Service', Ko: '에어컨 수리', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createACServiceDetail');
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Vệ sinh máy lạnh' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 27 - Tasker view normal air conditioner task', async () => { //Tasker thấy công việc vệ sinh máy lạnh
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'Fix air conditioner', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Fix air conditioner', TaskerPhone: '0834567891' },
    ]);
    await expectIdToHaveText('labelServiceDistrictFix air conditioner', 'VỆ SINH MÁY LẠNH - QUẬN 7');
    await expectIdToHaveText('txtTypeAC1', 'Treo tường');
    await expectIdToHaveText('txtDesTypeAC1', 'Công suất dưới 1.5HP');
    await expectIdToHaveText('txtQtyAC1', '1');
    await expectIdToHaveText('txtJobAC1', 'Vệ sinh máy lạnh, Bơm gas máy lạnh (Tối đa 30 PSI)');
    await expectIdToHaveText('txtTotalQtyAC', 'Tổng cộng: 1 máy lạnh.');
    await expectIdToHaveText('txtPriceAC', '100,000 VND');
    await expectIdToHaveText('labelDescriptionFix air conditioner', 'Fix air conditioner');
  });

  it('LINE 44 - Tasker accept air conditioner task', async () => { //Tasker nhận việc vệ sinh máy lạnh
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'Fix air conditioner', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Fix air conditioner', TaskerPhone: '0834567891' },
    ]);
    await waitForElement('Fix air conditioner', 2000);
    await tapId('Fix air conditioner');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectElementVisible('Fix air conditioner');
  });

  it('LINE 58 - Tasker view sign up promotion air conditioner task', async () => { //Tasker thấy được công việc khuyến mãi.
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'Fix air conditioner', Detail: 'split,0,1.5,1,clean_gas,100000', Promotion: true },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Fix air conditioner', TaskerPhone: '0834567891' },
    ]);
    await expectIdToHaveText('labelServiceDistrictFix air conditioner', 'VỆ SINH MÁY LẠNH - QUẬN 7');
    await expectIdToHaveText('txtTypeAC1', 'Treo tường');
    await expectIdToHaveText('txtDesTypeAC1', 'Công suất dưới 1.5HP');
    await expectIdToHaveText('txtQtyAC1', '1');
    await expectIdToHaveText('txtJobAC1', 'Vệ sinh máy lạnh, Bơm gas máy lạnh (Tối đa 30 PSI)');
    await expectIdToHaveText('txtTotalQtyAC', 'Tổng cộng: 1 máy lạnh.');
    await expectIdToHaveText('txtPriceAC', '80,000 VND');
    await expectIdToHaveText('txtPriceACDescription', '+20,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('labelDescriptionFix air conditioner', 'Fix air conditioner');
  });

  it('LINE 76 - Tasker view sign up special promotion air conditioner task', async () => { //Tasker thấy được công việc khuyến mãi đặc biệt.
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'Fix air conditioner', Detail: 'split,0,1.5,1,clean_gas,100000', SpecialPromotion: true },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Fix air conditioner', TaskerPhone: '0834567891' },
    ]);
    await waitForElement('VỆ SINH MÁY LẠNH - QUẬN 7', 2, 'text');
    await expectIdToHaveText('txtTypeAC1', 'Treo tường');
    await expectIdToHaveText('txtDesTypeAC1', 'Công suất dưới 1.5HP');
    await expectIdToHaveText('txtQtyAC1', '1');
    await expectIdToHaveText('txtJobAC1', 'Vệ sinh máy lạnh, Bơm gas máy lạnh (Tối đa 30 PSI)');
    await expectIdToHaveText('txtTotalQtyAC', 'Tổng cộng: 1 máy lạnh.');
    await expectIdToHaveText('txtPriceAC', '100,000 VND');
    await expectIdToHaveText('txtPriceACDescription', '+43,000 VND vào tài khoản khuyến mãi');
    await expectIdToHaveText('labelDescriptionFix air conditioner', 'Fix air conditioner');
  });
})

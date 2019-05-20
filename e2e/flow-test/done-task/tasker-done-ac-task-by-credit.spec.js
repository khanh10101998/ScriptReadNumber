const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectIdToHaveText,
  expectElementNotExist,
} = require('../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/done-task/tasker-done-ac-task-by-credit.spec.js - Tasker done AC task using credit', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Vệ sinh máy lạnh', En: 'Air-conditioner Service', Ko: '에어컨 수리', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createACServiceDetail', {});
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Vệ sinh máy lạnh' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 30 - Tasker view sign up special promotion air conditioner task', async () => { //Tasker hoàn thành vệ sinh máy lạnh được thanh toán bằng thẻ tín dụng.
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'May lanh 01', Detail: 'split,0,1.5,1,clean_gas,100000', SpecialPromotion: true, PaymentMethod: 'CREDIT', Status: 'CONFIRMED' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567891', Description: 'May lanh 01', Progress: 'DONE' },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567890', Promotion: 0, Main: 100000 },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapText('XÁC NHẬN');
    await expectIdToHaveText('labelDescriptionMay lanh 01', 'May lanh 01');
    await tapId('btnDoneMay lanh 01');
    await expectElementNotExist('May lanh 01');
    await tapText('Xem');
    await expectIdToHaveText('txtMainAccount', '100,000 ₫');
    await expectIdToHaveText('txtProAccount', '128,000 ₫');
    await expectIdToHaveText('txtTotalAccount', '228,000 ₫');
    var data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'C', Amount: 15000 },
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'D', Amount: 43000 },
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'D', Amount: 100000 },
      { PhoneNumber: '0834567890', AccountType: 'M', Type: 'C', Amount: 100000 },
    ]);
    expect(data.data).to.not.be.null;
    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567890' });
    expect(data.FMainAccount).to.equal(0);
    expect(data.Promotion).to.equal(100000);
    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567891' });
    expect(data.FMainAccount).to.equal(100000);
    expect(data.Promotion).to.equal(128000);
  });
})

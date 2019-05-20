const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapIdAtIndex,
  tapText,
  expectIdToHaveText,
  expectElementVisible,
  swipe, scrollTo
} = require('../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/company/company-done-air-conditioner-task.spec.js - Company done air-conditioner task', () => {
  beforeEach(async () => {
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('user/addEmployeeToCompany', { companyPhone: '0834567891', employeePhones: [
      { Phone: '0834567892' },
    ]});
    await initData('service/createNewService', [
      { Icon: '/icons/service-icon/air_conditioner_trans.png', Vi: 'Vệ sinh máy lạnh', En: 'Air-conditioner Service', Ko: '에어컨 수리', Cost: 100000, Weight: 10 },
    ]);
    await initData('service/createACServiceDetail', {});
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'May lanh 01', Detail: 'split,0,1.5,1,clean_gas,100000' },
    ]);
    await device.reloadReactNative();
  });

  it('LINE 33 - Tasker done task, Check FAccount of company and employee.', async () => { //Tasker hoàn thành công việc kiểm tra thu nhập của nhân viên tasker.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'May lanh 01', CompanyPhone: '0834567891', Progress: 'DONE' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await tapText('XÁC NHẬN');
    await tapId('btnDoneMay lanh 01');
    await tapId('btnMenu');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');      
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '85,000 ₫');
    await tapIdAtIndex('btnBack');
    if (device.getPlatform() === 'android') {
      await swipe('scrollViewMenu', 'up');    
    } else {
      await scrollTo('scrollViewMenu', 'bottom');
    }
    await tapText('Thu nhập');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 100,000 VND');
    await expectIdToHaveText('historyName', 'Tasker');
    await expectIdToHaveText('historyIncome', 'Thu nhập 100,000 VND');
    await tapId('btnHistoryItem');
    await expectIdToHaveText('historyService0', 'VỆ SINH MÁY LẠNH');
    await expectIdToHaveText('labelCost0', '100,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
    const data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'C', Amount: 15000 },
    ]);
    expect(data.data).to.not.be.null;
  });

  it('LINE 72 - Tasker done task pay by credit, Check FAccount of company and employee.', async () => { //Tasker hoàn thành công việc được trả bằng thẻ tín dụng, kiểm tra tài khoản của nhân viên tasker.
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'May lanh 01', CompanyPhone: '0834567891', Progress: 'DONE', PaymentMethod: 'CREDIT' },
    ]);
    await initData('financial/updateFinancialAccount', [
      { Phone: '0834567890', Promotion: 0, Main: 100000 },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await tapText('XÁC NHẬN');
    await tapId('btnDoneMay lanh 01');
    await expectElementVisible('Tài khoản của bạn đã được cộng thêm 100,000 VND', 'text');
    await tapText('Xem');
    await expectIdToHaveText('txtMainAccount', '100,000 ₫');
    await expectIdToHaveText('txtProAccount', '85,000 ₫');
    await tapIdAtIndex('btnBack');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thu nhập');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 100,000 VND');
    await expectIdToHaveText('historyName', 'Tasker');
    await expectIdToHaveText('historyIncome', 'Thu nhập 100,000 VND');
    await tapId('btnHistoryItem');
    await expectIdToHaveText('historyService0', 'VỆ SINH MÁY LẠNH');
    await expectIdToHaveText('labelCost0', '100,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
    var data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'C', Amount: 15000 },
      { PhoneNumber: '0834567891', AccountType: 'M', Type: 'D', Amount: 100000 },
      { PhoneNumber: '0834567890', AccountType: 'M', Type: 'C', Amount: 100000 },
    ]);
    expect(data.data).to.not.be.null;
    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567891' });
    expect(data.FMainAccount).to.equal(100000);
    expect(data.Promotion).to.equal(85000);
    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567890' });
    expect(data.FMainAccount).to.equal(0);
    expect(data.Promotion).to.equal(100000);
  });

  it('LINE 114 - Tasker done special promotion task, Check FAccount of company and employee.', async () => { //Kiểm tra tài khoản của công ty sau khi hoàn thành việc khyến mãi.
    await initData('service/createACTask', [
      { ServiceName: 'Vệ sinh máy lạnh', AskerPhone: '0834567890', Description: 'May lanh 02', Detail: 'split,0,1.5,1,clean,100000', SpecialPromotion: true },
    ]);
    await initData('task/updateTask', [
      { Status: 'CONFIRMED', AcceptedTasker: '0834567892', Description: 'May lanh 02', CompanyPhone: '0834567891', Progress: 'DONE' },
    ]);
    await loginWithPhoneAndPassword('0834567891', '123456');
    await initData('user/updateUser', [
      { Phone: '0834567891', Level: 1 },
    ]);
    await tapText('XÁC NHẬN');
    await tapId('btnDoneMay lanh 02');
    await tapId('btnMenu');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thông tin tài chính');
    await expectIdToHaveText('txtMainAccount', '0 ₫');
    await expectIdToHaveText('txtProAccount', '128,000 ₫');
    await tapIdAtIndex('btnBack');
    await swipe('scrollViewMenu', 'up');
    await tapText('Thu nhập');
    await expectIdToHaveText('labelTotalCost', 'Tổng thu nhập: 100,000 VND');
    await expectIdToHaveText('historyName', 'Tasker');
    await expectIdToHaveText('historyIncome', 'Thu nhập 100,000 VND');
    await tapId('btnHistoryItem');
    await expectIdToHaveText('historyService0', 'VỆ SINH MÁY LẠNH');
    await expectIdToHaveText('labelCost0', '100,000 VND');
    await expectIdToHaveText('labelAsker0', 'Khách hàng: Asker');
    var data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'C', Amount: 15000 },
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'D', Amount: 43000 },
    ]);
    expect(data.data).to.not.be.null;
  });
})

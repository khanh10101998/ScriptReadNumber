const {
  initData,
  loginWithPhoneAndPassword,
} = require('../../step-definitions');
const expect = require('chai').expect;

describe('FILE: flow-test/company/company-financial-account.spec.js - Company financial account', () => {
  before(async () => {
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Company', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  //TODO: what is this test???
  it.skip('LINE 19 - Add 2 employees to company, check financial account and transaction', async () => { //Thêm 2 nhân viên vào công ty, kiểm tra tài khoản chính và giao dịch.
    await initData('user/addEmployees', { employeePhoneString: '0834567892, 0834567893', companyPhone: '0834567891', acceptPermission: false });
    var data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567891' });
    expect(data.FMainAccount).to.equal(0);
    expect(data.Promotion).to.equal(0);
    data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567891', AccountType: 'P', Type: 'C', Amount: 100000 },
    ]);
    expect(data.data).to.not.be.null;

    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567892' });
    expect(data.FMainAccount).to.equal(0);
    expect(data.Promotion).to.equal(0);
    data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567892', AccountType: 'P', Type: 'C', Amount: 100000 },
    ]);
    expect(data.data).to.not.be.null;

    data = await initData('faccount/findTaskerFAccount', { taskerPhone: '0834567893' });
    expect(data.FMainAccount).to.equal(0);
    expect(data.Promotion).to.equal(0);
    data = await initData('user/findTaskerTransaction', [
      { PhoneNumber: '0834567893', AccountType: 'P', Type: 'C', Amount: 100000 },
    ]);
    expect(data.data).to.not.be.null;
  });
})

const {
  tapId,
  typeToTextField,
  clearTextInput,
  expectElementNotExist,
  expectElementVisible,
  waitForElement,
  initData,
  waitForLoading
} = require('../../step-definitions');

describe('FILE: flow-test/sign-up/check-new-vietnamese-phone-number.spec.js - Check number phone', () => { //Kiểm tra sđt khi đăng ký tài khoản.
  beforeEach(async () => {
    await initData('resetData', {});
    await device.reloadReactNative();
  });

  it('LINE 18 - Check reg phone number', async () => {
    const listNumber = {
      'MobiFone': {
        fistNumber: 7,
        secondNumber: [0, 6, 7, 8, 9],
      },
      'VinaPhone': {
        fistNumber: 8,
        secondNumber: [1, 2, 3, 4, 5, 6, 8, 9], //6,8,9 old number
      },
      'Viettel': {
        fistNumber: 3,
        secondNumber: [2, 3, 4, 5, 6, 7, 8, 9],
      },
      'Vietnammobile-Gmobile': {
        fistNumber: 5,
        secondNumber: [6, 8, 9],
      },
    }
    await tapId('btnRegister');
    await waitForElement('ĐĂNG KÝ TÀI KHOẢN', 1000, 'text');
    await typeToTextField('txtYourName', 'Tasker');
    for (const homeNetworking in listNumber) {
      for (let i = 0; i < 10; i++) {
        await clearTextInput('txtMobilePhone');
        await typeToTextField('txtMobilePhone', `0${listNumber[homeNetworking].fistNumber}${i}0123456`);
        if (listNumber[homeNetworking].secondNumber.indexOf(i) === -1) {
          await waitForLoading(1500);
          await expectElementVisible('Số điện thoại không đúng', 'text');
        } else {
          await waitForLoading(1500);
          await expectElementNotExist('Số điện thoại không đúng', 'text');
        }
      }
    }
  });
})

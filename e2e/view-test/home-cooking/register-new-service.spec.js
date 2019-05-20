const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  swipe,
  waitForElement,
  expectElementNotVisible
} = require('../../step-definitions');

describe('FILE: view-test/home-cooking/register-new-service.spec.js', () => {
  before(async () => {
    const services =  await initData('service/getServices');
    const cleaningService = services.filter(e => e.text.en === 'Cleaning')[0];
    const homeCooking = services.filter(e => e.text.en === 'Home Cooking')[0];

    await initData('settings/changeSettingSystem', {
      registerService : [ 
        {
          allowedServiceIds : [cleaningService._id],
          registerId : homeCooking._id,
          info : {
              vi : "Dịch vụ nấu ăn đã sẵn sàng, mời bạn đăng ký! Hoặc có thể đến công ty của chúng tôi để làm thủ tục đăng ký dịch vụ.",
              en : "Dịch vụ nấu ăn đã sẵn sàng, mời bạn đăng ký! Hoặc có thể đến công ty của chúng tôi để làm thủ tục đăng ký dịch vụ.",
              ko : "Dịch vụ nấu ăn đã sẵn sàng, mời bạn đăng ký! Hoặc có thể đến công ty của chúng tôi để làm thủ tục đăng ký dịch vụ."
          }
        }
      ]
    });

    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' }
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0828833055', Service: 'Dọn dẹp nhà' }
    ]);
    await device.reloadReactNative();
  });

  it('LINE 41 - Tasker who can register the Home Cooking service is in cleaning service', async () => { //Tasker đăng ký dịch vụ nấu ăn khi đang ở dịch vụ dọn dẹp nhà.
    await loginWithPhoneAndPassword('0828833055', '123456');
    await tapId('btnMenu');
    await tapText('Đăng ký dịch vụ mới');
    await expectElementVisible('Nấu ăn', 'text');
    await tapText('Nấu ăn');
    await expectElementVisible('Dịch vụ nấu ăn đã sẵn sàng, mời bạn đăng ký! Hoặc có thể đến công ty của chúng tôi để làm thủ tục đăng ký dịch vụ.', 'text');
    await tapText('Đăng ký');
    await expectElementVisible('Bạn thực sự muốn đăng ký dịch vụ Nấu ăn?', 'text');
    await tapText('Đồng ý');
    await waitForElement('Xin chúc mừng! Bạn đã đăng ký thành công dịch vụ Nấu ăn.', 1000, 'text');
    await tapText('Đóng');

    await tapText('Đăng ký dịch vụ mới');
    await expectElementNotVisible('Nấu ăn', 'text');
  });
})

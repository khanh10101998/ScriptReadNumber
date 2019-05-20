const {
  initData,
  loginWithPhoneAndPassword,
  expectElementVisible,
  expectElementNotExist,
  waitForElement,
  tapText,
} = require('../../step-definitions');

const newVersion = '1.1.3';
const notiText ='Đã có phiên bản mới ' + newVersion + ', vui lòng tiến hành cập nhật.';

describe('FILE: flow-test/others/check-compare-version.spec.js - Tasker see alert update app', () => {
  it('LINE 14 - Tasker see alert update app with isForce = false, not require update', async () => { //Hiện thông báo update nhưng không cần cập nhập.
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('settings/changeSettingSystem', {
      versionApp: {
        ios: {
          version: newVersion,
          link: 'https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8',
          description: '',
          isShow: true,
          isForce: false,
        },
        android: {
          version: newVersion,
          link: 'https://play.google.com/store/apps/details?id=com.btaskee.partner',
          description: '',
          isShow: true,
          isForce: false,
        },
      },
    });
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('Thông báo', 2000, 'text');
    await expectElementVisible(notiText, 'text');
    await expectElementVisible('Cập nhật', 'text');
    await expectElementVisible('Đóng', 'text');
    await tapText('Đóng');
  });

  it('LINE 45 - Tasker not see alert update app with isShow = false', async () => { //Không hiện thông báo update với isShow = false.
    await initData('settings/changeSettingSystem', {
      versionApp: {
        ios: {
          version: newVersion,
          link: 'https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8',
          description: '',
          isShow: false,
          isForce: true,
        },
        android: {
          version: newVersion,
          link: 'https://play.google.com/store/apps/details?id=com.btaskee.partner',
          description: '',
          isShow: false,
          isForce: true,
        },
      },
    });
    await device.reloadReactNative();
    // await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await expectElementNotExist(notiText, 'text');
    await expectElementNotExist('Cập nhật', 'text');
    await expectElementNotExist('Đóng', 'text');
  });

  it('LINE 72 - Tasker see alert update app with isForce = true, require update', async () => { //Hiện thông báo update và bắt buộc update.
    await initData('settings/changeSettingSystem', {
      versionApp: {
        ios: {
          version: newVersion,
          link: 'https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8',
          description: '',
          isShow: true,
          isForce: true,
        },
        android: {
          version: newVersion,
          link: 'https://play.google.com/store/apps/details?id=com.btaskee.partner',
          description: '',
          isShow: true,
          isForce: true,
        },
      },
    });
    await device.reloadReactNative();
    // await loginWithPhoneAndPassword('0834567891', '123456');
    await expectElementVisible(notiText, 'text');
    await expectElementVisible('CẬP NHẬT', 'text');
    await expectElementNotExist('Đóng', 'text');
  });

  it('LINE 98 - Tasker not see alert update app when current version NEWER version server', async () => { //không hiện thông báo update khi đang ở phiên bản mới nhất.
    await initData('settings/changeSettingSystem', {
      versionApp: {
        ios: {
          version: '1.0.0',
          link: 'https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8',
          description: '',
          isShow: true,
          isForce: true,
        },
        android: {
          version: '1.0.0',
          link: 'https://play.google.com/store/apps/details?id=com.btaskee.partner',
          description: '',
          isShow: true,
          isForce: true,
        },
      },
    });
    await device.reloadReactNative();
    // await loginWithPhoneAndPassword('0834567891', '123456');
    await waitForElement('bTaskee', 1000, 'text');
    await expectElementNotExist('Đã có phiên bản mới 1.1.0, vui lòng tiến hành cập nhật.', 'text');
    await expectElementNotExist('Cập nhật', 'text');
    await expectElementNotExist('Đóng', 'text');
  });
})

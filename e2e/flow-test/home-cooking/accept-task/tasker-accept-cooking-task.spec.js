const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  expectElementVisible,
  expectIdToHaveText,
  waitForElement,
  tapIdAtIndex,
  expectElementNotExist,
  scroll,
  scrollTo,
  waitForLoading
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/tasker-accept-cooking-task.spec.js - Tasker want to see and accept laundry task', () => {
  beforeEach(async () => {
    await initData('service/initCookingService');
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('user/updateUser', [
      { Phone: '0834567891', WorkingPlaces: 'VN,Hồ Chí Minh,Quận 1;VN,Hồ Chí Minh,Quận 7' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Nấu ăn' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567891', '123456');
  });

  it('LINE 33 - Tasker accept cooking task', async () => { //Tasker nhận việc nấu ăn.
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 1', Status: 'POSTED', ChooseTasker: 'auto'},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 2', Status: 'POSTED'},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 3', Status: 'POSTED'},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 4', Status: 'POSTED'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 1', TaskerPhone: '0834567891' },
      { Description: 'Nau an 2', TaskerPhone: '0834567891' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Nau an 1', Duration: 3 },
    ]);
    await waitForElement('labelServiceDistrictNau an 1', 1000);
    await expectIdToHaveText('labelServiceDistrictNau an 1', 'NẤU ĂN - QUẬN 7');
    await tapId('labelServiceDistrictNau an 1');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapText('Chat');
    await expectElementVisible('chatHeader');
    await tapIdAtIndex('btnBack');
    await expectElementVisible('labelServiceDistrictNau an 1');
  });

  it('LINE 60 - Tasker accept cooking task', async () => {
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 1', Status: 'POSTED', ChooseTasker: 'auto'},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 2', Status: 'POSTED', Duration: 2, cookingDetail: {
        numberEater : 2, //số người ăn
        numberDish : 2, // số món
        dishDetail : [ 
            {
                name : "Canh lá giang", //tên món ăn
                translated : "canh la giang" //sau này dịch nếu có
            }
        ],
        taste :
          {
              name : "BAC",
              text : {
                  vi : "Bắc",
                  en : "North",
                  ko : "North"
              }
          },
        haveFruit : true,// có trái  cây hay ko
        note : "nấu mặn ko cho thêm đường", //ghi chú khi  nấu ăn
        meal : "LUNCH", //ca làm LUNCH, DINNER
        isGoMarket : false, //đi chợ hay ko
        budgetGoMarket : 100000 //ngân sách đi chợ, hiển thị khi isGoMarket là true
      }},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 3', Status: 'POSTED'},
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 4', Status: 'POSTED'},
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 1', TaskerPhone: '0834567891' },
      { Description: 'Nau an 2', TaskerPhone: '0834567891' },
    ]);
    await initData('task/updateTask', [
      { Description: 'Nau an 1', Duration: 3,  },
    ]);
    await waitForElement('labelServiceDistrictNau an 1', 1000);
    await expectIdToHaveText('labelServiceDistrictNau an 1', 'NẤU ĂN - QUẬN 7');
    await expectIdToHaveText('labelDurationNau an 1', '3h');
    await expectIdToHaveText('labelRequirementNau an 1', 'Đi chợ (đến nhà khách hàng trước, nhận tiền rồi mới đi chợ)');
    await scrollTo('listViewnewTask', 'bottom');
    await expectIdToHaveText('labelDurationNau an 2', '2h');
    await expectElementNotExist('labelRequirementNau an 2');
    await scrollTo('listViewnewTask', 'top');
    await waitForElement('labelServiceDistrictNau an 1', 1000);
    await tapId('labelServiceDistrictNau an 1');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapText('Chat');
    await expectElementVisible('chatHeader');
    await tapIdAtIndex('btnBack');
    await expectElementVisible('labelServiceDistrictNau an 1');
  });
})

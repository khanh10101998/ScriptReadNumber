const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  tapText,
  waitForLoading,
  expectElementVisible,
  expectElementNotVisible,
  expectElementNotExist,
  expectIdToHaveText,
  scrollTo,
  waitForElement
} = require('../../step-definitions');

describe('FILE: view-test/home-cooking/tasker-see-dishes-to-cook.spec.spec.js', () => {
  beforeEach(async () => {
    await initData('service/initCookingService');
    await initData('user/createUser', [
      { Phone: '0828833055', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0828833056', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0828833055', Service: 'Nấu ăn' }
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nấu ăn 01', TaskNote: 'nấu mặn ko cho thêm đường' },
    ]);
    
    await initData('task/updateViewedTasker', [
      { Description: 'Nấu ăn 01', TaskerPhone: '0828833055' },
      { Description: 'Nấu ăn 02', TaskerPhone: '0828833055' }
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0828833055', '123456');
  });

  it('LINE 37 - ACTIVE tasker see the dishes to cook and requirements', async () => { //Tasker xem chi tiết công việc và yêu cầu thêm.
    await expectElementVisible('Nấu ăn 01');
    await tapText('Nấu ăn 01');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('CHỜ XÁC NHẬN');
    await expectElementVisible('Nấu ăn 01');
    await expectIdToHaveText('foodTasteNấu ăn 01', 'Bắc');
    await expectIdToHaveText('dish0Nấu ăn 01', ' • Canh lá giang');
    await expectIdToHaveText('dish1Nấu ăn 01', ' • Thịt kho tàu');
    await expectIdToHaveText('dish2Nấu ăn 01', ' • Cơm trắng');
    await expectIdToHaveText('fruitDessertNấu ăn 01', ' • Trái cây tráng miệng');
    await expectIdToHaveText('numberOfEaterNấu ăn 01', '3');
    await expectIdToHaveText('numberOfDishNấu ăn 01', '3');
    await expectIdToHaveText('labelRequirementNấu ăn 01', 'Đi chợ (đến nhà khách hàng trước, nhận tiền rồi mới đi chợ)');
    await expectIdToHaveText('labelBudgetNấu ăn 01', '100,000 VND');
    await expectIdToHaveText('paymentMethodNấu ăn 01', 'Tiền mặt');
    await expectElementVisible('lblPetNấu ăn 01');
    await tapText('VIỆC MỚI');

    const eatingTime = new Date();
    eatingTime.setHours(13);
    eatingTime.setMinutes(50);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0828833056', Description: 'Nấu ăn 02', TaskNote: 'nấu canh không cho bột ngọt', cookingDetail: 
        {
        "numberEater" : 2,
        "numberDish" : 3,
        "dishDetail" : [ 
            {
                "name" : "thịt kho tàu"
            }, 
            {
                "name" : "cơm trắng"
            }
        ],
        "taste" :
          {
              "name" : "TRUNG",
              "text" : {
                  "vi" : "Trung",
                  "en" : "South",
                  "ko" : "South"
              }
          },
        "haveFruit" : false,
        "meal" : "DINER",
        "eatingTime": eatingTime
      }}
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nấu ăn 02', TaskerPhone: '0828833055' }
    ]);
    await waitForLoading(1500);
    await expectElementVisible('Nấu ăn 02', 'text');
    await expectIdToHaveText('foodTasteNấu ăn 02', 'Trung');
    await expectIdToHaveText('dish0Nấu ăn 02', ' • Thịt kho tàu');
    await expectIdToHaveText('dish1Nấu ăn 02', ' • Cơm trắng');
    await expectElementNotVisible(' • Canh lá giang', 'text');
    await expectElementNotVisible(' • Trái cây tráng miệng', 'text');
    await expectElementNotVisible('lblPetNấu ăn 02');
    await expectIdToHaveText('eatingTimeNấu ăn 02', '13:50')
    await tapText('Nấu ăn 02');
    await waitForElement('CHI TIẾT CÔNG VIỆC', 1000, 'text');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('VIỆC MỚI');
    await expectElementNotVisible('Nấu ăn 02', 'text');
  });

  it('LINE 110 - ACTIVE tasker see the task note', async () => {
    await expectElementVisible('Nấu ăn 01');
    await tapId('showTaskNote');
    await expectElementVisible('nấu mặn ko cho thêm đường', 'text');
    await tapText('Đóng');
  });
})

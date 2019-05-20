const {
  initData,
  loginWithPhoneAndPassword,
  tapId,
  sleep,
  expectElementVisible,
  expectIdToHaveText,
  tapText,
  scrollTo,
  scroll,
} = require('../../../step-definitions');
const expect = require('chai').expect; 

describe('FILE: flow-test/home-cooking/accept-task/manual-and-auto-choose-tasker.spec.js', () => {
  beforeEach(async () => {
    await initData('service/initCookingService');
    await initData('user/createUser', [
      { Phone: '0834567891', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 4.5, TaskDone: 10 },
      { Phone: '0834567892', Name: 'Tasker', Type: 'TASKER', Status: 'ACTIVE', AvgRating: 5.0, TaskDone: 8 },
      { Phone: '0834567899', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
    ]);
    await initData('serviceChannel/updateServiceChannel', [
      { Action: 'Add', Phone: '0834567891', Service: 'Nấu ăn' },
      { Action: 'Add', Phone: '0834567892', Service: 'Nấu ăn' }
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567899', Description: 'Nấu ăn 01', ChooseTasker: 'manual' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567899', Description: 'Nấu ăn 02', ChooseTasker: 'auto' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nấu ăn 01', TaskerPhone: '0834567891' },
      { Description: 'Nấu ăn 02', TaskerPhone: '0834567891' },
    ]);
    
    await device.reloadReactNative();
  });

  it('LINE 38 - Tasker accept task with manual choose tasker', async () => { //Tasker được nhận việc với trạng thái chọn tasker thủ công.
    await device.launchApp({permissions: {location: 'inuse', notifications: 'YES'}});
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Nấu ăn 01');
    await expectElementVisible('CHI TIẾT CÔNG VIỆC', 'text');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await tapText('CHỜ XÁC NHẬN');
    await tapId('Nấu ăn 01');
    await expectIdToHaveText("labelStatus", "Bạn đã nhận công việc này");
  });

  it('LINE 51 - Tasker accept task with auto choose tasker', async () => { //Tasker được nhận việc với trạng thái chọn tasker tự động.
    await loginWithPhoneAndPassword('0834567891', '123456');
    if ( device.getPlatform() === 'android' ) {
      await scroll('listViewnewTask', 400, 'down');
    } else {
      await scrollTo('listViewnewTask', 'bottom');
    }
    await tapId('labelDescriptionNấu ăn 02');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await expectIdToHaveText('modalContent', 'Chúc mừng bạn đã nhận được công việc. CHAT ngay với khách hàng.');
    await tapId('Chat');
    await expectElementVisible('CHAT', 'text');
  });

  it('LINE 67 - Check new data accepted tasker after accepted task', async () => { //Kiểm tra data sau khi tasker nhận công việc.
    await loginWithPhoneAndPassword('0834567891', '123456');
    await tapId('Nấu ăn 01');
    await scrollTo('taskDetailScrollView', 'bottom');
    await tapId('checkBoxConfirm');
    await tapId('btnAcceptTask');
    await sleep(1000);
    const data = await initData('task/getTaskByDescription', {description: 'Nấu ăn 01'});
    const acceptedTasker = data.acceptedTasker[0];
    expect(acceptedTasker.name).to.equal('Tasker');
    expect(acceptedTasker.avgRating).to.equal(4.5);
    expect(acceptedTasker.taskDone).to.equal(10);
  });
})

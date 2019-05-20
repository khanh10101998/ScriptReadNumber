const {
  initData,
  loginWithPhoneAndPassword,
  expectElementNotExist,
  expectIdToHaveText,
  waitForLoading, 
  waitForElement,
  expectElementVisible,
  scrollTo
} = require('../../../step-definitions');

describe('FILE: flow-test/home-cooking/accept-task/limit-number-tasker-accept-task.spec.js - Limit number of tasker accept task', () => {
  beforeEach(async () => {
    await initData('settings/changeSettingSystem', {
      limitNumberTaskerAcceptTask: 5,
    });
    await initData('user/createUser', [
      { Phone: '0834567890', Name: 'Asker', Type: 'ASKER', Status: 'ACTIVE' },
      { Phone: '0834567891', Name: 'Tasker 01', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567892', Name: 'Tasker 02', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567893', Name: 'Tasker 03', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567894', Name: 'Tasker 04', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567895', Name: 'Tasker 05', Type: 'TASKER', Status: 'ACTIVE' },
      { Phone: '0834567896', Name: 'Tasker 06', Type: 'TASKER', Status: 'ACTIVE' },
    ]);
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Task 01' },
    ]);
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567891,0834567892,0834567893,0834567894', Description: 'Task 01' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 01', TaskerPhone: '0834567896' },
    ]);
    await device.reloadReactNative();
    await loginWithPhoneAndPassword('0834567896', '123456');
  });

  it('LINE 39 - Limit number of tasker accept task', async () => { //Giới hạn số lượng tasker nhận việc.
    await expectIdToHaveText('labelDescriptionTask 01', 'Task 01');
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567891,0834567892,0834567893,0834567894,0834567895', Description: 'Task 01' },
    ]);
    await waitForLoading(1000);
    await expectElementNotExist('labelDescriptionTask 01');
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Task 02' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 02', TaskerPhone: '0834567896' },
    ]);
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567891', Description: 'Task 02' },
    ]);
    await waitForLoading(1000);
    await expectIdToHaveText('labelDescriptionTask 02', 'Task 02');
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567891,0834567892', Description: 'Task 02' },
    ]);
    await waitForLoading(1000);
    await expectIdToHaveText('labelDescriptionTask 02', 'Task 02');
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567891,0834567892,0834567893,0834567894,0834567895', Description: 'Task 02' },
    ]);
    await waitForLoading(1000);
    await expectElementNotExist('labelDescriptionTask 02');
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Task 03' },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Task 03', TaskerPhone: '0834567896' },
    ]);
    await waitForLoading(1000);
    await expectIdToHaveText('labelDescriptionTask 03', 'Task 03');
  });

  it('LINE 77 - Limit number of tasker accept task and see task because tasker have done for this person', async () => { //Giới hạn số lượng tasker nhận cùng 1 công việc.
    await waitForLoading(1000);
    await expectIdToHaveText('labelDescriptionTask 01', 'Task 01');
    await initData('task/updateTask', [
      { Status: 'WAITING_ASKER_CONFIRMATION', AcceptedTasker: '0834567891,0834567892,0834567893,0834567894,0834567895', Description: 'Task 01' },
    ]);
    await waitForLoading(1000);
    await expectElementNotExist('labelDescriptionTask 01');
    await initData('task/createTask', [
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 01', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 02', Date: 'today', Status: 'DONE' },
      { ServiceName: 'Nấu ăn', AskerPhone: '0834567890', Description: 'Nau an 05', Date: 'tomorrow', Status: 'POSTED' },
    ]);
    await initData('task/updateTask', [
      { AcceptedTasker: '0834567896', Description: 'Nau an 01', Rated: true },
      { AcceptedTasker: '0834567896', Description: 'Nau an 02', Rated: true },
      { Description: 'Nau an 05', IsRegularCleaning: true },
    ]);
    await initData('task/createRating', [
      { Description: 'Nau an 01', Rate: 5, Review: 'abc', FeedBack: 'ON_TIME;CHEERFUL;CLEAN' },
      { Description: 'Nau an 02', Review:  'Good job 2', Rate:  5   },
    ]);
    await initData('task/updateViewedTasker', [
      { Description: 'Nau an 05', TaskerPhone: '0834567896' },
    ]);
    await device.reloadReactNative();
    await scrollTo('listViewnewTask', 'bottom');
    await waitForElement('Nau an 05', 2000, 'text');
    await waitForLoading(1000);
    await expectElementVisible('labelDescriptionNau an 05');
  })
})

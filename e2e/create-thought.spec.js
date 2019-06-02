const { execSync } = require('child_process');
const { version } = require('../package.json');

const MOOD_TYPES = {
    SCARED: {
        segmentedItem: 'createThoughtDialog__moodTypes__0',
        thought: 'I hope my GF is alright.',
        event: 'She\'s not answering her phone.'
    },
    ANGRY: {
        segmentedItem: 'createThoughtDialog__moodTypes__1',
        thought: 'Why does this always happen to me?',
        event: 'My train had a delay today!'
    },
    HAPPY: {
        segmentedItem: 'createThoughtDialog__moodTypes__2',
        thought: 'That was unexpected!',
        event: 'I won a singing contest today.'
    },
    SAD: {
        segmentedItem: 'createThoughtDialog__moodTypes__3',
        thought: 'I will be alone forever!',
        event: 'Told my crush I loved her and she rejected me.'
    }
};

describe('Create thought', () => {
  it('should open the create dialog', async () => {
    execSync(`xcrun simctl io booted screenshot screenshots/dashboard_${version}.png`);
    await element(by.id('dashboard__tabBar__createButton')).tap();
    execSync(`xcrun simctl io booted screenshot screenshots/createthoughtdialog_${version}.png`);
    await expect(element(by.id('createThoughtDialog__dialog'))).toBeVisible();
  });

  {Object.keys(MOOD_TYPES).map(
      moodTypeKey => {
          const moodType = moodTypeKey.toLowerCase();
          const { segmentedItem, thought, event } = MOOD_TYPES[moodTypeKey];

          it(`should create a ${moodType} thought`, async () => {
            await element(by.id('dashboard__tabBar__createButton')).tap();
            await element(by.id(segmentedItem)).tap();
            await element(by.id('createThoughtDialog__score')).swipe('right', 'fast', 0.1);
        
            await element(by.id('createThoughtDialog__thought')).replaceText(thought);
            await element(by.id('createThoughtDialog__thought')).tap();
            
            await element(by.id('createThoughtDialog__event')).replaceText(event);
            await element(by.id('createThoughtDialog__event')).tap();
        
            execSync(`xcrun simctl io booted screenshot screenshots/createthoughtdialog_${moodType}_${version}.png`);
            await element(by.id('createThoughtDialog__submit')).tap(); // Blur
            execSync(`xcrun simctl io booted screenshot screenshots/createthoughtdialog_${moodType}_submit_${version}.png`);
            try { await element(by.id('createThoughtDialog__submit')).tap(); } catch (ex) {} // Submit
            await expect(element(by.id('createThoughtDialog__dialog'))).toBeNotVisible();

            execSync(`xcrun simctl io booted screenshot screenshots/dashboard_${version}.png`);
          });
      }
  )}
});
import {CountSelectorComponent} from "./count-selector.component";

describe('count-selector', () => {

  let countSelectorComponent: CountSelectorComponent;

  beforeEach(() => {
    countSelectorComponent = new CountSelectorComponent();
  });

  it('should have count set', () => {
    expect(countSelectorComponent.count).toBeDefined();
  });

  it('should change value +1 after increasing', () => {
    countSelectorComponent.count = 1;
    countSelectorComponent.increaseCount();
    expect(countSelectorComponent.count).toBe(2);
  });

  it('should not decrease value if it is equal 1', () => {
    countSelectorComponent.count = 1;
    countSelectorComponent.decreaseCount();
    expect(countSelectorComponent.count).toBe(1);
  });
})

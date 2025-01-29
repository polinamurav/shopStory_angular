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

  it('should emit value +1 after increasing', (done: DoneFn) => {
    countSelectorComponent.count = 1;

    countSelectorComponent.onCountChange.subscribe(newValue => {
      expect(newValue).toBe(2);
      done();
    });

    countSelectorComponent.increaseCount();
  });

  it('should emit value -1 after decreasing', (done: DoneFn) => {
    countSelectorComponent.count = 5;

    countSelectorComponent.onCountChange.subscribe(newValue => {
      expect(newValue).toBe(4);
      done();
    });

    countSelectorComponent.decreaseCount();
  });
})

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EaMultiSelectDropdownComponent } from './multi-select-dropdown.component';
import { KeyValueDifferFactoryStub, KeyValueDifferStub, KeyValueDiffersStub } from '../../../testing';
import { KeyValueDiffers } from '@angular/core';

describe('EaMultiSelectDropdownComponent', () => {
  let changes: any;
  let component: EaMultiSelectDropdownComponent;
  let fixture: ComponentFixture<EaMultiSelectDropdownComponent>;
  let keyValueDifferFactory: KeyValueDifferFactoryStub;
  let keyValueDifferFactorySpy: jasmine.Spy;
  let keyValueDiffers: KeyValueDiffersStub;
  let keyValueDiffersSpy: jasmine.Spy;
  let keyValueDifferStub: KeyValueDifferStub;
  let keyValueDifferStubSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EaMultiSelectDropdownComponent ],
      providers: [
        {
          provide: KeyValueDiffers,
          useClass: KeyValueDiffersStub
        }
      ]
    })
    .compileComponents();

    keyValueDifferFactory = new KeyValueDifferFactoryStub();
    keyValueDiffers = TestBed.get(KeyValueDiffers);
    keyValueDifferStub = new KeyValueDifferStub();

    keyValueDifferStubSpy = spyOn(keyValueDifferStub, 'diff').and.callFake(() => {
      return changes;
    });
    keyValueDifferFactorySpy = spyOn(keyValueDifferFactory, 'create').and.returnValue(keyValueDifferStub);
    keyValueDiffersSpy = spyOn(keyValueDiffers, 'find').and.returnValue(keyValueDifferFactory);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.config.options = [
      { id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      { id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: true },
      { id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: false }
    ];
  });

  describe('during initialization', () => {
    beforeEach(() => {
      component.config.allowMultiple = true;
      component.config.showSelectAllWhenMoreThan = 1;
      component.config.addSelectAllOption = true;
    });

    it('should use the default settings for everything that is not provided by the parent component', () => {
      component.config = {
        allowMultiple: false,
        options: [
          { display: 'First Option', id: 1, value: '[First].[Option]', isSelected: false }
        ]
      };

      component.ngOnInit();

      expect(component.config).toEqual({
        addSelectAllOption: false,
        allowMultiple: false,
        buttonClasses: ['btn', 'btn-default'],
        buttonIconClasses: ['fa', 'fa-angle-down', 'align-self-center'],
        buttonTextStyles: {'flex': 1},
        buttonWrapperClasses: ['d-flex'],
        checkedClasses: ['fa', 'fa-check-square-o'],
        listClasses: [],
        optionClasses: ['ea-multi-select-option'],
        options: [
          { display: 'First Option', id: 1, value: '[First].[Option]', isSelected: false }
        ],
        selectAllByDefault: false,
        selectAllText: '(Select All)',
        showSelectAllWhenMoreThan: 1,
        uncheckedClasses: ['fa', 'fa-square-o']
      });
    });

    it('should replace the default configuration settings with what the parent component provided', () => {
      component.config = {
        addSelectAllOption: true,
        allowMultiple: false,
        buttonClasses: ['btn', 'btn-secondary'],
        buttonIconClasses: ['fa', 'fa-angle-up', 'justify-content-center'],
        buttonTextStyles: {'flex': 0},
        buttonWrapperClasses: ['dog'],
        checkedClasses: ['fa', 'fa-check-circle-o'],
        listClasses: [],
        options: [],
        optionClasses: ['none'],
        selectAllByDefault: true,
        selectAllText: '(GET \'EM)',
        showSelectAllWhenMoreThan: 5,
        uncheckedClasses: ['fa', 'fa-circle-o']
      };

      component.ngOnInit();

      expect(component.config).toEqual({
        addSelectAllOption: true,
        allowMultiple: false,
        buttonClasses: ['btn', 'btn-secondary'],
        buttonIconClasses: ['fa', 'fa-angle-up', 'justify-content-center'],
        buttonTextStyles: {'flex': 0},
        buttonWrapperClasses: ['dog'],
        checkedClasses: ['fa', 'fa-check-circle-o'],
        listClasses: [],
        options: [],
        optionClasses: ['none'],
        selectAllByDefault: true,
        selectAllText: '(GET \'EM)',
        showSelectAllWhenMoreThan: 5,
        uncheckedClasses: ['fa', 'fa-circle-o']
      });
    });

    it('should stretch the list of options to match the width of the button when the button has a width specified with Bootstrap and the list of options is not styled at all', () => {
      component.config.listClasses = ['cat'];
      component.config.buttonClasses = ['col-6', 'dog'];

      component.ngOnInit();

      expect(component.config.listClasses).toEqual(['cat', 'col-6']);
    });

    it('should stretch the list of options to match the width of the button when the button has a width specified with Bootstrap and the list of options does not', () => {
      component.config.listClasses = ['cat'];
      component.config.buttonClasses = ['col-6', 'dog'];

      component.ngOnInit();

      expect(component.config.listClasses).toEqual(['cat', 'col-6']);
    });

    it('should not stretch the list of options to match the width of the button when the button does not have a width specified with Bootstrap', () => {
      component.config.listClasses = [];
      component.config.buttonClasses = ['cat', 'dog'];

      component.ngOnInit();

      expect(component.config.listClasses).toEqual([]);
    });

    it('should not stretch the list of options to match the width of the button when the button has a width specified with Bootstrap and the list of options also has a width specified with Bootstrap', () => {
      component.config.listClasses = ['col-2'];
      component.config.buttonClasses = ['col-6', 'dog'];

      component.ngOnInit();

      expect(component.config.listClasses).toEqual(['col-2']);
    });

    it('should build the (Select All) option', () => {
      component.config.selectAllByDefault = true;
      component.config.selectAllText = 'Get All Dogs';
      component.config.selectAllValue = '[Dogs].[All]';
      component.config.options = [];
      component.ngOnInit();

      expect(component.selectAllOption).toEqual({
        display: 'Get All Dogs',
        id: 'select-all',
        isSelected: true,
        value: '[Dogs].[All]'
      });
    });

    it('should select all options if necessary', () => {
      spyOn(component, 'selectAllByDefault');

      component.ngOnInit();

      expect(component.selectAllByDefault).toHaveBeenCalledTimes(1);
    });

    describe('should not display the (Select All) option', () => {
      it('when the parent component has not configured the (Select All) option to be displayed', () => {
        component.config.addSelectAllOption = false;

        component.ngOnInit();

        expect(component.showSelectAllOption).toBe(false);
      });

      it('when there are fewer options than the minimum threshold set by the parent component', () => {
        component.config.showSelectAllWhenMoreThan = 3;

        component.ngOnInit();

        expect(component.showSelectAllOption).toBe(false);
      });

      it('when the list is not multi-select enabled', () => {
        component.config.allowMultiple = false;

        component.ngOnInit();

        expect(component.showSelectAllOption).toBe(false);
      });
    });

    describe('should display the (Select All) option', () => {
      it('when there are more options than the minimum threshold set by the parent component, the parent component has configured the (Select All) option to be displayed, and the list is multi-select enabled', () => {
        component.ngOnInit();

        expect(component.showSelectAllOption).toBe(true);
      });
    });
  });

  describe('during change detection', () => {
    let updateButtonTextSpy: jasmine.Spy;

    beforeEach(() => {
      updateButtonTextSpy = spyOn(component, 'updateButtonText');
    });

    describe('when the options have changed', () => {
      beforeEach(() => {
        changes = {
          forEachItem(fn: (r: any) => void): void {},
          forEachPreviousItem(fn: (r: any) => void): void {},
          forEachChangedItem(fn: (r: any) => void): void {
            fn({key: 'options'});
          },
          forEachAddedItem(fn: (r: any) => void): void {},
          forEachRemovedItem(fn: (r: any) => void): void {}
        };
        component.config.allowMultiple = true;
        component.config.showSelectAllWhenMoreThan = 1;
        component.config.addSelectAllOption = true;
        expect(component.selectAllOption.isSelected).toBe(false);
      });

      it('and the parent component has configured all options to be selected by default the EaMultiSelectDropdownComponent should select all options', () => {
        component.config.selectAllByDefault = true;
        if (!component?.config?.options?.length) {
          expect(component?.config?.options?.length).toBeGreaterThanOrEqual(1);
          return;
        }

        component.ngDoCheck();

        expect(component.config.options[0].isSelected).toBe(true);
        expect(component.config.options[1].isSelected).toBe(true);
      });

      it('and the parent component has configured all options to not be selected by default the EaMultiSelectDropdownComponent should not select all options', () => {
        if (!component?.config?.options?.length || component.config.options.length < 2) {
          expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
          return;
        }
        component.config.options[0].isSelected = false;
        component.config.options[1].isSelected = false;
        component.config.selectAllByDefault = false;

        component.ngDoCheck();

        expect(component.config.options[0].isSelected).toBe(false);
        expect(component.config.options[1].isSelected).toBe(false);
      });

      describe('and', () => {
        beforeEach(() => {
          component.showSelectAllOption = true;
        });

        it('the parent component has not configured the (Select All) option to be displayed the EaMultiSelectDropdownComponent should not display the (Select All) option', () => {
          component.config.addSelectAllOption = false;

          component.ngDoCheck();

          expect(component.showSelectAllOption).toBe(false);
        });

        it('there are fewer options than the minimum threshold set by the parent component the EaMultiSelectDropdownComponent should not display the (Select All) option', () => {
          component.config.showSelectAllWhenMoreThan = 3;

          component.ngDoCheck();

          expect(component.showSelectAllOption).toBe(false);
        });

        it('the list is not multi-select enabled the EaMultiSelectDropdownComponent should not display the (Select All) option', () => {
          component.config.allowMultiple = false;

          component.ngDoCheck();

          expect(component.showSelectAllOption).toBe(false);
        });

        it('the button was clicked while there were no options to display and the dropdown is configured to immediately open itself when it gets options then the list should be displayed', () => {
          component.config.openWhenDataLoads = true;
          component.failedToOpen = true;
          spyOn(component, 'openList');

          component.ngDoCheck();

          expect(component.failedToOpen).toBe(false);
          expect(component.openList).toHaveBeenCalledTimes(1);
        });
      });

      describe('and there are more options than the minimum threshold set by the parent component, the parent component has configured the (Select All) option to be displayed, and the list is multi-select enabled', () => {
        it('the EaMultiSelectDropdownComponent should display the (Select All) option', () => {
          component.ngDoCheck();

          expect(component.showSelectAllOption).toBe(true);
        });

        it('and the parent component has configured all options to be selected by default the EaMultiSelectDropdownComponent should select the (Select All) option', () => {
          component.config.selectAllByDefault = true;

          component.ngDoCheck();

          expect(component.selectAllOption.isSelected).toBe(true);
        });
      });

      it('should set the button text', () => {
        updateButtonTextSpy.calls.reset();

        component.ngDoCheck();

        expect(updateButtonTextSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when the options have not changed', () => {
      beforeEach(() => {
        changes = {
          forEachItem(fn: (r: any) => void): void {},
          forEachPreviousItem(fn: (r: any) => void): void {},
          forEachChangedItem(fn: (r: any) => void): void {},
          forEachAddedItem(fn: (r: any) => void): void {},
          forEachRemovedItem(fn: (r: any) => void): void {}
        };
        component.config.allowMultiple = true;
        component.config.showSelectAllWhenMoreThan = 1;
        component.config.addSelectAllOption = true;
        component.showSelectAllOption = false;
      });

      it('the EaMultiSelectDropdownComponent should not determine whether to show or hide the (Select All) option', () => {
        component.ngDoCheck();

        expect(component.showSelectAllOption).toBe(false);
      });

      it('the EaMultiSelectDropdownComponent should not select all options', () => {
        if (!component?.config?.options?.length || component.config.options.length < 2) {
          expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
          return;
        }

        component.config.options[0].isSelected = false;
        component.config.options[1].isSelected = false;
        component.config.selectAllByDefault = true;

        component.ngDoCheck();

        expect(component.config.options[0].isSelected).toBe(false);
        expect(component.config.options[1].isSelected).toBe(false);
      });

      it('the EaMultiSelectDropdownComponent should not select the (Select All) option', () => {
        component.config.selectAllByDefault = true;

        component.ngDoCheck();

        expect(component.selectAllOption.isSelected).toBe(false);
      });

      it('should not set the button text', () => {
        updateButtonTextSpy.calls.reset();

        component.ngDoCheck();

        expect(updateButtonTextSpy).not.toHaveBeenCalled();
      });
    });

    describe('when the empty text changes', () => {
      beforeEach(() => {
        changes = {
          forEachItem(fn: (r: any) => void): void {},
          forEachPreviousItem(fn: (r: any) => void): void {},
          forEachChangedItem(fn: (r: any) => void): void {
            fn({key: 'emptyText'});
          },
          forEachAddedItem(fn: (r: any) => void): void {},
          forEachRemovedItem(fn: (r: any) => void): void {}
        };
        component.config.allowMultiple = true;
        component.config.showSelectAllWhenMoreThan = 1;
        component.config.addSelectAllOption = true;
        expect(component.selectAllOption.isSelected).toBe(false);
      });

      it('and there are no options the button text should be updated', () => {
        updateButtonTextSpy.calls.reset();
        component.config.options = [];

        component.ngDoCheck();

        expect(updateButtonTextSpy).toHaveBeenCalledTimes(1);
      });

      it('and there are options the button text should not be updated', () => {
        updateButtonTextSpy.calls.reset();

        component.ngDoCheck();

        expect(updateButtonTextSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('closeList', () => {
    beforeEach(() => {
      spyOn(component.closed, 'emit');
      spyOn(component.changed, 'emit');
      component.isOpen = true;
      component.originals = [{
        id: 1, isSelected: true
      }, {
        id: 2, isSelected: true
      }, {
        id: 3, isSelected: false
      }];
    });

    it('should close the list', () => {
      component.isOpen = true;

      component.closeList();

      expect(component.isOpen).toBe(false);
    });

    it('should notify all listeners that the list has been closed', () => {
      component.id = 'fun-happy-times';

      component.toggleList();

      expect(component.closed.emit).toHaveBeenCalledTimes(1);
      expect(component.closed.emit).toHaveBeenCalledWith('fun-happy-times');
    });

    it('should notify all listeners of all options that were toggled while the list was open when any options have been toggled', () => {
      if (!component?.config?.options?.length || component.config.options.length < 3) {
        expect(component?.config?.options?.length).toBeGreaterThanOrEqual(3);
        return;
      }

      component.config.options[0].isSelected = false;
      component.config.options[2].isSelected = true;
      component.id = 'component-id';

      component.toggleList();

      expect(component.changed.emit).toHaveBeenCalledTimes(1);
      expect(component.changed.emit).toHaveBeenCalledWith({
        id: 'component-id',
        changes: [
          { id: 1, display: 'First Option', value: '[First].[Option]', isSelected: false },
          { id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
        ]
      });
    });

    it('should not notify any listeners of any changed options when no options were toggled while the list was open', () => {
      component.toggleList();

      expect(component.changed.emit).not.toHaveBeenCalled();
    });

    it('should reset the starting values of all options to prevent other dropdowns on the same parent component from triggering a semi-infinite change loop', () => {
      if (!component?.config?.options?.length || component.config.options.length < 3) {
        expect(component?.config?.options?.length).toBeGreaterThanOrEqual(3);
        return;
      }

      component.config.options[0].isSelected = false;
      component.config.options[1].isSelected = false;
      component.config.options[2].isSelected =  true;
      component.closeList();

      expect(component.originals).toEqual([{
        id: 1, isSelected: false
      }, {
        id: 2, isSelected: false
      }, {
        id: 3, isSelected: true
      }]);
    });

    it('should reset the indicator that the dropdown should automatically open (if so configured) once data has been loaded', () => {
      component.failedToOpen = true;

      component.closeList();

      expect(component.failedToOpen).toBe(false);
    });
  });

  describe('openList', () => {
    it('should not display the list when there are no selectable options', () => {
      component.config.options = [];

      component.toggleList();

      expect(component.isOpen).toBe(false);
    });

    it('should store that the dropdown should automatically open (if so configured) once data has been loaded', () => {
      component.failedToOpen = false;
      component.config.options = [];

      component.openList();

      expect(component.failedToOpen).toBe(true);
    });

    it('should display the list when there are selectable options', () => {
      component.toggleList();

      expect(component.isOpen).toBe(true);
    });

    it('should store the starting values of each option for later use', () => {
      component.originals = [];

      component.toggleList();

      expect(component.originals).toEqual([{
        id: 1, isSelected: true
      }, {
        id: 2, isSelected: true
      }, {
        id: 3, isSelected: false
      }]);
    });

    it('should notify all listeners that the list has been opened', () => {
      component.id = 'happy-fun-times';
      spyOn(component.opened, 'emit');

      component.toggleList();

      expect(component.opened.emit).toHaveBeenCalledTimes(1);
      expect(component.opened.emit).toHaveBeenCalledWith('happy-fun-times');
    });
  });

  describe('selectAllByDefault', () => {
    beforeEach(() => {
      if (!component?.config?.options?.length || component.config.options.length < 2) {
        expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
        return;
      }

      component.config.options[0].isSelected = false;
      component.config.options[1].isSelected = false;
    });

    describe('when all options should be selected by default', () => {
      beforeEach(() => {
        component.config.selectAllByDefault = true;
        component.selectAllOption.isSelected = false;
      });

      it('all options should be selected', () => {
        if (!component?.config?.options?.length) {
          expect(component?.config?.options).toBeDefined();
          return;
        }

        component.selectAllByDefault();

        component.config.options.forEach(o => expect(o.isSelected).toBe(true));
      });

      it('the (Select All) option should be selected', () => {
        component.selectAllByDefault();

        expect(component.selectAllOption.isSelected).toBe(true);
      });
    });

    describe('when all options should not be selected by default', () => {
      beforeEach(() => {
        component.config.selectAllByDefault = false;
        component.selectAllOption.isSelected = false;
      });

      it('all options should not be selected', () => {
        if (!component?.config?.options?.length) {
          expect(component?.config?.options).toBeDefined();
          return;
        }

        component.selectAllByDefault();

        component.config.options.forEach(o => expect(o.isSelected).toBe(false));
      });

      it('the (Select All) option should not be selected', () => {
        component.selectAllByDefault();

        expect(component.selectAllOption.isSelected).toBe(false);
      });
    });
  });

  describe('toggleList', () => {
    it('should open the list when it is closed', () => {
      component.isOpen = false;
      spyOn(component, 'openList');

      component.toggleList();

      expect(component.openList).toHaveBeenCalledTimes(1);
    });

    it('should close the list when it is open', () => {
      component.isOpen = true;
      spyOn(component, 'closeList');

      component.toggleList();

      expect(component.closeList).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggleOption', () => {
    beforeEach(() => {
      component.showSelectAllOption = true;
    });

    describe('when the (Select All) option is toggled', () => {
      describe('and it is currently not selected', () => {
        beforeEach(() => {
          if (!component?.config?.options?.length || component.config.options.length < 2) {
            expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
            return;
          }

          component.config.options[0].isSelected = false;
          component.config.options[1].isSelected = false;
          component.selectAllOption.isSelected = false;

          component.toggleOption('select-all');
        });

        it('the (Select All) option should be selected', () => {
          expect(component.selectAllOption.isSelected).toBe(true);
        });

        it('every option should be selected', () => {
          if (!component?.config?.options?.length) {
            expect(component?.config?.options).toBeDefined();
            return;
          }

          component.config.options.forEach(o => expect(o.isSelected).toBe(true));
        });
      });

      describe('and it is currently selected', () => {
        beforeEach(() => {
          if (!component?.config?.options?.length) {
            expect(component?.config?.options).toBeDefined();
            return;
          }

          component.config.options[2].isSelected = true;
          component.selectAllOption.isSelected = true;

          component.toggleOption('select-all');
        });

        it('the (Select All) option should be de-selected', () => {
          expect(component.selectAllOption.isSelected).toBe(false);
        });

        it('every option should be de-selected', () => {
          if (!component?.config?.options?.length) {
            expect(component?.config?.options).toBeDefined();
            return;
          }

          component.config.options.forEach(o => expect(o.isSelected).toBe(false));
        });
      });
    });

    describe('when an option is toggled', () => {
      describe('and it is currently selected', () => {
        it('it should be de-selected', () => {
          if (!component?.config?.options?.length) {
            expect(component?.config?.options).toBeDefined();
            return;
          }

          component.toggleOption(1);

          expect(component.config.options[0].isSelected).toBe(false);
        });

        it('and the (Select All) option is displayed and selected, the (Select All) option should be de-selected', () => {
          component.selectAllOption.isSelected = true;

          component.toggleOption(1);

          expect(component.selectAllOption.isSelected).toBe(false);
        });

       describe('and the dropdown is not multi-select enabled', () => {
          beforeEach(() => {
            spyOn(component, 'toggleList');
            component.config.allowMultiple = false;
          });

          it('the list of options should remain open', () => {
            component.toggleOption(1);

            expect(component.toggleList).not.toHaveBeenCalled();
          });

          it('all other options should be left alone', () => {
            if (!component?.config?.options?.length || component.config.options.length < 3) {
              expect(component?.config?.options?.length).toBeGreaterThanOrEqual(3);
              return;
            }

            component.toggleOption(1);

            expect(component.config.options[1].isSelected).toBe(true);
            expect(component.config.options[2].isSelected).toBe(false);
          });
        });
      });

      describe('and it is currently not selected', () => {
        it('it should be selected', () => {
          if (!component?.config?.options?.length || component.config.options.length < 3) {
            expect(component?.config?.options?.length).toBeGreaterThanOrEqual(3);
            return;
          }

          component.toggleOption(3);

          expect(component.config.options[2].isSelected).toBe(true);
        });

        it('and the (Select All) option is displayed and the option being toggled is the last option to be selected, the (Select All) option should be selected', () => {
          component.selectAllOption.isSelected = false;

          component.toggleOption(3);

          expect(component.selectAllOption.isSelected).toBe(true);
        });

        it('and the (Select All) option is displayed and the option being toggled is not the last option to be selected, the (Select All) option should remain de-selected', () => {
          if (!component?.config?.options?.length || component.config.options.length < 2) {
            expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
            return;
          }

          component.config.options[1].isSelected = false;
          component.selectAllOption.isSelected = false;

          component.toggleOption(3);

          expect(component.selectAllOption.isSelected).toBe(false);
        });

        describe('and the dropdown is not multi-select enabled', () => {
          beforeEach(() => {
            spyOn(component, 'toggleList');
            component.config.allowMultiple = false;
          });

          it('the list of options should be hidden', () => {
            component.toggleOption(3);

            expect(component.toggleList).toHaveBeenCalledTimes(1);
          });

          it('all other options should be de-selected', () => {
            if (!component?.config?.options?.length || component.config.options.length < 2) {
              expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
              return;
            }

            component.toggleOption(3);

            expect(component.config.options[0].isSelected).toBe(false);
            expect(component.config.options[1].isSelected).toBe(false);
          });
        });
      });
    });

    it('should update the button text', () => {
      spyOn(component, 'updateButtonText');

      component.toggleOption(1);

      expect(component.updateButtonText).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateButtonText', () => {
    it('should show the configured empty text when there are no selectable options and there is an empty text configured', () => {
      component.config.options = [];
      component.config.emptyText = 'Nothing to Select';

      component.updateButtonText();

      expect(component.buttonText).toBe('Nothing to Select');
    });

    it('should show nothing when there are no selectable options and there is no empty text configured', () => {
      component.config.options = [];

      component.updateButtonText();

      expect(component.buttonText).toBe('');
    });

    it('should show the configured none selected text when no selectable options are selected and there is none selected text configured', () => {
      if (!component?.config?.options?.length || component.config.options.length < 2) {
        expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
        return;
      }

      component.config.options[0].isSelected = false;
      component.config.options[1].isSelected = false;
      component.config.noneSelectedText = 'None Selected';

      component.updateButtonText();

      expect(component.buttonText).toBe('None Selected');
    });

    it('should show nothing when no selectable options are selected and there is no none selected text configured', () => {
      if (!component?.config?.options?.length || component.config.options.length < 2) {
        expect(component?.config?.options?.length).toBeGreaterThanOrEqual(2);
        return;
      }

      component.config.options[0].isSelected = false;
      component.config.options[1].isSelected = false;

      component.updateButtonText();

      expect(component.buttonText).toBe('');
    });

    it('should show \'All\' when all selectable options are selected', () => {
      if (!component?.config?.options?.length) {
        expect(component?.config?.options).toBeDefined();
        return;
      }

      component.config.options.pop();

      component.updateButtonText();

      expect(component.buttonText).toBe('All');
    });

    it('should show the number of selected options followed by a comma-separated list of the values of the selected options when more than one, but less than all, options are selected', () => {
      component.updateButtonText();

      expect(component.buttonText).toBe('(2) First Option, Second Option');
    });
  });
});
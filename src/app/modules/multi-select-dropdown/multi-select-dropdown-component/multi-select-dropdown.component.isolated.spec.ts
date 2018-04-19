import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EaMultiSelectDropdownComponent } from './multi-select-dropdown.component';
import { EaMultiSelectDropdownOption } from '../models/multi-select-dropdown-option.model';
import { EaMultiSelectDropdownService } from '../multi-select-dropdown-service/multi-select-dropdown.service';
import { MockEaMultiSelectDropdownService } from '../multi-select-dropdown-service/mock-multi-select-dropdown.service';
import { customMatchers } from '../../../../testing/custom-matchers';
import { EventEmitter, SimpleChanges } from '@angular/core';
import { EaMultiSelectDropdownConfig } from '../models';

describe('EaMultiSelectDropdownComponent', () => {
  let component: EaMultiSelectDropdownComponent;
  let fixture: ComponentFixture<EaMultiSelectDropdownComponent>;
  let updateButtonTextSpy: jasmine.Spy;
  let defaultOptions: EaMultiSelectDropdownOption[];
  let multiSelectDropdownService: EaMultiSelectDropdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EaMultiSelectDropdownComponent ],
      providers: [
        {
          provide: EaMultiSelectDropdownService,
          useClass: MockEaMultiSelectDropdownService
        }
      ]
    })
    .compileComponents();

    multiSelectDropdownService = TestBed.get(EaMultiSelectDropdownService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    updateButtonTextSpy = spyOn(component, 'updateButtonText');
    fixture.detectChanges();

    defaultOptions = [
      { display: 'First Option', id: 1, isSelected: false, value: '[First].[Option]' },
      { display: 'Second Option', id: 2, isSelected: false, value: '[Second].[Option]' },
      { display: 'Third Option', id: 3, isSelected: false, value: '[Third].[Option]' }
    ];
  });

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
  });

  describe('should define a default value', () => {
    it('to hide the list of options', () => {
      // assert
      expect(component.isOpen).toBe(false);
    });
  });

  describe('during initialization', () => {
    beforeEach(() => {
      // arrange
      spyOn(component, 'buildConfig');
      spyOn(component, 'selectAll').and.callThrough();
    });

    it('should apply the first col positioning class found on the button to the list when the list does not have a col positioning class',
      () => {
        // arrange
        component.config.listClasses = ['dropdown-list'];
        component.config.buttonClasses = ['col-1', 'col-12'];

        // act
        component.ngAfterContentInit();

        // assert
        expect(component.config.listClasses).toEqual(['dropdown-list', 'col-1']);
      }
    );

    it('should not apply any new col positioning class to the list when the list already has a col positioning class', () => {
      // arrange
      component.config.listClasses = ['dropdown-list', 'col-9'];
      component.config.buttonClasses = ['col-1', 'col-12'];

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.config.listClasses).toEqual(['dropdown-list', 'col-9']);
    });

    it('should reset all select all properties when multiple selections are not allowed', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.allowMultiple = false;

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAllOption).toEqual(<EaMultiSelectDropdownOption>{
        id: 'select-all',
        isSelected: false
      });
      expect(component.config.addSelectAllOption).toBe(false);
    });

    it('should build the select all option when the select all option is included and a value is provided and there are options to select', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.selectAllValue = 'select-all-value';
      component.config.options = [
        {display: 'First Option', id: 'first-option', isSelected: false, value: '[First].[Option]'},
        {display: 'Second Option', id: 'second-option', isSelected: false, value: '[Second].[Option]'},
        {display: 'Third Option', id: 'third-option', isSelected: false, value: '[Third].[Option]'}
      ];

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAllOption).toEqual({
        display: '(Select All)',
        id: 'select-all',
        isSelected: false,
        value: 'select-all-value'
      });
    });

    it('should build the select all option when the select all option is included and custom text is provided and there are options to select', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.selectAllText = 'All';
      component.config.options = [
        {display: 'First Option', id: 'first-option', isSelected: false, value: '[First].[Option]'},
        {display: 'Second Option', id: 'second-option', isSelected: false, value: '[Second].[Option]'},
        {display: 'Third Option', id: 'third-option', isSelected: false, value: '[Third].[Option]'}
      ];

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAllOption).toEqual({
        display: 'All',
        id: 'select-all',
        isSelected: false,
        value: null
      });
    });

    it('should build the select all option when the select all option is included and all options should be selected by default and there are options to select', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.options = [
        {display: 'First Option', id: 'first-option', isSelected: false, value: '[First].[Option]'},
        {display: 'Second Option', id: 'second-option', isSelected: false, value: '[Second].[Option]'},
        {display: 'Third Option', id: 'third-option', isSelected: false, value: '[Third].[Option]'}
      ];
      component.config.selectAllByDefault = true;

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAllOption).toEqual({
        display: '(Select All)',
        id: 'select-all',
        isSelected: true,
        value: null
      });
    });

    it('should select all options when the select all option is included and all options should be selected by default and there are options to select', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.selectAllByDefault = true;
      component.config.options = [
        {display: 'First Option', id: 'first-option', isSelected: false, value: '[First].[Option]'},
        {display: 'Second Option', id: 'second-option', isSelected: false, value: '[Second].[Option]'},
        {display: 'Third Option', id: 'third-option', isSelected: false, value: '[Third].[Option]'}
      ];

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAll).toHaveBeenCalledTimes(1);
    });

    it('should not select all options when the select all option is included, but all options should not be selected by default', () => {
      // arrange
      component.addSelectAllOption = true;

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAll).not.toHaveBeenCalled();
    });

    it('should not build the select all option when the select all option is not included', () => {
      // arrange
      component.addSelectAllOption = false;

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAllOption).toEqual(<EaMultiSelectDropdownOption>{
        id: 'select-all',
        isSelected: false
      });
    });

    it('should not build the select all option when there are no options to select', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.options = [];
      component.config.selectAllByDefault = true;

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAllOption).toEqual(<EaMultiSelectDropdownOption>{
        id: 'select-all',
        isSelected: false
      });
    });

    it('should not select all options when the select all option is not included', () => {
      // arrange
      component.addSelectAllOption = false;
      component.selectAllByDefault = true;

      // act
      component.ngAfterContentInit();

      // assert
      expect(component.selectAll).not.toHaveBeenCalled();
    });

    it('should update the button text', () => {
      // arrange
      updateButtonTextSpy.calls.reset();

      // act
      component.ngAfterContentInit();

      // assert
      expect(updateButtonTextSpy).toHaveBeenCalledTimes(1);
    });

    it('should build the config object', () => {
      // act
      component.ngAfterContentInit();

      // assert
      expect(component.buildConfig).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the data source changes', () => {
    beforeEach(() => {
      spyOn(component, 'selectAll');
    });

    it('should select all options when the select all option is included and all options should be selected by default', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.config.selectAllByDefault = true;

      // act
      component.ngOnChanges(<SimpleChanges>{});

      // assert
      expect(component.selectAll).toHaveBeenCalledTimes(1);
    });

    it('should not select all options when the select all option is included, but all options should not be selected by default', () => {
      // arrange
      component.addSelectAllOption = true;
      component.selectAllByDefault = false;

      // act
      component.ngOnChanges(<SimpleChanges>{});

      // assert
      expect(component.selectAll).not.toHaveBeenCalled();
    });

    it('should not select all options when the select all option is not included', () => {
      // arrange
      component.addSelectAllOption = false;
      component.selectAllByDefault = true;

      // act
      component.ngOnChanges(<SimpleChanges>{});

      // assert
      expect(component.selectAll).not.toHaveBeenCalled();
    });
  });

  describe('buildConfig', () => {
    describe('should set the select all option', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          addSelectAllOption: false
        };
        component.addSelectAllOption = true;

        // act
        component.buildConfig();

        // assert
        expect(component.config.addSelectAllOption).toBe(true);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          addSelectAllOption: false
        };
        component.addSelectAllOption = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.addSelectAllOption).toBe(false);
      });

      it('to false when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.addSelectAllOption = undefined;

        // act
        component.buildConfig();
        // assert
        expect(component.config.addSelectAllOption).toBe(false);
      });
    });

    describe('should set the allow multiple option', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          allowMultiple: false
        };
        component.allowMultiple = true;

        // act
        component.buildConfig();

        // assert
        expect(component.config.allowMultiple).toBe(true);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          allowMultiple: false
        };
        component.allowMultiple = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.allowMultiple).toBe(false);
      });

      it('to true when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.allowMultiple = undefined;

        // act
        component.buildConfig();
        // assert
        expect(component.config.allowMultiple).toBe(true);
      });
    });

    describe('should set the button classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonClasses: ['config-class']
        };
        component.buttonClasses = ['xyz', 'abc'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonClasses).toEqual(['xyz', 'abc']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonClasses: ['config-class']
        };
        component.buttonClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonClasses).toEqual(['config-class']);
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.buttonClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonClasses).toEqual(['btn', 'btn-default']);
      });
    });

    describe('should set the button icon classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonIconClasses: ['config-class']
        };
        component.buttonIconClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonIconClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonIconClasses: ['config-class']
        };
        component.buttonIconClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonIconClasses).toEqual(['config-class']);
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.buttonIconClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonIconClasses).toEqual(['fa', 'fa-angle-down', 'align-self-center']);
      });
    });

    describe('should set the button text style value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonTextStyles: {'blah': 2}
        };
        component.buttonTextStyles = {'boo': 1};

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonTextStyles).toEqual({'boo': 1});
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonTextStyles: {'blah': 2}
        };
        component.buttonTextStyles = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonTextStyles).toEqual({'blah': 2});
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.buttonTextStyles = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonTextStyles).toEqual({'flex': 1});
      });
    });

    describe('should set the button wrapper classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonWrapperClasses: ['config-class']
        };
        component.buttonWrapperClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonWrapperClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          buttonWrapperClasses: ['config-class']
        };
        component.buttonWrapperClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonWrapperClasses).toEqual(['config-class']);
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.buttonWrapperClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.buttonWrapperClasses).toEqual(['d-flex']);
      });
    });

    describe('should set the selected option classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          checkedClasses: ['config-class']
        };
        component.checkedClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.checkedClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          checkedClasses: ['config-class']
        };
        component.checkedClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.checkedClasses).toEqual(['config-class']);
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.checkedClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.checkedClasses).toEqual(['fa', 'fa-check-square-o']);
      });
    });

    describe('should set the container classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          containerClasses: ['config-class']
        };
        component.containerClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.containerClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          containerClasses: ['config-class']
        };
        component.containerClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.containerClasses).toEqual(['config-class']);
      });

      it('to an empty set when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.containerClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.containerClasses).toEqual([]);
      });
    });

    describe('should set the empty text value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        component.config = <EaMultiSelectDropdownConfig>{
          emptyText: 'Nothing to see here'
        };
        component.emptyText = 'Bummer';

        component.buildConfig();

        expect(component.config.emptyText).toBe('Bummer');
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        component.config = <EaMultiSelectDropdownConfig>{
          emptyText: 'Nothing to see here'
        };

        component.buildConfig();

        expect(component.config.emptyText).toBe('Nothing to see here');
      });

      it('to null when there is no value provided on the config or separately', () => {
        component.buildConfig();

        expect(component.config.emptyText).toBe(null);
      });
    });

    describe('should set the list classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          listClasses: ['config-class']
        };
        component.listClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.listClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          listClasses: ['config-class']
        };
        component.listClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.listClasses).toEqual(['config-class']);
      });

      it('to an empty set when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.listClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.listClasses).toEqual([]);
      });
    });

    describe('should set the options', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          options: [
            {display: 'First Config Option', id: 'first-config-option', isSelected: false, value: '[First].[Config].[Option]'},
            {display: 'Second Config Option', id: 'second-config-option', isSelected: false, value: '[Second].[Config].[Option]'},
            {display: 'Third Config Option', id: 'third-config-option', isSelected: false, value: '[Third].[Config].[Option]'}
          ]
        };
        component.config.options = [
          {display: 'First Option', id: 'first-option', isSelected: false, value: '[First].[Option]'},
          {display: 'Second Option', id: 'second-option', isSelected: false, value: '[Second].[Option]'},
          {display: 'Third Option', id: 'third-option', isSelected: false, value: '[Third].[Option]'}
        ];

        // act
        component.buildConfig();

        // assert
        expect(component.config.options).toEqual([
          {display: 'First Option', id: 'first-option', isSelected: false, value: '[First].[Option]'},
          {display: 'Second Option', id: 'second-option', isSelected: false, value: '[Second].[Option]'},
          {display: 'Third Option', id: 'third-option', isSelected: false, value: '[Third].[Option]'}
        ]);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          options: [
            {display: 'First Config Option', id: 'first-config-option', isSelected: false, value: '[First].[Config].[Option]'},
            {display: 'Second Config Option', id: 'second-config-option', isSelected: false, value: '[Second].[Config].[Option]'},
            {display: 'Third Config Option', id: 'third-config-option', isSelected: false, value: '[Third].[Config].[Option]'}
          ]
        };

        // act
        component.buildConfig();

        // assert
        expect(component.config.options).toEqual([
          {display: 'First Config Option', id: 'first-config-option', isSelected: false, value: '[First].[Config].[Option]'},
          {display: 'Second Config Option', id: 'second-config-option', isSelected: false, value: '[Second].[Config].[Option]'},
          {display: 'Third Config Option', id: 'third-config-option', isSelected: false, value: '[Third].[Config].[Option]'}
        ]);
      });

      it('to an empty set when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.config.options = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.options).toEqual([]);
      });
    });

    describe('should set the option classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          optionClasses: ['config-class']
        };
        component.optionClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.optionClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          optionClasses: ['config-class']
        };
        component.optionClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.optionClasses).toEqual(['config-class']);
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.optionClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.optionClasses).toEqual(['multi-select-option']);
      });
    });

    describe('should set the select all by default option', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          selectAllByDefault: false
        };
        component.selectAllByDefault = true;

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllByDefault).toBe(true);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          selectAllByDefault: false
        };
        component.selectAllByDefault = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllByDefault).toBe(false);
      });

      it('to false when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.selectAllByDefault = undefined;

        // act
        component.buildConfig();
        // assert
        expect(component.config.selectAllByDefault).toBe(false);
      });
    });

    describe('should set the select all text', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          selectAllText: 'sturgeon'
        };
        component.selectAllText = 'trout';

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllText).toEqual('trout');
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          selectAllText: 'sturgeon'
        };
        component.selectAllText = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllText).toBe('sturgeon');
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.selectAllText = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllText).toBe('(Select All)');
      });
    });

    describe('should set the select all text', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          selectAllValue: 'sturgeon'
        };
        component.selectAllValue = 'trout';

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllValue).toEqual('trout');
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          selectAllValue: 'sturgeon'
        };
        component.selectAllValue = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllValue).toBe('sturgeon');
      });

      it('to null when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.selectAllValue = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.selectAllValue).toBeNull();
      });
    });

    describe('should set the unselected option classes value', () => {
      it('to the value provided separately when there is a value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          uncheckedClasses: ['config-class']
        };
        component.uncheckedClasses = ['123', '789'];

        // act
        component.buildConfig();

        // assert
        expect(component.config.uncheckedClasses).toEqual(['123', '789']);
      });

      it('to the value provided on the config object when there is no value provided separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {
          uncheckedClasses: ['config-class']
        };
        component.uncheckedClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.uncheckedClasses).toEqual(['config-class']);
      });

      it('to an expected default value when there is no value provided on the config or separately', () => {
        // arrange
        component.config = <EaMultiSelectDropdownConfig> {};
        component.uncheckedClasses = undefined;

        // act
        component.buildConfig();

        // assert
        expect(component.config.uncheckedClasses).toEqual(['fa', 'fa-square-o']);
      });
    });
  });

  describe('close', () => {
    beforeEach(() => {
      spyOn(component.closed, 'emit');
    });

    it('should hide the list of options', () => {
      // arrange
      component.isOpen = true;

      // act
      component.close();

      // assert
      expect(component.isOpen).toBe(false);
    });

    it('should emit the selected options when the list was open before being closed', () => {
      // arrange
      component.isOpen = true;
      component.config.options = [
        <EaMultiSelectDropdownOption>{
          display: 'Cinderella',
          id: 'cd',
          isSelected: true,
          value: 'Cinderella'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Snow White',
          id: 'sw',
          isSelected: false,
          value: 'Snow White'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Briar Rose',
          id: 'br',
          isSelected: false,
          value: 'Briar Rose'
        }
      ];

      // act
      component.close();

      // assert
      expect(component.closed.emit).toHaveBeenCalledTimes(1);
      expect(component.closed.emit).toHaveBeenCalledWith(component.config.options);
    });

    it('should not emit the selected options when the list was closed before being closed', () => {
      // arrange
      component.isOpen = false;
      component.config.options = [
        <EaMultiSelectDropdownOption>{
          display: 'Cinderella',
          id: 'cd',
          isSelected: true,
          value: 'Cinderella'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Snow White',
          id: 'sw',
          isSelected: false,
          value: 'Snow White'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Briar Rose',
          id: 'br',
          isSelected: false,
          value: 'Briar Rose'
        }
      ];

      // act
      component.close();

      // assert
      expect(component.closed.emit).not.toHaveBeenCalled();
    });
  });

  describe('select', () => {
    beforeEach(() => {
      // arrange
      spyOn(component.selected, 'emit');
      spyOn(component, 'close');
      component.config.options = defaultOptions;
      updateButtonTextSpy.calls.reset();
    });

    it('should select the option when the option was not previously selected', () => {
      // act
      component.select(3);

      // assert
      expect(component.config.options[0].isSelected).toBe(false);
      expect(component.config.options[1].isSelected).toBe(false);
      expect(component.config.options[2].isSelected).toBe(true);
    });

    it('should de-select the option when the option was previously selected', () => {
      // arrange
      component.config.options[0].isSelected = true;
      component.config.options[1].isSelected = true;
      component.config.options[2].isSelected = true;

      // act
      component.select(2);

      // assert
      expect(component.config.options[1].isSelected).toBe(false);
    });

    it('should emit the selected option', () => {
      // arrange
      const expectedArgument = Object.assign({}, defaultOptions[0]);
      expectedArgument.isSelected = true;

      // act
      component.select(1);

      // assert
      expect(component.selected.emit).toHaveBeenCalledTimes(1);
      expect(component.selected.emit).toHaveBeenCalledWith(expectedArgument);
    });

    it('should update the button text', () => {
      // act
      component.select(1);

      // assert
      expect(updateButtonTextSpy).toHaveBeenCalledTimes(1);
    });

    it('should update the select all option when the select all option is included and the selected option is the last option to be selected',
      () => {
        // arrange
        component.config.addSelectAllOption = true;
        component.selectAllOption = {
          display: '(Select All)',
          id: 'select-all',
          isSelected: false,
          value: 'Select-All'
        };
        component.config.options[0].isSelected = true;
        component.config.options[1].isSelected = true;

        // act
        component.select(3);

        // assert
        expect(component.selectAllOption.isSelected).toBe(true);
      }
    );

    it('should update the select all option when all options are selected and an option is de-selected', () => {
      // arrange
      component.config.addSelectAllOption = true;
      component.selectAllOption = {
        display: '(Select All)',
        id: 'select-all',
        isSelected: true,
        value: 'Select-All'
      };
      component.config.options[0].isSelected = true;
      component.config.options[1].isSelected = true;
      component.config.options[2].isSelected = true;

      // act
      component.select(3);

      // assert
      expect(component.selectAllOption.isSelected).toBe(false);
    });

    it('should not update the select all option when the select all option is not included', () => {
      // arrange
      component.addSelectAllOption = false;
      component.selectAllOption = <EaMultiSelectDropdownOption>{
        id: 'select-all',
        isSelected: false
      };
      component.config.options[0].isSelected = true;
      component.config.options[1].isSelected = true;

      // act
      component.select(3);

      // assert
      expect(component.selectAllOption.isSelected).toBe(false);
    });

    it('should close the list of options when multiple selections are not allowed', () => {
      // arrange
      component.config.allowMultiple = false;

      // act
      component.select(3);

      // assert
      expect(component.close).toHaveBeenCalledTimes(1);
    });

    it('should de-select all other options when multiple selections are not allowed', () => {
      // arrange
      component.config.allowMultiple = false;
      component.config.options[0].isSelected = true;
      component.config.options[2].isSelected = true;

      // act
      component.select(2);

      // assert
      expect(component.config.options[0].isSelected).toBe(false);
      expect(component.config.options[1].isSelected).toBe(true);
      expect(component.config.options[2].isSelected).toBe(false);
    });
  });

  describe('selectAll', () => {
    beforeEach(() => {
      component.addSelectAllOption = true;
      component.selectAllOption = {
        display: '(Select All)',
        id: 'select-all',
        isSelected: false,
        value: 'Select-All'
      };
      component.config.options = defaultOptions;
      updateButtonTextSpy.calls.reset();

      spyOn(component.allSelected, 'emit');
    });

    it('should indicate that the Select All option has been selected when the Select All indicator is not already showing as selected', () => {
      component.selectAll();

      expect(component.selectAllOption.isSelected).toBe(true);
    });

    it('should indicate that the Select All option has been selected when the Select All indicator is already showing as selected', () => {
      component.selectAllOption.isSelected = true;

      component.selectAll();

      expect(component.selectAllOption.isSelected).toBe(true);
    });

    it('should indicate that every option has been selected when the Select All indicator is not already showing as selected', () => {
      component.selectAll();

      component.config.options.forEach(o => {
        expect(o.isSelected).toBe(true);
      });
    });

    it('should indicate that every option has been selected when the Select All indicator is already showing as selected', () => {
      component.selectAllOption.isSelected = true;

      component.selectAll();

      component.config.options.forEach(o => {
        expect(o.isSelected).toBe(true);
      });
    });

    it('should emit the all selected option', () => {
      const expectedArgument = Object.assign({}, component.selectAllOption);
      expectedArgument.isSelected = true;

      component.selectAll();

      expect(component.allSelected.emit).toHaveBeenCalledTimes(1);
      expect(component.allSelected.emit).toHaveBeenCalledWith(expectedArgument);
    });

    it('should update the button text', () => {
      component.selectAll();

      expect(updateButtonTextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggle', () => {
    beforeEach(() => {
      // arrange
      spyOn(multiSelectDropdownService, 'closeOthers');
      spyOn(component.closed, 'emit');

      component.config.options = [
        {display: 'First Option', id: 'first-option', isSelected: true, value: '[First].[Option]'}
      ];
    });

    it('should display the list values when the list values were previously not displayed and there are values to display', () => {
      // arrange
      component.isOpen = false;

      // act
      component.toggle();

      // assert
      expect(component.isOpen).toBe(true);
    });

    it('should not display the list values when there are no values to display', () => {
      // arrange
      component.isOpen = false;
      component.config.options = [];

      // act
      component.toggle();

      // assert
      expect(component.isOpen).toBe(false);
    });

    it('should notify the service to close other lists when there are no values to display', () => {
      component.isOpen = false;
      component.config.options = [];

      component.toggle();

      expect(multiSelectDropdownService.closeOthers).toHaveBeenCalledTimes(1);
    });

    it('should hide the list values when the list values were previously displayed', () => {
      // arrange
      component.isOpen = true;

      // act
      component.toggle();

      // assert
      expect(component.isOpen).toBe(false);
    });

    it('should notify the service that the list has been opened', () => {
      // arrange
      component.isOpen = false;

      // act
      component.toggle();

      // assert
      expect(multiSelectDropdownService.closeOthers).toHaveBeenCalledTimes(1);
    });

    it('should not notify the service that the list has been closed', () => {
      // arrange
      component.isOpen = true;

      // act
      component.toggle();

      // assert
      expect(multiSelectDropdownService.closeOthers).not.toHaveBeenCalled();
    });

    it('should emit the selected options when the list has been closed', () => {
      // arrange
      component.isOpen = true;
      component.config.options = [
        <EaMultiSelectDropdownOption>{
          display: 'Cinderella',
          id: 'cd',
          isSelected: true,
          value: 'Cinderella'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Snow White',
          id: 'sw',
          isSelected: false,
          value: 'Snow White'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Briar Rose',
          id: 'br',
          isSelected: false,
          value: 'Briar Rose'
        }
      ];

      // act
      component.toggle();

      // assert
      expect(component.closed.emit).toHaveBeenCalledTimes(1);
      expect(component.closed.emit).toHaveBeenCalledWith(component.config.options);
    });

    it('should not emit the selected options when the list has been opened', () => {
      // arrange
      component.isOpen = false;
      component.config.options = [
        <EaMultiSelectDropdownOption>{
          display: 'Cinderella',
          id: 'cd',
          isSelected: true,
          value: 'Cinderella'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Snow White',
          id: 'sw',
          isSelected: false,
          value: 'Snow White'
        },
        <EaMultiSelectDropdownOption>{
          display: 'Briar Rose',
          id: 'br',
          isSelected: false,
          value: 'Briar Rose'
        }
      ];

      // act
      component.toggle();

      // assert
      expect(component.closed.emit).not.toHaveBeenCalled();
    });
  });

  describe('toggleAll', () => {
    beforeEach(() => {
      component.addSelectAllOption = true;
      component.selectAllOption = {
        display: '(Select All)',
        id: 'select-all',
        isSelected: false,
        value: 'Select-All'
      };
      component.config.options = defaultOptions;
      updateButtonTextSpy.calls.reset();

      spyOn(component.allSelected, 'emit');
    });

    it('should select the select all option when the select all option is not selected', () => {
      // act
      component.toggleAll();

      // assert
      expect(component.selectAllOption.isSelected).toBe(true);
    });

    it('should de-select the select all option when the select all option is selected', () => {
      // arrange
      component.selectAllOption.isSelected = true;

      // act
      component.toggleAll();

      // assert
      expect(component.selectAllOption.isSelected).toBe(false);
    });

    it('should select all options when the select all option is selected', () => {
      // act
      component.toggleAll();

      // assert
      component.config.options.forEach(o => {
        expect(o.isSelected).toBe(true);
      });
    });

    it('should de-select all options when the select all option is de-selected', () => {
      // arrange
      component.selectAllOption.isSelected = true;
      component.config.options.forEach(o => {
        o.isSelected = true;
      });

      // act
      component.toggleAll();

      // assert
      component.config.options.forEach(o => {
        expect(o.isSelected).toBe(false);
      });
    });

    it('should emit the all selected option', () => {
      // arrange
      const expectedArgument = Object.assign({}, component.selectAllOption);
      expectedArgument.isSelected = true;

      // act
      component.toggleAll();

      // assert
      expect(component.allSelected.emit).toHaveBeenCalledTimes(1);
      expect(component.allSelected.emit).toHaveBeenCalledWith(expectedArgument);
    });

    it('should update the button text', () => {
      // act
      component.toggleAll();

      // assert
      expect(updateButtonTextSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('EaMultiSelectDropdownComponent', () => {
  let component: EaMultiSelectDropdownComponent;
  let fixture: ComponentFixture<EaMultiSelectDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EaMultiSelectDropdownComponent ],
      providers: [
        {
          provide: EaMultiSelectDropdownService,
          useClass: MockEaMultiSelectDropdownService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaMultiSelectDropdownComponent);
    component = fixture.componentInstance;

    component.config.options = [
      { display: 'First Option', id: 1, isSelected: true, value: '[First].[Option]' },
      { display: 'Second Option', id: 2, isSelected: false, value: '[Second].[Option]' },
      { display: 'Third Option', id: 3, isSelected: true, value: '[Third].[Option]' }
    ];

    fixture.detectChanges();
  });

  describe('updateButtonText', () => {
    it('should show the number of selected items in parentheses when more than one value is selected', () => {
      // act
      component.updateButtonText();

      // assert
      expect(component.buttonText.substring(0, 3)).toBe('(2)');
    });

    it('should show the selected values separated by commas when more than one value is selected', () => {
      // act
      component.updateButtonText();

      // assert
      expect(component.buttonText).toBe('(2) First Option, Third Option');
    });

    it('should show the selected value when only one value is selected', () => {
      // arrange
      component.config.options[0].isSelected = false;

      // act
      component.updateButtonText();

      // assert
      expect(component.buttonText).toBe('Third Option');
    });

    it('should show \'All\' when all options are selected', () => {
      // arrange
      component.config.options[1].isSelected = true;

      // act
      component.updateButtonText();

      // assert
      expect(component.buttonText).toBe('All');
    });

    it('should show the provided empty text when there are no values to select and there is an empty text provided', () => {
      component.config.emptyText = 'Bummer';
      component.config.options = [];

      component.updateButtonText();

      expect(component.buttonText).toBe('Bummer');
    });

    it('should be blank when there are no values to select and there is no empty text provided', () => {
      component.config.options = [];

      component.updateButtonText();

      expect(component.buttonText).toBe('');
    });

    it('should be blank when no values are selected', () => {
      // arrange
      component.config.options[0].isSelected = false;
      component.config.options[2].isSelected = false;

      // act
      component.updateButtonText();

      // assert
      expect(component.buttonText).toBe('');
    });
  });
});

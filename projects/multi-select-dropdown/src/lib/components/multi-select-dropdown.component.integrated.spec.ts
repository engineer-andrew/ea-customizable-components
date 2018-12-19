import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EaMultiSelectDropdownComponent } from './multi-select-dropdown.component';
import { EaMultiSelectDropdownOption } from '../models';
import { customMatchers } from '../../../../../src/testing/custom-matchers';

describe('On the EaMultiSelectDropdownComponent', () => {
  let component: EaMultiSelectDropdownComponent;
  let fixture: ComponentFixture<EaMultiSelectDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EaMultiSelectDropdownComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    spyOn(component, 'updateButtonText');

    fixture.detectChanges();

    jasmine.addMatchers(customMatchers);
  });

  it('there should be a single wrapper around the entire control', () => {
    const debugElement = fixture.debugElement.query(By.css('div.ea-multi-select-dropdown-container'));

    expect(debugElement.nativeElement).toBeDefined();
  });

  it('the wrapper around the control should be stylable from the parent component', () => {
    component.config.containerClasses = ['some-new-class', 'some-other-class'];
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('div.ea-multi-select-dropdown-container.some-new-class.some-other-class'));

    expect(debugElement.nativeElement).toBeDefined();
  });

  it('there should be a label that shows the provided label text', () => {
    component.config.labelText = 'A lovely bunch of coconuts';
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('label'));

    expect(debugElement.nativeElement.textContent).toEqual('A lovely bunch of coconuts');
  });

  it('the label should show the selectable options when it is clicked while they are hidden', () => {
    const label = fixture.debugElement.query(By.css('label'));
    component.config.options = [
      { display: 'First Option', id: 1, value: '[First].[Option]', isSelected: false },
      { display: 'Second Option', id: 2, value: '[Second].[Option]', isSelected: false }
    ];
    label.triggerEventHandler('click', null);
    fixture.detectChanges();

    const optionsList = fixture.debugElement.query(By.css('div.option-list'));

    expect(optionsList.nativeElement).toBeDefined();
  });

  it('the label should hide the selectable options when it is clicked while they are shown', () => {
    const label = fixture.debugElement.query(By.css('label'));
    label.triggerEventHandler('click', null);
    fixture.detectChanges();
    label.triggerEventHandler('click', null);
    fixture.detectChanges();

    const optionsList = fixture.debugElement.query(By.css('div.option-list'));

    expect(optionsList).toBeNull();
  });

  it('there should be a button to show and hide the selectable options', () => {
    const debugElements = fixture.debugElement.queryAll(By.css('button'));

    expect(debugElements.length).toBe(1);
    expect(debugElements[0].nativeElement).toBeDefined();
  });

  it('the wrapper for the elements inside the button should be stylable from the parent component', () => {
    component.config.buttonWrapperClasses = ['some-new-class', 'some-other-class'];
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('button > div.some-new-class.some-other-class'));

    expect(debugElement.nativeElement).toBeDefined();
  });

  it('the button text should be stylable from the parent component when there are selectable options and at least one of the options is selected', () => {
    component.buttonText = 'Show This Text';
    component.config.buttonTextStyles = {'color': 'red'};
    fixture.detectChanges();

    const debugElements = fixture.debugElement.queryAll(By.css('button > div > span'));

    expect(debugElements.length).toBe(1);
    expect(debugElements[0].nativeElement.style.color).toBe('red');
  });

  it('the button text should be stylable from the parent component when there are selectable options, but none are selected', () => {
    component.buttonText = '';
    component.config.buttonTextStyles = {'color': 'red'};
    fixture.detectChanges();

    const debugElements = fixture.debugElement.queryAll(By.css('button > div > span'));

    expect(debugElements.length).toBe(1);
    expect(debugElements[0].nativeElement.style.color).toBe('red');
  });

  it('the icon on the button to show and hide the selectable options should be stylable from the parent component', () => {
    component.config.buttonIconClasses = ['some-new-class', 'some-other-class'];
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('button > div > i.some-new-class.some-other-class'));

    expect(debugElement.nativeElement).toBeDefined();
  });

  it('the list of selectable options should be stylable from the parent component', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.config.options = [
      { display: 'First Option', id: 1, value: '[First].[Option]', isSelected: false },
      { display: 'Second Option', id: 2, value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    component.config.listClasses = ['some-new-class', 'some-other-class'];
    fixture.detectChanges();

    const optionsList = fixture.debugElement.query(By.css('div.option-list.some-new-class.some-other-class'));

    expect(optionsList.nativeElement).toBeDefined();
  });

  it('the list of selectable options should show a (Select All) option when there are more than one selectable options and the parent component has indicated there should be a (Select All) option', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.config.options = [
      { display: 'First Option', id: 1, value: '[First].[Option]', isSelected: false },
      { display: 'Second Option', id: 2, value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectAllOption = fixture.debugElement.query(By.css('div.option-list > div'));

    expect(selectAllOption.nativeElement).toBeDefined();
  });

  it('the list of selectable options should not show a (Select All) option when there are no options to select, there is only one option to select, or the parent component has not indicated there should be a (Select All) option', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = false;
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectAllOption = fixture.debugElement.query(By.css('div.option-list > div'));

    expect(selectAllOption).toBeNull();
  });

  it('the (Select All) option, when present, should be stylable from the parent component', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.config.optionClasses = ['some-new-class', 'some-other-class'];
    component.config.options = [
      { display: 'First Option', id: 1, value: '[First].[Option]', isSelected: false },
      { display: 'Second Option', id: 2, value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectAllOption = fixture.debugElement.query(By.css('div.option-list > div.some-new-class.some-other-class'));

    expect(selectAllOption.nativeElement).toBeDefined();
  });

  it('the (Select All) option should show that it is checked when it is selected', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.selectAllOption.isSelected = true;
    component.config.checkedClasses = ['fa', 'fa-check-square-o'];
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectAllCheckbox = fixture.debugElement.query(By.css('div.option-list > div > i.fa.fa-check-square-o'));

    expect(selectAllCheckbox.nativeElement).toBeDefined();
  });

  it('the (Select All) option should show that it is unchecked when it is not selected', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.config.uncheckedClasses = ['fa', 'fa-square-o'];
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectAllCheckbox = fixture.debugElement.query(By.css('div.option-list > div > i.fa.fa-square-o'));

    expect(selectAllCheckbox.nativeElement).toBeDefined();
  });

  it('the (Select All) option should show the select all text', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.config.addSelectAllOption = true;
    component.selectAllOption.display = 'Select All, Sir!';
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectAllOption = fixture.debugElement.query(By.css('div.option-list > div'));

    expect(selectAllOption.nativeElement.textContent).toContain('Select All, Sir!');
  });

  it('the (Select All) option should select itself and all other options in the list when it is clicked while it is not selected', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.config.addSelectAllOption = true;
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const selectAllOption = fixture.debugElement.query(By.css('div.option-list > div'));

    selectAllOption.triggerEventHandler('click', null);

    component.config.options.forEach(o => expect(o.isSelected).toBe(true));
    expect(component.selectAllOption.isSelected).toBe(true);
  });

  it('the (Select All) option should de-select itself and all other options in the list when it is clicked while it is selected', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = true;
    component.selectAllOption.isSelected = true;
    component.config.addSelectAllOption = true;
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const selectAllOption = fixture.debugElement.query(By.css('div.option-list > div'));

    selectAllOption.triggerEventHandler('click', null);

    component.config.options.forEach(o => expect(o.isSelected).toBe(false));
    expect(component.selectAllOption.isSelected).toBe(false);
  });

  it('the list of selectable options should show all selectable options', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.showSelectAllOption = false;
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
    ];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('div.option-list > div'));

    expect(options.length).toBe(3);
  });

  it('the list of selectable options should not be shown when there are no options to show', () => {
    component.showSelectAllOption = false;
    component.config.options = [];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('div.option-list > div'));

    expect(options[0]).not.toBeDefined();
  });

  it('each selectable option should show that it is checked when it is selected', () => {
    component.showSelectAllOption = false;
    component.config.checkedClasses = ['fa', 'fa-check-square-o'];
    component.config.uncheckedClasses = ['fa', 'fa-square-o'];
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
    ];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectedOptionCheckboxes = fixture.debugElement.queryAll(By.css('div.option-list > div > i.fa.fa-check-square-o'));

    expect(selectedOptionCheckboxes.length).toBe(2);
  });

  it('each selectable option should show that it is unchecked when it is not selected', () => {
    component.showSelectAllOption = false;
    component.config.checkedClasses = ['fa', 'fa-check-square-o'];
    component.config.uncheckedClasses = ['fa', 'fa-square-o'];
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
    ];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const unselectedOptionCheckboxes = fixture.debugElement.queryAll(By.css('div.option-list > div > i.fa.fa-square-o'));

    expect(unselectedOptionCheckboxes.length).toBe(1);
  });

  it('each selectable option should show its own text', () => {
    component.showSelectAllOption = false;
    component.config.checkedClasses = ['fa', 'fa-check-square-o'];
    component.config.uncheckedClasses = ['fa', 'fa-square-o'];
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
    ];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('.option-list > div'));

    expect(options[0].nativeElement.textContent).toContain('First Option');
    expect(options[1].nativeElement.textContent).toContain('Second Option');
    expect(options[2].nativeElement.textContent).toContain('Third Option');
  });

  it('each selectable option should be stylable from the parent component', () => {
    component.showSelectAllOption = false;
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
    ];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    component.config.optionClasses = ['some-new-class', 'some-other-class'];
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('div.option-list > div.some-new-class.some-other-class'));

    expect(options.length).toBe(3);
  });

  it('each selectable option should select itself when it is clicked while it is not selected', () => {
    spyOn(component, 'toggleOption').and.callThrough();
    component.showSelectAllOption = false;
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: false },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: false }
    ];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('div.option-list > div'));

    options[0].triggerEventHandler('click', null);
    options[2].triggerEventHandler('click', null);

    expect(component.toggleOption).toHaveBeenCalledTimes(2);
    expect(component.config.options[0].isSelected).toBe(true);
    expect(component.config.options[1].isSelected).toBe(false);
    expect(component.config.options[2].isSelected).toBe(true);
  });

  it('each selectable option should de-select itself when it is clicked while it is selected', () => {
    spyOn(component, 'toggleOption').and.callThrough();
    component.showSelectAllOption = false;
    component.config.options = [
      <EaMultiSelectDropdownOption>{ id: 1, display: 'First Option', value: '[First].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 2, display: 'Second Option', value: '[Second].[Option]', isSelected: true },
      <EaMultiSelectDropdownOption>{ id: 3, display: 'Third Option', value: '[Third].[Option]', isSelected: true }
    ];
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('div.option-list > div'));

    options[1].triggerEventHandler('click', null);
    options[2].triggerEventHandler('click', null);

    expect(component.toggleOption).toHaveBeenCalledTimes(2);
    expect(component.config.options[0].isSelected).toBe(true);
    expect(component.config.options[1].isSelected).toBe(false);
    expect(component.config.options[2].isSelected).toBe(false);
  });
});

import {
  Component,
  Input,
  AfterContentInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  KeyValueDiffers,
  DoCheck
} from '@angular/core';
import { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from '../models';
import { EaMultiSelectDropdownService } from '../multi-select-dropdown-service/multi-select-dropdown.service';
import { EaMultiSelectDropdownTrackedChange } from '../models/multi-select-dropdown-tracked-change.model';

@Component({
  selector: 'ea-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styles: ['.ea-multi-select-dropdown-container > label { width: 100%; }']
})
export class EaMultiSelectDropdownComponent implements AfterContentInit, OnChanges, DoCheck {
  @Input() addSelectAllOption: boolean;
  @Input() allowMultiple: boolean;
  @Input() buttonClasses: string[] = [];
  @Input() buttonIconClasses: string[];
  @Input() buttonTextStyles: any;
  @Input() buttonWrapperClasses: string[];
  @Input() checkedClasses: string[];
  @Input() containerClasses: string[];
  @Input() emptyText: string;
  @Input() id: string | number;
  @Input() label: string;
  @Input() listClasses: string[] = [];
  @Input() optionClasses: string[];
  @Input() options: EaMultiSelectDropdownOption[] = [];
  @Input() selectAllByDefault: boolean;
  @Input() selectAllText: string;
  @Input() selectAllValue: string;
  @Input() uncheckedClasses: string[];

  @Input() config: EaMultiSelectDropdownConfig = {};

  @Output() allSelected: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();

  public buttonText: string;
  public isOpen = false;
  public optionDiffers: {} = {};
  public selectAllOption: EaMultiSelectDropdownOption = <EaMultiSelectDropdownOption>{
    id: 'select-all',
    isSelected: false
  };
  public trackedChanges: EaMultiSelectDropdownTrackedChange[] = [];

  constructor(private eaMultiSelectDropdownService: EaMultiSelectDropdownService, private differs: KeyValueDiffers) {
  }

  ngAfterContentInit() {
    this.buildConfig();

    if (this.config.listClasses.filter((item) => typeof item === 'string' && item.indexOf('col') > -1).length === 0 &&
        this.config.buttonClasses.filter((item) => typeof item === 'string' && item.indexOf('col') > -1).length > 0) {
          this.config.listClasses.push(this.config.buttonClasses.filter((item) => typeof item === 'string' && item.indexOf('col') > -1)[0]);
    }

    if (!this.config.allowMultiple || this.options.length <= 1) {
      this.config.addSelectAllOption = false;
    }

    if (this.config.addSelectAllOption) {
      this.selectAllOption = {
        display: this.config.selectAllText,
        id: 'select-all',
        isSelected: this.config.selectAllByDefault,
        value: this.config.selectAllValue
      };

      if (this.config.selectAllByDefault) {
        this.selectAll();
      }
    }

    this.updateButtonText();

    this.eaMultiSelectDropdownService.register(this);
  }

  ngDoCheck() {
    if (!!this.trackedChanges && this.trackedChanges.length > 0) {
      this.options.forEach(option => {
        const optionDiffer = this.optionDiffers[option.id];
        const optionChanges = optionDiffer.diff(option);
        if (!!optionChanges) {
          optionChanges.forEachChangedItem(changedOption => {
            if (changedOption.key === 'isSelected') {
              this.trackedChanges.find(tc => tc.key === option.id).currentValue = changedOption.currentValue;
            }
          });
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.config.addSelectAllOption && this.config.selectAllByDefault) {
      this.selectAll();
    }

    if (!!changes.options) {
      if (changes.options.currentValue.length === 1) {
        this.config.addSelectAllOption = false;
      }

      this.optionDiffers = {};
      this.options.forEach(option => this.optionDiffers[option.id] = this.differs.find(option).create());
    }
  }

  buildConfig(): void {
    this.config.addSelectAllOption = (this.addSelectAllOption === null || this.addSelectAllOption === undefined) ?
      (this.config.addSelectAllOption === null || this.config.addSelectAllOption === undefined) ?
      false : this.config.addSelectAllOption : this.addSelectAllOption;

    this.config.allowMultiple = (this.allowMultiple === null || this.allowMultiple === undefined) ?
      (this.config.allowMultiple === null || this.config.allowMultiple === undefined) ?
      true : this.config.allowMultiple : this.allowMultiple;

    this.config.buttonClasses = (this.buttonClasses === null || this.buttonClasses === undefined || this.buttonClasses.length === 0) ?
      (this.config.buttonClasses === null || this.config.buttonClasses === undefined || this.config.buttonClasses.length === 0) ?
      ['btn', 'btn-default'] : this.config.buttonClasses : this.buttonClasses;

    this.config.buttonIconClasses = (!this.buttonIconClasses || this.buttonIconClasses.length === 0) ?
      (!this.config.buttonIconClasses || this.config.buttonIconClasses.length === 0) ?
      ['fa', 'fa-angle-down', 'align-self-center'] : this.config.buttonIconClasses : this.buttonIconClasses;

    this.config.buttonTextStyles = (this.buttonTextStyles === null || this.buttonTextStyles === undefined) ?
      (this.config.buttonTextStyles === null || this.config.buttonTextStyles === undefined) ?
      {'flex': 1} : this.config.buttonTextStyles : this.buttonTextStyles;

    this.config.buttonWrapperClasses = (!this.buttonWrapperClasses || this.buttonWrapperClasses.length === 0) ?
      (!this.config.buttonWrapperClasses || this.config.buttonWrapperClasses.length === 0) ?
      ['d-flex'] : this.config.buttonWrapperClasses : this.buttonWrapperClasses;

    this.config.checkedClasses = (!this.checkedClasses || this.checkedClasses.length === 0) ?
      (!this.config.checkedClasses || this.config.checkedClasses.length === 0) ?
      ['fa', 'fa-check-square-o'] : this.config.checkedClasses : this.checkedClasses;

    this.config.containerClasses = (!this.containerClasses || this.containerClasses.length === 0) ?
      (!this.config.containerClasses || this.config.containerClasses.length === 0) ?
      [] : this.config.containerClasses : this.containerClasses;

    this.config.emptyText = (this.emptyText === null || this.emptyText === undefined) ?
      (this.config.emptyText === null || this.config.emptyText === undefined) ?
      null : this.config.emptyText : this.emptyText;

    this.config.listClasses = (!this.listClasses || this.listClasses.length === 0) ?
      (!this.config.listClasses || this.config.listClasses.length === 0) ?
      [] : this.config.listClasses : this.listClasses;

    this.config.optionClasses = (!this.optionClasses || this.optionClasses.length === 0) ?
      (!this.config.optionClasses || this.config.optionClasses.length === 0) ?
      ['multi-select-option'] : this.config.optionClasses : this.optionClasses;

    this.config.selectAllByDefault = (this.selectAllByDefault === null || this.selectAllByDefault === undefined) ?
      (this.config.selectAllByDefault === null || this.config.selectAllByDefault === undefined) ?
      false : this.config.selectAllByDefault : this.selectAllByDefault;

    this.config.selectAllText = (this.selectAllText === null || this.selectAllText === undefined) ?
      (this.config.selectAllText === null || this.config.selectAllText === undefined) ?
      '(Select All)' : this.config.selectAllText : this.selectAllText;

    this.config.selectAllValue = (this.selectAllValue === null || this.selectAllValue === undefined) ?
      (this.config.selectAllValue === null || this.config.selectAllValue === undefined) ?
      null : this.config.selectAllValue : this.selectAllValue;

    this.config.uncheckedClasses = (!this.uncheckedClasses || this.uncheckedClasses.length === 0) ?
      (!this.config.uncheckedClasses || this.config.uncheckedClasses.length === 0) ?
      ['fa', 'fa-square-o'] : this.config.uncheckedClasses : this.uncheckedClasses;
  }

  close(changed?: boolean): void {
    if (this.isOpen) {
      this.changed.emit(changed !== undefined ? changed : !!this.trackedChanges.find(tc => tc.originalValue !== tc.currentValue));
      this.closed.emit(this.options);
    }
    this.isOpen = false;
  }

  select(id: number | string): void {
    const option = this.options.find(o => o.id === id);
    option.isSelected = !option.isSelected;

    if (this.config.addSelectAllOption) {
      const selectedOptions = this.options.filter(o => o.isSelected).length;
      if (selectedOptions === this.options.length) {
        this.selectAllOption.isSelected = true;
      } else {
        this.selectAllOption.isSelected = false;
      }
    }

    if (!this.config.allowMultiple) {
      this.options.filter(o => o.id !== id).forEach(o => o.isSelected = false);
      this.close(true);
    }

    this.updateButtonText();

    this.selected.emit(option);
  }

  selectAll(): void {
    this.selectAllOption.isSelected = true;
    this.options.forEach(o => o.isSelected = true);
    this.updateButtonText();
    this.allSelected.emit(this.selectAllOption);
  }

  toggle(): void {
    if (this.options.length === 0) {
      this.eaMultiSelectDropdownService.closeOthers(this);
      return;
    }

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.eaMultiSelectDropdownService.closeOthers(this);
      this.trackedChanges = [];
      this.options.forEach(option => {
        this.trackedChanges.push({
          currentValue: option.isSelected,
          key: option.id,
          originalValue: option.isSelected
        });
      });
    } else {
      this.changed.emit(!!this.trackedChanges.find(tc => tc.originalValue !== tc.currentValue));
      this.closed.emit(this.options);
    }
  }

  toggleAll(): void {
    this.selectAllOption.isSelected = !this.selectAllOption.isSelected;
    this.options.forEach(o => o.isSelected = this.selectAllOption.isSelected);
    this.updateButtonText();
    this.allSelected.emit(this.selectAllOption);
  }

  updateButtonText(): void {
    if (this.options.length === 0 && !!this.config.emptyText) {
      this.buttonText = this.config.emptyText;
      return;
    }

    const selectedOptions = this.options.filter(o => o.isSelected);
    if (selectedOptions.length === 0) {
      this.buttonText = '';
      return;
    }

    if (this.options.length > 1 && selectedOptions.length === this.options.length) {
      this.buttonText = 'All';
      return;
    }

    this.buttonText = selectedOptions.length === 1 ? '' : `(${selectedOptions.length}) `;
    selectedOptions.forEach(o => this.buttonText += `${o.display}, `);
    this.buttonText = this.buttonText.substring(0, this.buttonText.length - 2);
  }
}

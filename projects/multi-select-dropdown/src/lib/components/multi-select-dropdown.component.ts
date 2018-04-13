import {
  Component,
  Input,
  Output,
  EventEmitter,
  KeyValueDiffers,
  DoCheck,
  OnInit
} from '@angular/core';
import {
  EaMultiSelectDropdownConfig,
  EaMultiSelectDropdownOption,
  EaMultiSelectDropdownChangedArgs
} from '../models';

@Component({
  selector: 'ea-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styles: ['.ea-multi-select-dropdown-container > label { width: 100%; }']
})
export class EaMultiSelectDropdownComponent implements OnInit, DoCheck {
  @Input() config: EaMultiSelectDropdownConfig = {};
  @Input() id: number | string;

  @Output() changed: EventEmitter<EaMultiSelectDropdownChangedArgs> = new EventEmitter();
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Output() opened: EventEmitter<any> = new EventEmitter();

  public buttonText: string;
  public failedToOpen = false;
  public isOpen = false;
  public originals: {id: (string|number); isSelected: boolean}[] = [];
  public selectAllOption: EaMultiSelectDropdownOption;
  public showSelectAllOption = false;

  private keyValueDiffer: any;

  constructor(private keyValueDiffers: KeyValueDiffers) {}

  ngOnInit(): void {
    // get the default configuration and overwrite the default values with any provided values
    this.applyDefaultConfigurationValues();

    // if the width of the list of options hasn't been explicitly set and the width of the button has (using a bootstrap 'col' class), make them the same width
    if (this.config.listClasses.find(item => item.indexOf('col') === -1)) {
      const buttonWidthClass = this.config.buttonClasses.find(item => item.indexOf('col') > -1);
      if (!!buttonWidthClass) {
        this.config.listClasses.push(buttonWidthClass);
      }
    }

    // define the (Select All) options
    this.selectAllOption = {
      display: this.config.selectAllText,
      id: 'select-all',
      isSelected: false,
      value: this.config.selectAllValue
    };

    // mark every option as selected if that's been specified
    this.selectAllByDefault();

    this.setShowSelectAllOption();

    this.updateButtonText();

    // create a differ on the config object so we can check whether it's changed later
    this.keyValueDiffer = this.keyValueDiffers.find(this.config).create();
  }

  ngDoCheck(): void {
    // the diff function gives us a KeyValueChangeRecord instance with a method to iterate the changed properties on the specified object (the config object in this case)
    const configChanges = this.keyValueDiffer.diff(this.config);
    if (!!configChanges) {
      configChanges.forEachChangedItem(changed => {
        switch (changed.key) {
          case 'options':
            // if the options have changed then we want to basically start over as though the component is being loaded for the first time
            this.setShowSelectAllOption();
            this.selectAllByDefault();
            this.updateButtonText();
            // this.failedToOpen will only ever be true if the user clicked on the dropdown while it was loading data
            // if that happens, and the dropdown is configured to automatically show the options when they become available, then that's exactly what we do
            if (!!this.failedToOpen && this.config.openWhenDataLoads) {
              this.failedToOpen = false;
              this.openList();
            }
            break;
          case 'emptyText':
            // in the event the 'empty text' changes we only really need to update the button text if there are no options
            // if there are options now, then the empty text changes (and we don't update the button text), then the options get removed, that'll trigger the button
            // text to get updated again anyway (above)
            if (!this.isPopulatedArray(this.config.options)) {
              this.updateButtonText();
            }
            break;
        }
      });
    }
  }

  closeList(): void {
    this.isOpen = false;
    const changed: EaMultiSelectDropdownOption[] = [];
    this.config.options.forEach(o => {
      const match = this.originals.find(original => original.id === o.id);
      if (!!match && o.isSelected !== match.isSelected) {
        changed.push(o);
      }
    });
    if (this.isPopulatedArray(changed)) {
      this.changed.emit({
        id: this.id, changes: changed
      });
    }
    this.setOriginals();
    this.failedToOpen = false;
    this.closed.emit(this.id);
  }

  openList(): void {
    this.opened.emit(this.id);
    if (this.isPopulatedArray(this.config.options)) {
      this.isOpen = true;
      this.setOriginals();
    } else {
      this.isOpen = false;
      this.failedToOpen = true;
    }
  }

  selectAllByDefault(): void {
    if (this.config.selectAllByDefault) {
      this.config.options.forEach(o => o.isSelected = true);
      this.selectAllOption.isSelected = true;
    }
  }

  toggleList(): void {
    !!this.isOpen ? this.closeList() : this.openList();
  }

  toggleOption(id: string | number): void {
    if (id === this.selectAllOption.id) {
      this.selectAllOption.isSelected = !this.selectAllOption.isSelected;
      this.config.options.forEach(o => {
        o.isSelected = this.selectAllOption.isSelected;
      });
    } else {
      const option = this.config.options.find(o => o.id === id);
      option.isSelected = !option.isSelected;

      if (this.showSelectAllOption) {
        if (this.config.options.filter(o => o.isSelected).length === this.config.options.length) {
          this.selectAllOption.isSelected = true;
        } else {
          this.selectAllOption.isSelected = false;
        }
      }

      if (option.isSelected && !this.config.allowMultiple) {
        this.toggleList();
        this.config.options.filter(o => o.id !== id).forEach(o => o.isSelected = false);
      }
    }

    this.updateButtonText();
  }

  updateButtonText(): void {
    if (!this.config.options || this.config.options.length === 0) {
      this.buttonText = !!this.config.emptyText ? this.config.emptyText : '';
      return;
    }

    const selectedOptions = this.config.options.filter(o => o.isSelected);
    if (selectedOptions.length === 0) {
      this.buttonText = !!this.config.noneSelectedText ? this.config.noneSelectedText : '';
      return;
    }

    if (this.config.options.length > 1 && selectedOptions.length === this.config.options.length) {
      this.buttonText = 'All';
      return;
    }

    this.buttonText = selectedOptions.length === 1 ? '' : `(${selectedOptions.length}) `;
    selectedOptions.forEach(o => this.buttonText += `${o.display}, `);
    this.buttonText = this.buttonText.substring(0, this.buttonText.length - 2);
  }

  private applyDefaultConfigurationValues(): void {
    this.config.addSelectAllOption = this.isBooleanNullOrUndefined(this.config.addSelectAllOption) ? false : this.config.addSelectAllOption;
    this.config.allowMultiple = this.isBooleanNullOrUndefined(this.config.allowMultiple) ? true : this.config.allowMultiple;
    this.config.buttonClasses = this.isPopulatedArray(this.config.buttonClasses) ? this.config.buttonClasses : ['btn', 'btn-default'];
    this.config.buttonIconClasses = this.isPopulatedArray(this.config.buttonIconClasses) ? this.config.buttonIconClasses : ['fa', 'fa-angle-down', 'align-self-center'];
    this.config.buttonTextStyles = !!this.config.buttonTextStyles ? this.config.buttonTextStyles : {'flex': 1};
    this.config.buttonWrapperClasses = this.isPopulatedArray(this.config.buttonWrapperClasses) ? this.config.buttonWrapperClasses : ['d-flex'];
    this.config.checkedClasses = this.isPopulatedArray(this.config.checkedClasses) ? this.config.checkedClasses : ['fa', 'fa-check-square-o'];
    this.config.listClasses = this.isPopulatedArray(this.config.listClasses) ? this.config.listClasses : [];
    this.config.optionClasses = this.isPopulatedArray(this.config.optionClasses) ? this.config.optionClasses : ['ea-multi-select-option'];
    this.config.selectAllByDefault = this.isBooleanNullOrUndefined(this.config.selectAllByDefault) ? false : this.config.selectAllByDefault;
    this.config.selectAllText = !!this.config.selectAllText ? this.config.selectAllText : '(Select All)';
    this.config.showSelectAllWhenMoreThan = !!this.config.showSelectAllWhenMoreThan ? this.config.showSelectAllWhenMoreThan : 1;
    this.config.uncheckedClasses = this.isPopulatedArray(this.config.uncheckedClasses) ? this.config.uncheckedClasses : ['fa', 'fa-square-o'];
  }

  private isBooleanNullOrUndefined(input: boolean): boolean {
    return input === undefined || input === null;
  }

  private isPopulatedArray(input: any[]): boolean {
    return !!input && input.length > 0;
  }

  private setOriginals(): void {
    this.originals = [];
    this.config.options.forEach(o => {
      this.originals.push({id: o.id, isSelected: o.isSelected});
    });
  }

  private setShowSelectAllOption(): void {
    if (!this.config.addSelectAllOption || !this.config.allowMultiple || !this.config.options || this.config.options.length <= this.config.showSelectAllWhenMoreThan) {
      this.showSelectAllOption = false;
    } else {
      this.showSelectAllOption = true;
    }
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  KeyValueDiffers,
  DoCheck,
  OnInit
} from '@angular/core';

import { EaMultiSelectDropdownChangedKeys } from '../enums';
import {
  EaMultiSelectDropdownConfig,
  EaMultiSelectDropdownOption,
  EaMultiSelectDropdownChangedArgs
} from '../models';

@Component({
  selector: 'ea-multi-select-dropdown',
  templateUrl: './ea-multi-select-dropdown.component.html',
  styles: ['.ea-multi-select-dropdown-container > label { width: 100%; }']
})
export class EaMultiSelectDropdownComponent implements OnInit, DoCheck {
  // the configuration
  @Input() config: EaMultiSelectDropdownConfig = {};
  @Input() id: number | string;

  // event emitted when the dropdown changes
  @Output() changed: EventEmitter<EaMultiSelectDropdownChangedArgs> = new EventEmitter();
  // event emitted when the dropdown is closed
  @Output() closed: EventEmitter<any> = new EventEmitter();
  // event emitted when the dropdown is opened
  @Output() opened: EventEmitter<any> = new EventEmitter();

  public buttonText: string;
  public failedToOpen = false;
  public isOpen = false;
  public originals: {id: (string|number); isSelected: boolean}[] = [];
  public selectAllOption: EaMultiSelectDropdownOption;
  public showSelectAllOption = false;

  private keyValueDiffer: any;

  constructor(private keyValueDiffers: KeyValueDiffers) {}

  public ngOnInit(): void {
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

  public ngDoCheck(): void {
    // the diff function gives us a KeyValueChangeRecord instance with a method to iterate the changed properties on the specified object (the config object in this case)
    const configChanges = this.keyValueDiffer.diff(this.config);
    if (!!configChanges) {
      configChanges.forEachChangedItem(changed => {
        switch (changed.key) {
          case EaMultiSelectDropdownChangedKeys.Options:
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
          case EaMultiSelectDropdownChangedKeys.EmptyText:
            // in the event the 'empty text' changes we only really need to update the button text if there are no options
            // if there are options now, then the empty text changes (and we don't update the button text), then the options get removed, that'll trigger the button
            // text to get updated again anyway (above)
            if (!!this.config.options?.length) {
              this.updateButtonText();
            }
            break;
        }
      });
    }
  }

  public closeList(): void {
    // close the dropdown by setting isOpen to false
    this.isOpen = false;
    // get all of the options that were selected or de-selected while the dropdown was open
    const changed: EaMultiSelectDropdownOption[] = this.config.options.filter(o => this.originals.find(original => o.id === original.id && o.isSelected !== original.isSelected));
    if (!!changed?.length) {
      // if any options changed while the dropdown was open, emit them in the changed event emitter
      this.changed.emit({
        id: this.id, changes: changed
      });

      // reset the originals so the next time the dropdown opens the check is valid again
      this.setOriginals();
    }

    // reset failedToOpen since the dropdown must have been open (because it's being closed now)
    this.failedToOpen = false;

    // emit the closed event
    this.closed.emit(this.id);
  }

  public openList(): void {
    // emit the opened event
    this.opened.emit(this.id);
    if (this.config.options?.length) {
      // if there are options to display, open the dropdown
      this.isOpen = true;
      // set the originals so when the dropdown closes we can check for changed options
      this.setOriginals();
    } else {
      // if there are no options to display, don't open the dropdown (because there's nothing to show anyway), but log that the dropdown couldn't be opened so it can open immediately
      // when the options are loaded (if the configuration is setup that way)
      this.isOpen = false;
      this.failedToOpen = true;
    }
  }

  public selectAllByDefault(): void {
    if (this.config.selectAllByDefault) {
      this.config.options.forEach(o => o.isSelected = true);
      this.selectAllOption.isSelected = true;
    }
  }

  public toggleList(): void {
    !!this.isOpen ? this.closeList() : this.openList();
  }

  public toggleOption(id: string | number): void {
    if (id === this.selectAllOption.id) {
      // if the Select All option was selected, toggle it
      this.selectAllOption.isSelected = !this.selectAllOption.isSelected;
      // and set all of the options to match the Select All option (so if Select All is now selected, all options will now be selected as well)
      this.config.options.forEach(o => {
        o.isSelected = this.selectAllOption.isSelected;
      });
    } else {
      // find the option that was selected
      const option = this.config.options.find(o => o.id === id);
      // toggle the option's selected property
      option.isSelected = !option.isSelected;

      if (this.showSelectAllOption) {
        if (this.config.options.filter(o => o.isSelected).length === this.config.options.length) {
          // if the Select All option is available and this now-selected option is the last one to be selected, select the Select All option as well
          this.selectAllOption.isSelected = true;
        } else {
          // if the Select All option is avaialble and even after this option is selected (or in the event all options *were* selected and now this one is not) de-select the Select All option
          this.selectAllOption.isSelected = false;
        }
      }

      // if the option is being selected and the dropdown is configured to only allow one option to be selected, close the dropdown and de-select all other options
      if (option.isSelected && !this.config.allowMultiple) {
        this.toggleList();
        this.config.options.filter(o => o.id !== id).forEach(o => o.isSelected = false);
      }
    }

    this.updateButtonText();
  }

  public updateButtonText(): void {
    // if there are no options then either display the empty text (if configured) or an empty string (nothing)
    if (!this.config.options?.length) {
      this.buttonText = this.config.emptyText ?? '';
      return;
    }

    // get all selected options
    const selectedOptions = this.config.options.filter(o => o.isSelected);

    // if there no selected options then either display the "none selected" text (if configured) or an empty string (nothing)
    if (!selectedOptions.length) {
      this.buttonText = this.config.noneSelectedText ?? '';
      return;
    }

    // if there is more than one option available and all options are selected, display 'All'
    if (this.config.options.length > 1 && selectedOptions.length === this.config.options.length) {
      this.buttonText = 'All';
      return;
    }

    // the only way this code is reached is if there is one or more - but not all - option selected
    // in that case, show the number of options (if greater than 1) followed by the selected options concatenated by commas
    this.buttonText = selectedOptions.length === 1 ? '' : `(${selectedOptions.length}) `;
    selectedOptions.forEach(o => this.buttonText += `${o.display}, `);
    // strip off the trailing comma and space
    this.buttonText = this.buttonText.substring(0, this.buttonText.length - 2);
  }

  private applyDefaultConfigurationValues(): void {
    this.config.addSelectAllOption = this.isBooleanNullOrUndefined(this.config.addSelectAllOption) ? false : this.config.addSelectAllOption;
    this.config.allowMultiple = this.isBooleanNullOrUndefined(this.config.allowMultiple) ? true : this.config.allowMultiple;
    this.config.buttonClasses = this.config.buttonClasses?.length > 0 ? this.config.buttonClasses : ['btn', 'btn-default'];
    this.config.buttonIconClasses = this.config.buttonIconClasses?.length > 0 ? this.config.buttonIconClasses : ['fa', 'fa-angle-down', 'align-self-center'];
    this.config.buttonTextStyles = !!this.config.buttonTextStyles ? this.config.buttonTextStyles : {'flex': 1};
    this.config.buttonWrapperClasses = this.config.buttonWrapperClasses?.length > 0 ? this.config.buttonWrapperClasses : ['d-flex'];
    this.config.checkedClasses = this.config.checkedClasses?.length > 0 ? this.config.checkedClasses : ['fa', 'fa-check-square-o'];
    this.config.listClasses = this.config.listClasses?.length > 0 ? this.config.listClasses : [];
    this.config.optionClasses = this.config.optionClasses?.length > 0 ? this.config.optionClasses : ['ea-multi-select-option'];
    this.config.selectAllByDefault = this.isBooleanNullOrUndefined(this.config.selectAllByDefault) ? false : this.config.selectAllByDefault;
    this.config.selectAllText = !!this.config.selectAllText ? this.config.selectAllText : '(Select All)';
    this.config.showSelectAllWhenMoreThan = !!this.config.showSelectAllWhenMoreThan ? this.config.showSelectAllWhenMoreThan : 1;
    this.config.uncheckedClasses = this.config.uncheckedClasses?.length > 0 ? this.config.uncheckedClasses : ['fa', 'fa-square-o'];
  }

  private isBooleanNullOrUndefined(input: boolean): boolean {
    return input === undefined || input === null;
  }

  private setOriginals(): void {
    this.originals = [];
    this.config.options.forEach(o => {
      this.originals.push({id: o.id, isSelected: o.isSelected});
    });
  }

  private setShowSelectAllOption(): void {
    // only show the Select All option when:
    // 1) it is configured to be displayed given all other circumstances
    // 2) the dropdown is configured to allow multiple selections
    // 3) there are options to select
    // 4) the number of options available to select is greater than or equal to the minimum threshhold (configured) to display the Select All option
    if (!this.config.addSelectAllOption || !this.config.allowMultiple || !this.config.options || this.config.options.length <= this.config.showSelectAllWhenMoreThan) {
      this.showSelectAllOption = false;
    } else {
      this.showSelectAllOption = true;
    }
  }
}

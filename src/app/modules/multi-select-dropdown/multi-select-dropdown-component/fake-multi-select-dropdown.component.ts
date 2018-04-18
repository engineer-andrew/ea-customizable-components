import { Component, Input, AfterContentInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from '../models';
import { EaMultiSelectDropdownService } from '../multi-select-dropdown-service/multi-select-dropdown.service';
import { EaMultiSelectDropdownComponent } from '../multi-select-dropdown-component/multi-select-dropdown.component';

@Component({
  selector: 'ea-multi-select-dropdown',
  template: '<ng-template></ng-template>',
  styles: ['.multi-select-dropdown-container > label { width: 100%; }']
})
export class FakeEaMultiSelectDropdownComponent extends EaMultiSelectDropdownComponent implements AfterContentInit, OnChanges {
  public buttonText: string;
  public isOpen = false;
  public selectAllOption: EaMultiSelectDropdownOption = <EaMultiSelectDropdownOption>{
    id: 'select-all',
    isSelected: false
  };

  ngAfterContentInit() {
  }

  ngOnChanges() {
  }

  buildConfig(): void {
  }

  close(): void {
  }

  select(id: number | string): void {
  }

  selectAll(): void {
  }

  toggle(): void {
  }

  updateButtonText(): void {
  }
}

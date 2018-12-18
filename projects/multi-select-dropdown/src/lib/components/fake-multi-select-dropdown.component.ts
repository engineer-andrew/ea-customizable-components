import { Component, AfterContentInit, OnChanges } from '@angular/core';
import { EaMultiSelectDropdownOption } from '../models';
import { EaMultiSelectDropdownComponent } from '../components/multi-select-dropdown.component';

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

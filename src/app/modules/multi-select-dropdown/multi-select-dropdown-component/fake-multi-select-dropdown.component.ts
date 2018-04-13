import { Component, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from '../models';
import { EaMultiSelectDropdownService } from '../multi-select-dropdown-service/multi-select-dropdown.service';
import { EaMultiSelectDropdownComponent } from '../multi-select-dropdown-component/multi-select-dropdown.component';

@Component({
  selector: 'ea-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styles: ['.multi-select-dropdown-container > label { width: 100%; }']
})
export class FakeEaMultiSelectDropdownComponent extends EaMultiSelectDropdownComponent implements AfterContentInit {
  public buttonText: string;
  public isOpen = false;
  public selectAllOption: EaMultiSelectDropdownOption = <EaMultiSelectDropdownOption>{
    id: 'select-all',
    isSelected: false
  };

  ngAfterContentInit() {
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

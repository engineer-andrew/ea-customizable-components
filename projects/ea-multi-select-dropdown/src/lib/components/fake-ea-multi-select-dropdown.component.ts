import { Component, OnInit, DoCheck } from '@angular/core';
import { EaMultiSelectDropdownComponent } from './ea-multi-select-dropdown.component';

@Component({
  selector: 'ea-multi-select-dropdown',
  template: '<ng-template></ng-template>',
  styles: ['.ea-multi-select-dropdown-container > label { width: 100%; }']
})
export class FakeEaMultiSelectDropdownComponent extends EaMultiSelectDropdownComponent implements OnInit, DoCheck {
  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }

  closeList(): void {
  }

  openList(): void {
  }

  selectAllByDefault(): void {
  }

  toggleList(): void {
  }

  toggleOption(id: string | number): void {
  }

  updateButtonText(): void {
  }
}

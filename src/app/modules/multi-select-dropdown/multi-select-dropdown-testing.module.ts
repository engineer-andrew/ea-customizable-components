import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeEaMultiSelectDropdownComponent } from './multi-select-dropdown-component/fake-multi-select-dropdown.component';
import { FakeEaMultiSelectDropdownCloseDirective } from './multi-select-dropdown-close-directive/fake-multi-select-dropdown-close.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FakeEaMultiSelectDropdownComponent, FakeEaMultiSelectDropdownCloseDirective]
})
export class EaMultiSelectDropdownTestingModule {}
export { FakeEaMultiSelectDropdownComponent } from './multi-select-dropdown-component/fake-multi-select-dropdown.component';
export { FakeEaMultiSelectDropdownCloseDirective } from './multi-select-dropdown-close-directive/fake-multi-select-dropdown-close.directive';

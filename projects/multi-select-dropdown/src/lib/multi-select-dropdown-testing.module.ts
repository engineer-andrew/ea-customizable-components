import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeEaMultiSelectDropdownComponent } from './components/fake-multi-select-dropdown.component';
import { FakeEaMultiSelectDropdownCloseDirective } from './directives/fake-multi-select-dropdown-close.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FakeEaMultiSelectDropdownComponent, FakeEaMultiSelectDropdownCloseDirective]
})
export class EaMultiSelectDropdownTestingModule {}
export { FakeEaMultiSelectDropdownComponent } from './components/fake-multi-select-dropdown.component';
export { FakeEaMultiSelectDropdownCloseDirective } from './directives/fake-multi-select-dropdown-close.directive';

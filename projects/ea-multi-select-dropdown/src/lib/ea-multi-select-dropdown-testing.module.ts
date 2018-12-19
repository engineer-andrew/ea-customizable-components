import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeEaMultiSelectDropdownComponent } from './components/fake-ea-multi-select-dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FakeEaMultiSelectDropdownComponent]
})
export class EaMultiSelectDropdownTestingModule {}
export { FakeEaMultiSelectDropdownComponent } from './components/fake-ea-multi-select-dropdown.component';

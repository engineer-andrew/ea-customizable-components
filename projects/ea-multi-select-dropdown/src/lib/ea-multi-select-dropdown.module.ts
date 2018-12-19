import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EaMultiSelectDropdownComponent } from './components/ea-multi-select-dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EaMultiSelectDropdownComponent],
  exports: [EaMultiSelectDropdownComponent],
  providers: []
})
export class EaMultiSelectDropdownModule { }
export { EaMultiSelectDropdownComponent } from './components/ea-multi-select-dropdown.component';
export { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption, EaMultiSelectDropdownChangedArgs } from './models';

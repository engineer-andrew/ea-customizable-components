import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EaMultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';

@NgModule({
  declarations: [
    EaMultiSelectDropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EaMultiSelectDropdownComponent
  ],
})
export class EACustomizableComponentsModule {}

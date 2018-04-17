import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EaMultiSelectDropdownComponent } from './multi-select-dropdown-component/multi-select-dropdown.component';
import { EaMultiSelectDropdownService } from './multi-select-dropdown-service/multi-select-dropdown.service';
import { EaMultiSelectDropdownCloseDirective } from './multi-select-dropdown-close-directive/multi-select-dropdown-close.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EaMultiSelectDropdownComponent, EaMultiSelectDropdownCloseDirective],
  exports: [EaMultiSelectDropdownComponent, EaMultiSelectDropdownCloseDirective],
  providers: [EaMultiSelectDropdownService]
})
export class EaMultiSelectDropdownModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: EaMultiSelectDropdownModule
    };
  }
}
export { EaMultiSelectDropdownComponent } from './multi-select-dropdown-component/multi-select-dropdown.component';
export { EaMultiSelectDropdownCloseDirective } from './multi-select-dropdown-close-directive/multi-select-dropdown-close.directive';
export { EaMultiSelectDropdownService } from './multi-select-dropdown-service/multi-select-dropdown.service';
export { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from './models';

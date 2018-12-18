import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EaMultiSelectDropdownComponent } from './components/multi-select-dropdown.component';
import { EaMultiSelectDropdownService } from './providers/multi-select-dropdown.service';
import { EaMultiSelectDropdownCloseDirective } from './directives/multi-select-dropdown-close.directive';

@NgModule({
  declarations: [EaMultiSelectDropdownComponent, EaMultiSelectDropdownCloseDirective],
  imports: [
    CommonModule
  ],
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
export { EaMultiSelectDropdownComponent } from './components/multi-select-dropdown.component';
export { EaMultiSelectDropdownCloseDirective } from './directives/multi-select-dropdown-close.directive';
export { EaMultiSelectDropdownService } from './providers/multi-select-dropdown.service';
export { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from './models';

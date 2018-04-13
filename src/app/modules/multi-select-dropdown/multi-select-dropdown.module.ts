import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EaMultiSelectDropdownComponent } from './multi-select-dropdown-component/multi-select-dropdown.component';
import { EaMultiSelectDropdownService } from './multi-select-dropdown-service/multi-select-dropdown.service';
import { FakeEaMultiSelectDropdownComponent } from './multi-select-dropdown-component/fake-multi-select-dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EaMultiSelectDropdownComponent],
  exports: [EaMultiSelectDropdownComponent],
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
export { FakeEaMultiSelectDropdownComponent } from './multi-select-dropdown-component/fake-multi-select-dropdown.component';
export { EaMultiSelectDropdownService } from './multi-select-dropdown-service/multi-select-dropdown.service';
export { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from './models';

@NgModule({
  declarations: [FakeEaMultiSelectDropdownComponent]
})
export class FakeEaMultiSelectDropdownModule {}

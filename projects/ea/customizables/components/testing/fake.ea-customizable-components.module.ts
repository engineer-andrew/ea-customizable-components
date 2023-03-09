import { NgModule } from '@angular/core';

import { FakeEaMultiSelectDropdownComponent } from './components/fake.multi-select-dropdown.component';

@NgModule({
  declarations: [
    FakeEaMultiSelectDropdownComponent,
  ],
  exports: [
    FakeEaMultiSelectDropdownComponent
  ],
  imports: [ ]
})
export class FakeEaCustomizableComponentsModule {
}

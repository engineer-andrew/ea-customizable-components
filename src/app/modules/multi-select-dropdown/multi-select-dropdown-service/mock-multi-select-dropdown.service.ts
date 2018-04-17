import { EaMultiSelectDropdownServiceInterface  } from './multi-select-dropdown-service.interface';
import { EaMultiSelectDropdownComponent } from '../multi-select-dropdown.module';

export class MockEaMultiSelectDropdownService implements EaMultiSelectDropdownServiceInterface {
  closeAll(): void {}

  closeOthers(component: EaMultiSelectDropdownComponent) {
  }

  register(component: EaMultiSelectDropdownComponent) {
  }
}

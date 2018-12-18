import { EaMultiSelectDropdownServiceInterface  } from './multi-select-dropdown-service.interface';
import { EaMultiSelectDropdownComponent } from '../components/multi-select-dropdown.component';

export class MockEaMultiSelectDropdownService implements EaMultiSelectDropdownServiceInterface {
  closeAll(): void {}

  closeOthers(component: EaMultiSelectDropdownComponent) {
  }

  register(component: EaMultiSelectDropdownComponent) {
  }
}

import { EaMultiSelectDropdownComponent } from '../multi-select-dropdown-component/multi-select-dropdown.component';

export interface EaMultiSelectDropdownServiceInterface {
  closeAll(): void;
  closeOthers(component: EaMultiSelectDropdownComponent);
  register(component: EaMultiSelectDropdownComponent);
}

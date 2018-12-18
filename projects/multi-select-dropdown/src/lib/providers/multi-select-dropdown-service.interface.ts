import { EaMultiSelectDropdownComponent } from '../components/multi-select-dropdown.component';

export interface EaMultiSelectDropdownServiceInterface {
  closeAll(): void;
  closeOthers(component: EaMultiSelectDropdownComponent);
  register(component: EaMultiSelectDropdownComponent);
}

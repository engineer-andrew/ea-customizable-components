import { EaMultiSelectDropdownOption } from './ea-multi-select-dropdown-option.model';

export interface EaMultiSelectDropdownChangedArgs {
  changes: Array<EaMultiSelectDropdownOption>;
  id: string | number;
};

import { EaMultiSelectDropdownOption } from './multi-select-dropdown-option.model';

export interface EaMultiSelectDropdownConfig {
    addSelectAllOption?: boolean;
    allowMultiple?: boolean;
    buttonClasses?: string[];
    buttonIconClasses?: string[];
    buttonTextStyles?: object;
    buttonWrapperClasses?: string[];
    checkedClasses?: string[];
    containerClasses?: string[];
    emptyText?: string;
    id?: string | number;
    labelText?: string;
    listClasses?: string[];
    optionClasses?: string[];
    options?: EaMultiSelectDropdownOption[];
    selectAllByDefault?: boolean;
    selectAllText?: string;
    selectAllValue?: string;
    uncheckedClasses?: string[];
}

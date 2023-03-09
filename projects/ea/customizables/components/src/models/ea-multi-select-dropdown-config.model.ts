import { EaMultiSelectDropdownOption } from './ea-multi-select-dropdown-option.model';

export interface EaMultiSelectDropdownConfig {
    addSelectAllOption?: boolean;
    allowMultiple?: boolean;
    buttonClasses?: Array<string>;
    buttonIconClasses?: Array<string>;
    buttonTextStyles?: object;
    buttonWrapperClasses?: Array<string>;
    checkedClasses?: Array<string>;
    containerClasses?: Array<string>;
    emptyText?: string;
    id?: string | number;
    labelText?: string;
    listClasses?: Array<string>;
    noneSelectedText?: string;
    openWhenDataLoads?: boolean;
    options?: Array<EaMultiSelectDropdownOption>;
    optionClasses?: Array<string>;
    selectAllByDefault?: boolean;
    selectAllText?: string;
    selectAllValue?: string;
    showSelectAllWhenMoreThan?: number;
    uncheckedClasses?: Array<string>;
};

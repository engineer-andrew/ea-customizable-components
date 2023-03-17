import { EaMultiSelectDropdownConfig, EaMultiSelectDropdownOption } from '../models';

export class DefaultEaMultiSelectDropdownConfig implements EaMultiSelectDropdownConfig {
  public addSelectAllOption?: boolean;
  public allowMultiple?: boolean;
  public buttonClasses?: string[];
  public buttonIconClasses?: string[];
  public buttonTextStyles?: object;
  public buttonWrapperClasses?: string[];
  public checkedClasses?: string[];
  public emptyText?: string;
  public labelText?: string;
  public listClasses?: string[];
  public noneSelectedText?: string;
  public optionClasses?: string[];
  public options?: EaMultiSelectDropdownOption[];
  public selectAllByDefault: boolean;
  public selectAllText?: string;
  public showSelectAllWhenMoreThan: number;
  public uncheckedClasses?: string[];

  constructor() {
    this.addSelectAllOption = false;
    this.allowMultiple = true;
    this.buttonClasses = ['btn', 'btn-default'];
    this.buttonIconClasses = ['fa', 'fa-angle-down', 'align-self-center'];
    this.buttonTextStyles = {'flex': 1};
    this.buttonWrapperClasses = ['d-flex'];
    this.checkedClasses = ['fa', 'fa-check-square-o'];
    this.listClasses = [];
    this.optionClasses = ['ea-multi-select-option'];
    this.selectAllByDefault = false;
    this.selectAllText = '(Select All)';
    this.showSelectAllWhenMoreThan = 1;
    this.uncheckedClasses = ['fa', 'fa-square-o'];
  }
}

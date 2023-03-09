import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EaMultiSelectDropdownChangedArgs, EaMultiSelectDropdownConfig } from '../../src';

@Component({
  selector: 'ea-multi-select-dropdown',
  template: ''
})
export class FakeEaMultiSelectDropdownComponent {
  // the configuration
  @Input() config!: EaMultiSelectDropdownConfig;
  @Input() id!: number | string;

  // event emitted when the dropdown changes
  @Output() changed: EventEmitter<EaMultiSelectDropdownChangedArgs> = new EventEmitter();
  // event emitted when the dropdown is closed
  @Output() closed: EventEmitter<any> = new EventEmitter();
  // event emitted when the dropdown is opened
  @Output() opened: EventEmitter<any> = new EventEmitter();
}

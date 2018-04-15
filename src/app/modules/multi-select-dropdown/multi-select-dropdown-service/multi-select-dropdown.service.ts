import { Injectable } from '@angular/core';
import { EaMultiSelectDropdownServiceInterface } from './multi-select-dropdown-service.interface';
import { EaMultiSelectDropdownComponent } from '../multi-select-dropdown.module';

@Injectable()
export class EaMultiSelectDropdownService implements EaMultiSelectDropdownServiceInterface {
  public isBodyListenerRegistered = false;
  public components: EaMultiSelectDropdownComponent[] = [];

  constructor() { }

  closeAll(): void {
    this.components.forEach(c => {
      c.close();
    });
  }

  open(component: EaMultiSelectDropdownComponent): void {
    this.components.forEach(c => {
      if (component.id !== c.id) {
        c.close();
      }
    });
  }

  register(component: EaMultiSelectDropdownComponent): void {
    this.components.push(component);
  }
}

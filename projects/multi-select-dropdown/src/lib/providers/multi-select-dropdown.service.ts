import { Injectable } from '@angular/core';
import { EaMultiSelectDropdownComponent } from '../components/multi-select-dropdown.component';

@Injectable({
  providedIn: 'root'
})
export class EaMultiSelectDropdownService {
  public isBodyListenerRegistered = false;
  public components: EaMultiSelectDropdownComponent[] = [];

  constructor() { }

  closeAll(): void {
    this.components.forEach(c => {
      c.close();
    });
  }

  closeOthers(component: EaMultiSelectDropdownComponent): void {
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

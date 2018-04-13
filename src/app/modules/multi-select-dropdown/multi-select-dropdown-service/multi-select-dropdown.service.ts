import { Injectable } from '@angular/core';
import { EaMultiSelectDropdownServiceInterface } from './multi-select-dropdown-service.interface';
import { EaMultiSelectDropdownComponent } from '../multi-select-dropdown.module';

@Injectable()
export class EaMultiSelectDropdownService implements EaMultiSelectDropdownServiceInterface {
  public isBodyListenerRegistered = false;
  public components: EaMultiSelectDropdownComponent[] = [];

  constructor() { }

  findClosest(element: HTMLElement): HTMLElement {
    return element && (element.className === 'multi-select-dropdown-container' ?
      element : this.findClosest(<HTMLElement>element.parentNode));
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
    if (!this.isBodyListenerRegistered) {
      document.querySelector('body').addEventListener('click', (event) => {
        const match = this.findClosest(<HTMLElement>event.target);
        if (match === null) {
          this.components.forEach(c => c.close());
        }
      });
    }
  }
}

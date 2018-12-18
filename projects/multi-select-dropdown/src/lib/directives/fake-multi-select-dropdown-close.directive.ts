import { Directive, OnDestroy, OnInit } from '@angular/core';
import { EaMultiSelectDropdownCloseDirective } from './multi-select-dropdown-close.directive';

@Directive({
  selector: '[eaBodyClickEvent]'
})
export class FakeEaMultiSelectDropdownCloseDirective extends EaMultiSelectDropdownCloseDirective implements OnDestroy, OnInit {
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  findClosest(element: HTMLElement, classToSearchFor: string): HTMLElement {
      return null;
  }
}

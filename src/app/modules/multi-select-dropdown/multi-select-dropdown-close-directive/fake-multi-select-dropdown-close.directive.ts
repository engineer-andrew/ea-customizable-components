import { Directive, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { EaMultiSelectDropdownService } from '../multi-select-dropdown-service/multi-select-dropdown.service';
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
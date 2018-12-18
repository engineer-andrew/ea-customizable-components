import { Directive, Renderer2, OnDestroy, OnInit, Input, ElementRef } from '@angular/core';
import { EaMultiSelectDropdownService } from '../providers/multi-select-dropdown.service';

@Directive({
  selector: '[eaMultiSelectDropdownClose]'
})
export class EaMultiSelectDropdownCloseDirective implements OnDestroy, OnInit {
  private clickListener;
  @Input('eaMultiSelectDropdownClose') explicit: boolean;

  constructor(private renderer: Renderer2, private host: ElementRef, private service: EaMultiSelectDropdownService) { }

  ngOnInit(): void {
    if (!!this.explicit) {
      this.clickListener = this.renderer.listen(this.host.nativeElement, 'click', (evt) => {
        this.service.closeAll();
      });
    } else {
      this.clickListener = this.renderer.listen('document', 'click', (evt) => {
        const match = this.findClosest(<HTMLElement>evt.target, 'ea-multi-select-dropdown-container');
        if (!match) {
          this.service.closeAll();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.clickListener();
  }

  findClosest(element: HTMLElement, classToSearchFor: string): HTMLElement {
    if (!element) {
      return null;
    }

    if (!!element.className && element.className.includes(classToSearchFor)) {
      return element;
    }

    if (!!element.parentElement) {
      return this.findClosest(element.parentElement, classToSearchFor);
    }
  }
}

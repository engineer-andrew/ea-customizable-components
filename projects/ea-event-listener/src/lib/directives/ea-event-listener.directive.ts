import { Directive, Input, OnInit, Renderer2, EventEmitter, Output, OnDestroy } from '@angular/core';
import { EaEventListenerConfig } from '../models';

@Directive({
  selector: '[eaEventListener]'
})
export class EaEventListenerDirective implements OnInit, OnDestroy {
  @Input() config: EaEventListenerConfig;
  @Output() eaEventListener = new EventEmitter<any>();

  private documentListener;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.documentListener = this.renderer.listen(this.config.listenOn, this.config.event, (evt: any) => {
      const matches = this.findAllInStack(<HTMLElement>evt.target);
      this.eaEventListener.emit(matches);
    });
  }

  ngOnDestroy(): void {
    this.documentListener();
  }

  private findAllInStack(element: HTMLElement): HTMLElement[] {
    const elements = [];

    if (!!element) {
      this.config.matchables.forEach(m => {
        switch (m.matcher) {
          case 'class':
            if (!!element.className) {
              m.matchers.forEach(matcher => {
                if (element.className.includes(matcher)) {
                  elements.push(element);
                }
              });
            }
            break;
          case 'id':
            if (!!element.id) {
              m.matchers.forEach(matcher => {
                if (element.id === matcher) {
                  elements.push(element);
                }
              });
            }
            break;
        }
      });
    }

    if (!!element.parentElement) {
      this.findAllInStack(element.parentElement).forEach(e => {
        elements.push(e);
      });
    }

    return elements;
  }
}

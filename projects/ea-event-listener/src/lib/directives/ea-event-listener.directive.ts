import { Directive, Input, OnInit, Renderer2, EventEmitter, Output, OnDestroy } from '@angular/core';

import { EaEventListenerMatcherTypes } from '../enums';
import { EaEventListenerConfig } from '../models';

@Directive({
  selector: '[eaEventListener]'
})
export class EaEventListenerDirective implements OnInit, OnDestroy {
  @Input() config: EaEventListenerConfig;
  @Output() eaEventListener = new EventEmitter<Array<HTMLElement>>();

  private documentListener: () => void;

  constructor(private renderer: Renderer2) { }

  public ngOnInit(): void {
    // listen for the configured event on the configured DOM element
    this.documentListener = this.renderer.listen(this.config.listenOn, this.config.event, (evt: any) => {
      // look in the DOM tree to see if the element that was interacted with (e.g. clicked) should emit an event
      // e.g.: there is a shopping cart button that displays the contents of the shopping cart, the user should be able to interact with those contents without the menu closing
      // so instead of just always emitting an event whenever the click is "heard" we check the DOM tree and emit any matches based on the configuration
      const matches = this.findAllInStack(<HTMLElement>evt.target);
      this.eaEventListener.emit(matches);
    });
  }

  public ngOnDestroy(): void {
    // consume the listener to remove it
    this.documentListener();
  }

  private findAllInStack(element: HTMLElement): HTMLElement[] {
    const elements = [];

    // there must be an element that was interacted with (this should always be true, but you never know)
    if (!!element) {
      // iterate the config to see what we should be looking for
      this.config.matchables.forEach(m => {
        switch (m.matcher) {
          case EaEventListenerMatcherTypes.ClassMatch:
            // if we should be searching based on class then check the element's class to see if it (the element that was interacted with) has that class on it
            if (!!element.className) {
              // there can be multiple matches so check for all of them
              m.matchers.forEach(matcher => {
                if (element.className.includes(matcher)) {
                  elements.push(element);
                }
              });
            }
            break;
          case EaEventListenerMatcherTypes.IdMatch:
            // if we should be searching based on ID then check the element's id to see if it (the element that was interacted with) is the element we should be looking for
            if (!!element.id) {
              // there can be multiple matches so check for all of them
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

    // if the element has a parent, check all the same things for the parent (and do so recursively until the element has no parent)
    if (!!element.parentElement) {
      this.findAllInStack(element.parentElement).forEach(e => {
        elements.push(e);
      });
    }

    return elements;
  }
}

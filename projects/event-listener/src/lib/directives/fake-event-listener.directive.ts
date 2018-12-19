import { Directive, OnDestroy, OnInit, Input } from '@angular/core';
import { EaEventListenerDirective } from './event-listener.directive';
import { EaEventListenerConfig } from '../models';

@Directive({
  selector: '[eaEventListener]'
})
export class FakeEaEventListenerDirective extends EaEventListenerDirective implements OnInit, OnDestroy {
  @Input() config: EaEventListenerConfig;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}

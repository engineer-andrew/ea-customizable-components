import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EaEventListenerDirective } from './directives/ea-event-listener.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EaEventListenerDirective],
  exports: [EaEventListenerDirective],
  providers: []
})
export class EaEventListenerModule { }
export { EaEventListenerDirective } from './directives/ea-event-listener.directive';
export { EaEventListenerMatcherTypes } from './enums';
export { EaEventListenerConfig, EaEventListenerMatchable } from './models';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EaEventListenerDirective } from './directives/event-listener.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EaEventListenerDirective],
  exports: [EaEventListenerDirective],
  providers: []
})
export class EaEventListenerModule { }
export { EaEventListenerConfig, EaEventListenerMatchable } from './models';

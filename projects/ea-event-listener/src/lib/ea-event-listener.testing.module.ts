import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeEaEventListenerDirective } from './directives/fake-ea-event-listener.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FakeEaEventListenerDirective]
})
export class EaEventListenerTestingModule {}
export { FakeEaEventListenerDirective } from './directives/fake-ea-event-listener.directive';

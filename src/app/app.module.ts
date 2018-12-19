import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EaMultiSelectDropdownModule } from '../../projects/multi-select-dropdown/src/public_api';
import { EaEventListenerModule } from '../../projects/event-listener/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EaMultiSelectDropdownModule,
    EaEventListenerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

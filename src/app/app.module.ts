import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EaMultiSelectDropdownModule } from './modules/multi-select-dropdown/multi-select-dropdown.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EaMultiSelectDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

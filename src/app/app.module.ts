import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetupComponent,
    MeetupListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

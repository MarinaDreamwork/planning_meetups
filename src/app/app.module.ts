import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetupComponent,
    MeetupListComponent,
    AuthComponent,
    AdminComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

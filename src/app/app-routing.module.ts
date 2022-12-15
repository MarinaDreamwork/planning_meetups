import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';
import { AdminGuard } from './guards/admin.guard';
import { IntroComponent } from './components/intro/intro.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'meetups', component: MeetupListComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'introduction', component: IntroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

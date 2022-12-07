import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'meetups', component: MeetupListComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

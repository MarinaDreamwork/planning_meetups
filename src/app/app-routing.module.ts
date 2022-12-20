import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';
import { AdminGuard } from './guards/admin.guard';
import { IntroComponent } from './components/intro/intro.component';
import { MeetupCreationComponent } from './components/meetup-creation/meetup-creation.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'meetups/all_meetups', component: MeetupListComponent, canActivate: [AuthGuard] },
  { path: 'meetups/my_meetups', component: MeetupListComponent, canActivate: [AuthGuard] },
  { path: 'meetups/my_meetups/creation', component: MeetupCreationComponent },
  { path: 'meetups/my_meetups/:id/update', component: MeetupCreationComponent },
  { path: 'admin_dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin_dashboard/users', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  // { path: 'admin_dashboard', component: UsersListComponent, canActivate: [AdminGuard] },
  { path: 'admin_dashboard/users/create', component: CreateUserComponent, canActivate: [AdminGuard] },
  { path: 'admin_dashboard/users/:id/update', component: CreateUserComponent, canActivate: [AdminGuard] },
  { path: 'admin_dashboard/roles', component: AdminDashboardComponent, canActivate: [AdminGuard] },

  { path: 'introduction', component: IntroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

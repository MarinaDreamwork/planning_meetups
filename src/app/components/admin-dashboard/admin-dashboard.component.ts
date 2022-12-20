import { ICurrentUser } from './../meetup/role.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../meetup/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  route = '';
  user!: ICurrentUser | null;
  day!: string;
  roles!: { id: number, name: string }[] | null;

  constructor(private router: Router, private authService: AuthService) {
    const usersRoute = this.router.url.includes('users');
    const rolesRoute = this.router.url.includes('roles');
    if (usersRoute) {
      this.route = 'users'
    } else if (rolesRoute) {
      this.route = 'roles'
    }
  }

  ngOnInit() {
    this.user = this.authService.user;
    const day = new Date();
    this.day = day.getDate() + '.' + (day.getMonth() + 1) + '.' + day.getFullYear() + 'г.';
    this.roles
  }

}

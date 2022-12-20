import { environment, IEnvironment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/meetup/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { ICurrentUser, IRole } from '../components/meetup/role.interface';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  authUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/auth`;
  isAuth = false;
  isAdmin = false;
  isUserCreated = false;
  error = new Subject<string>();
  createUserSubject = new Subject();

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService, private userService: UserService) { }

  login(email: User['email'], password: User['password']) {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, {
      email,
      password,
      fio: ''
    }).subscribe(res => {
      if (res.token) {
        this.localStorageService.setToken(res.token);
        if (this.user) {
          const currentUserRole = this.user.roles;
          const isAdmin = this.checkIsAdmin(currentUserRole);
          isAdmin ? this.isAdmin = true : this.isAdmin = false
          if (this.isAdmin) {
            this.router.navigate(['admin_dashboard']);
          } else {
            this.router.navigate(['meetups/my_meetups'])
          }
        }
      }
    }, error => {
      this.error.next(error.message)
    })
  }

  checkIsAdmin(array: IRole[]) {
    const admin = array.filter(el => el.name === 'ADMIN');
    if (admin.length > 0) {
      return true;
    } else {
      return;
    }
  }

  registration(data: User) {
    return this.http.post<{ token: string }>(`${this.authUrl}/registration`, data)
    // .subscribe(data => {
    //   if (data.token) {
    //     console.log('userService.user', this.user);
    //     // распарсить данные и добавить к массиву пользователей
    //     return this.isUserCreated = true;
    //   } return;
    // });
  }
  parseToken(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  get user(): ICurrentUser | null {
    const token = this.localStorageService.getToken();
    if (token) {
      const user = this.parseToken(token);
      console.log('user', user);
      return user;
    } else return null;
  }

  logout() {
    this.localStorageService.deleteToken();
    this.router.navigate(['login']);
  }


}




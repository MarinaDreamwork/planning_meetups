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
  baseUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/auth`;
  isAuth = false;
  isAdmin = false;
  error = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService, private userService: UserService) { }

  login(email: User['email'], password: User['password']) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
      fio: ''
    }).subscribe(res => {
      if (res.token) {
        this.localStorageService.setToken(res.token);
        this.isAuth = true;
        this.router.navigate(['meetups']);
      }
    }, error => {
      this.error.next(error.message)
    })
  }

  logout() {
    this.localStorageService.deleteToken();
    this.router.navigate(['login']);
  }

}

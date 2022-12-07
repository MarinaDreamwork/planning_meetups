import { environment, IEnvironment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/meetup/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  baseUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/auth`;
  storageKey = 'meetup_app_auth_token';

  constructor(private http: HttpClient, private routes: Router) { }

  login(email: User['email'], password: User['password']) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
      fio: ''
    }).subscribe(res => {
      if (res.token) {
        localStorage.setItem(this.storageKey, res.token);
        console.log('res:', res);
        this.routes.navigate(['meetups']);
      }
    })
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.routes.navigate(['login']);
  }
}

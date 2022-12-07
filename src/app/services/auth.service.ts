import { environment, IEnvironment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/meetup/user.model';

@Injectable()
export class AuthService {
  baseUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/auth`;
  storageKey = 'meetup_app_auth_token';

  constructor(private http: HttpClient) { }

  login(email: User['email'], password: User['password']) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
      fio: ''
    }).subscribe(res => {
      if (res.token) {
        localStorage.setItem(this.storageKey, res.token);
        console.log('res:', res);
        // нужно будет переправить на какой-то url 
      }
    })
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    // пользователь перенаправляется на url login
  }
}

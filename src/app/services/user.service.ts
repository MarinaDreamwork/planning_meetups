import { Injectable } from '@angular/core';
import { User } from '../components/meetup/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService: LocalStorageService) { }

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

  get user(): User | null {
    const token = this.localStorageService.getToken();
    if (token) {
      const user: User = this.parseToken(token);
      console.log();
      return user;
    } else return null;
  }
}

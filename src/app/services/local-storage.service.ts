import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storageKey = 'meetup_app_auth_token';

  constructor() { }

  setToken(token: string) {
    return localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  deleteToken() {
    return localStorage.removeItem(this.storageKey);
  }
}

import { Role, UserRole } from './../components/meetup/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../components/meetup/user.model';
import { HttpClient } from '@angular/common/http';
import { IEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuth = false;
  userUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/user`;
  users!: User[] | undefined;

  constructor(
    private http: HttpClient
  ) { }

  fetchAllUsers() {
    return this.http.get<User[]>(this.userUrl);
  }


  updateUser(updatedUser: User) {
    return this.http.put<User>(`${this.userUrl}/${updatedUser.id}`, updatedUser);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }

  addRole(data: { name: string, userId: number }) {
    return this.http.put<UserRole>(`${this.userUrl}/role`, data);
  }

  addRoles(data: { names: string[], userId: number }) {
    return this.http.post(`${this.userUrl}/role`, data);
  }

}

import { Role, UserRole } from './../components/meetup/user.model';
import { environment } from './../../environments/environment';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { User } from '../components/meetup/user.model';
import { HttpClient } from '@angular/common/http';
import { IEnvironment } from 'src/environments/environment';
import { BehaviorSubject, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit, OnDestroy {
  isAuth = false;
  userUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/user`;
  //users!: User[] | undefined;
  isLoadingUsers = new BehaviorSubject<boolean>(false);
  updatedUserSubject = new Subject<User>();
  reloadUsersData = new Subject<User[]>();
  timerId: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void { }

  loadUsersData() {
    this.timerId = setInterval(() => {
      this.isLoadingUsers.next(true);
      return this.fetchAllUsers().subscribe(val => {
        this.isLoadingUsers.next(false);
      });
    }, 16000);
  }

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

  getUserById(id: number) {
    return this.fetchAllUsers().pipe(
      map(el => el.filter(el => el.id === Number(id))))
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

}

import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ICurrentUser } from '../components/meetup/role.interface';
import { User } from '../components/meetup/user.model';
import { LocalStorageService } from './local-storage.service';
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
  ) {

  }

  fetchAllUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  updateUser(updatedUser: User) {
    return this.http.put<User>(`${this.userUrl}/${updatedUser.id}`, updatedUser).subscribe(data => console.log('update user', data));
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }

}

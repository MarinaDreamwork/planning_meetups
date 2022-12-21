import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment, IEnvironment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UserRole } from '../components/meetup/user.model';
import { IRole } from '../components/meetup/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  rolesUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/role`;
  rolesSubject = new Subject<{ name: string }>();
  updateRoleSubject = new Subject<{ oldName: string, newName: string }>();
  deleteRoleSubject = new Subject<{ name: string }>();
  isLoadingRoles = new BehaviorSubject<boolean>(false);
  reloadRolesData = new Subject<IRole[]>();
  timerId: any;

  constructor(private http: HttpClient) { }

  loadRolesData() {
    this.timerId = setInterval(() => {
      return this.fetchAllRoles().subscribe(value => {
        this.isLoadingRoles.next(false);
        console.log('value from roles data', value);
      })
    }, 20000);
  }

  fetchAllRoles() {
    this.isLoadingRoles.next(true);
    return this.http.get<{ id: number, name: string }[]>(this.rolesUrl);
  }
  addRole(newRole: { name: string }) {
    return this.http.post<{ id: number, name: string, updatedAt: string, createdAt: string }>(this.rolesUrl, newRole)
  }
  updateRoleByName(updatedData: { oldName: string, newName: string }) {
    return this.http.put(this.rolesUrl, updatedData);
  }
  deleteRole(name: { name: string }) {
    return this.http.delete<{ id: number, name: string }>(`${this.rolesUrl}/${name.name}`);
  }
}

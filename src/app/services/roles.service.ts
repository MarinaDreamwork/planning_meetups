import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment, IEnvironment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  rolesUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/role`;
  rolesSubject = new Subject<{ name: string }>();
  updateRoleSubject = new Subject<{ oldName: string, newName: string }>();
  deleteRoleSubject = new Subject<{ name: string }>();


  constructor(private http: HttpClient) { }

  fetchAllRoles() {
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

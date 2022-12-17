import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IRole } from '../components/meetup/role.interface';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.user) {
      const currentUserRole = this.authService.user.roles;
      console.log('currentUserRole', currentUserRole);
      const isAdmin = this.checkIsAdmin(currentUserRole);
      if (isAdmin) {
        return true;
      } return false;
    } else {
      return false;
    }


  }

  checkIsAdmin(array: IRole[]) {
    const admin = array.filter(el => el.name === 'ADMIN');
    if (admin.length > 0) {
      return true;
    } else {
      return;
    }
  }

}

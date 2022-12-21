import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  isAdmin: boolean | undefined = false;

  constructor(
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.isAdmin = this.authService.admin;
    //this.router.url.includes('admin_dashboard');
  }

  onLogout() {
    return this.authService.logout();
  }


}

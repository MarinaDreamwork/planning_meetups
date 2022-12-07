import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isAuth: boolean = false;

  constructor(private authService: AuthService) {
    this.isAuth = this.authService.isAuth;
    console.log('this.isAuth', this.isAuth);
  }

  ngOnInit() {
    console.log('this.isAuth from constructor:', this.isAuth);
  }

  onLogout() {
    this.isAuth = false;
    return this.authService.logout();
  }

}

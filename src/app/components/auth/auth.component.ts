import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(private authService: AuthService, private userService: UserService) { }

  login() {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    this.authService.login(email, password);
  }


}

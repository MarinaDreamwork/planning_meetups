import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy, OnChanges {
  loginForm!: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string | null>
  }>;
  serverError!: null | string;
  private errorSubscription!: Subscription;

  constructor(private authService: AuthService,
    private userService: UserService,
    private fBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
    this.errorSubscription = this.authService.error.subscribe(error => {
      console.log('error:', error);
      this.serverError = error;
    });
  }

  ngOnChanges() {
    console.log('onChanges');
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (email && password) {
      this.authService.login(email, password);
    }
  }

  onEmailFieldErrors() {
    const emailFieldTouched = this.loginForm.get('email')?.touched;
    const emailRequiredError = this.loginForm.get('email')?.hasError('required');
    const emailSchemaError = this.loginForm.get('email')?.hasError('email');
    if (emailRequiredError && emailFieldTouched) {
      return 'Поле email обязательно для заполнения';
    } else if (emailSchemaError && emailFieldTouched) {
      return 'Неверный формат email';
    }
    return;
  }

  onPasswordFieldErrors() {
    const passwordFieldTouched = this.loginForm.get('password')?.touched;
    const passwordRequiredError = this.loginForm.get('password')?.hasError('required');
    if (passwordFieldTouched && passwordRequiredError) {
      return 'Поле "пароль" обязательно для заполнения';
    }
    return;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}

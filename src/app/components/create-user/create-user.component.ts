import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../meetup/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  creationUserForm!: FormGroup<{
    fio: FormControl<string | null>,
    email: FormControl<string | null>,
    password: FormControl<string | null>,
    roles: FormControl<string[] | null>
  }>
  userId!: number | null;

  constructor(
    private fBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    const userId = this.route.snapshot?.params['id'];
    this.userId = userId;
    if (userId) {
      // get userById && initial value of that user
    }
    this.creationUserForm = this.fBuilder.group({
      fio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: [['']]
    })
  }

  isErrorUsernameEmpty() {
    if (this.creationUserForm.get('fio')?.hasError('required') && this.creationUserForm.get('fio')?.touched) {
      return 'Поле Имя пользователя обязательно для заполнения';
    } else return;
  }

  isErrorEmail() {
    if (this.creationUserForm.get('email')?.hasError('required') && this.creationUserForm.get('email')?.touched) {
      return 'Поле Email обязательно для заполнения';
    } else if (this.creationUserForm.get('email')?.hasError('email') && this.creationUserForm.get('email')?.touched) {
      return 'Неверный формат email';
    } else return;
  }

  isErrorPasswordEmpty() {
    if (this.creationUserForm.get('password')?.hasError('required') && this.creationUserForm.get('password')?.touched) {
      return 'Поле Пароль обязательно для заполнения'
    } else return;
  }

  // checkUniqueEmailNames(control: AbstractControl) {
  //   console.log(control.value);
  //   return this.userService.fetchAllUsers().pipe(

  //     filter(users => control.value === users.map(user => {
  //       return user.email === control.value ? { 'userNameExists': true } : null
  //     }))
  //   )
  // }

  onSubmit() {
    const email = this.creationUserForm.get('email')?.value;
    const password = this.creationUserForm.get('password')?.value;
    const fio = this.creationUserForm.get('fio')?.value;
    if (!this.userId) {
      const newUser = this.authService.registration({ email, password, fio }).subscribe(newUser => {
        const { token } = newUser;
        return this.authService.createUserSubject.next(token);
      });
      this.router.navigate(['/users']);
      return newUser;
    } else {
      if (email) {
        const updatedUser = this.userService.updateUser({ email, password, fio, id: this.userId }).subscribe(updatedUser => {
          console.log('updUser', updatedUser);
          return this.authService.createUserSubject.next(updatedUser)
        });
        this.router.navigate(['/users']);
        return updatedUser;
      } else return;
    }
  }
}

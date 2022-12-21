import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';
import { Role, User } from '../meetup/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  creationUserForm!: FormGroup<{
    fio: FormControl<any>,
    email: FormControl<any>,
    password: FormControl<any>,
    roles: FormControl<any>
  }>;

  userId!: number | null;
  roles = ['ADMIN', 'USER'];
  //user!: User;
  isUpdate = false;


  constructor(
    private fBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot?.params['id'];


    if (this.userId) {
      this.isUpdate = true;
      this.userService.getUserById(this.userId).subscribe(user => {
        const roles = user[0].roles?.map(role => {
          return role.name;
        });
        console.log('roles', roles);
        console.log('user', user);
        this.creationUserForm = this.fBuilder.group({
          fio: [`${user[0].fio}`],
          email: [user[0].email],// [Validators.required, Validators.email]]),
          password: [user[0].password],// Validators.required]),
          roles: [roles]
        })
      })


      //const user = this.userList.getUserById(this.userId)
      //console.log('user from create/update', user);
      // get userById && initial value of that user
    }
    this.creationUserForm = this.fBuilder.group({
      fio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: [this.roles]
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
    const roles = this.creationUserForm.get('roles')?.value;

    console.log('value roles', roles);
    if (!this.userId) {
      const newUser = this.authService.registration({ email, password, fio }).subscribe(newUser => {
        const { token } = newUser;
        const user = this.authService.parseToken(token);
        console.log('user from creation user', user);
        // распарсить токен и вытащить оттуда id и заменить this.userId
        if (roles?.length && roles?.length === 1) {
          // распарсим и отправим put /user/role body {name: roles[0], userId: user.id}
          return this.userService.addRole({ name: roles[0], userId: user.id }).subscribe(data => console.log('add role', data))
        } else if (roles?.length && roles?.length > 1) {

          return this.userService.addRoles({ names: roles!, userId: user.id }).subscribe(data => {
            console.log('add rolES', data);
          })
          // POST /user/role body - {names: roles, userId: user.id}
        }
        return this.authService.createUserSubject.next(token);
      });
      this.router.navigate(['/admin_dashboard/users']);
      return newUser;

    } else {
      if (email) {
        const updatedUser = this.userService.updateUser({ email, password, fio, id: this.userId }).subscribe(updatedUser => {
          this.userService.fetchAllUsers();
          if (roles?.length && roles?.length === 1 && this.userId) {
            // распарсим и отправим put /user/role body {name: roles[0], userId: user.id}
            console.log('roles in update', roles);
            return this.userService.addRole({ name: roles[0], userId: this.userId }).subscribe(data => console.log('add role', data))
          } else if (roles?.length && roles?.length > 1 && this.userId) {

            return this.userService.addRoles({ names: roles!, userId: this.userId }).subscribe(data => {
              console.log('add rolES', data);
            })
          }
          return this.userService.updatedUserSubject.next(updatedUser)
        });
        this.router.navigate(['/admin_dashboard/users']);
        return updatedUser;
      } else return;
    }
  }
}

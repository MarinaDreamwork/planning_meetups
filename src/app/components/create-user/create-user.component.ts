import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  creationUserForm!: FormGroup<{
    fio: FormControl<string | null>,
    email: FormControl<string | null>,
    password: FormControl<string | null>
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
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    const email = this.creationUserForm.get('email')?.value;
    const password = this.creationUserForm.get('password')?.value;
    const fio = this.creationUserForm.get('fio')?.value;
    if (!this.userId) {
      return this.authService.registration({ email, password, fio })
    } else {
      if (email) {
        const updatedUser = this.userService.updateUser({ email, password, fio, id: this.userId });
        this.router.navigate(['/users']);
        return updatedUser;
      } else return;

    }


    this.router.navigate(['/users']);
  }
}

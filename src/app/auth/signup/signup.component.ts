import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { User } from '../user';
import { InputComponent } from '../../shared/input/input.component';
import { UniqueEmail } from '../validators/unique-email';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {

  constructor(
    private authService: AuthService,

    private router: Router
  ) {}

 

  onSubmit(user: User) {
    this.authService.addUser(user).subscribe(() => {
      this.router.navigate(['/signin'], { queryParams: { email: user.email } });
    });
  }
}

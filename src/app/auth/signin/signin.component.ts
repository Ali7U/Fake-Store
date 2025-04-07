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
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserFormComponent } from '../user-form/user-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    UserFormComponent,
    AsyncPipe,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  email: string = '';
  formError$ = new BehaviorSubject<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.email = param?.['email'];
      console.log(this.email);
    });
  }

  onSubmit(user: User) {
    this.authService.login(user).subscribe({
      next: (res) => {
        if (res) {
          this.authService.checkProfile().subscribe(() => {});
          this.router.navigateByUrl('');
        }
        console.log(res);
        
      },
      error: (error) => {
        console.log(error);
        localStorage.removeItem('token');
        this.authService.signedIn$.next(false);
        this.formError$.next('Invalid username or password');
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { AuthService } from '../../service/auth.service';
import { FormGroup } from '@angular/forms';
import { User, UserProfile } from '../user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userProfile!: UserProfile;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.checkProfile().subscribe((profile) => {
      if (profile) {
        this.userProfile = profile;
      }
    });
  }

  onSubmit(user: User) {
    this.authService.updateUser(this.userProfile.id, user).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile has been updated',
        });
        this.router.navigate(['/products']);
        return this.authService.username$.next(user.name);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error?.error || 'Error',
          detail: `${err.error?.message}`,
        });
      },
    });
  }
}

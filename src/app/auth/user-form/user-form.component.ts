import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../service/auth.service';
import { UniqueEmail } from '../validators/unique-email';
import { login, User } from '../user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnChanges {
  userForm!: FormGroup;
  @Input() getUserForm?: User;
  @Input() buttonName: string = '';
  @Input() isProfile: boolean = false;
  @Input() isSignIn: boolean = false;
  @Input() userLogin?: login;
  @Input() email = '';

  @Output() userFormSubmit = new EventEmitter();

  constructor(
    private authService: AuthService,
    private uniqueEmail: UniqueEmail
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getUserForm'] && this.getUserForm) {
      this.updateForm(this.getUserForm);
    }
    if (changes['email'] && this.email && this.userForm) {
      this.userForm.patchValue({ email: this.email });
    }
  }

  private initializeForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(this.email || null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9]+$/),
        Validators.minLength(6),
      ]),
      avatar: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/),
      ]),
    });
  }

  private updateForm(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    });
  }

  getControl(control: string): FormControl {
    return this.userForm.get(control) as FormControl;
  }

  onSubmit() {
    this.userFormSubmit.emit(this.userForm.value);
  }
}

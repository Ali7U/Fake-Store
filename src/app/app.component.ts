import {
  Component,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './service/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FormsModule,
    CardModule,
    ButtonModule,
    CommonModule,
    ToastModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'fake-store';
  primeNgConfig = inject(PrimeNG);
  isDarkMode: boolean = false;

  constructor(private authService: AuthService) {
    this.primeNgConfig.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    });
  }

  ngOnInit(): void {
    this.authService.checkProfile().subscribe(() => {});
    this.authService.signedIn$.subscribe((signedIn) => {
      // console.log(signedIn);
    });
  }

  ngOnChanges() {}

  handleDarkMode(value: boolean) {
    const element = document.querySelector('html');

    this.isDarkMode = value;

    if (this.isDarkMode) {
      element?.classList.add('dark');
    } else {
      element?.classList.remove('dark');
    }
  }
}

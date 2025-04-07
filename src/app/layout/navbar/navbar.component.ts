import { AsyncPipe, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AuthService } from '../../service/auth.service';
import { map, Observable, startWith } from 'rxjs';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../service/cart.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ToggleSwitchModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    NgStyle,
    RouterLink,
    AsyncPipe,
    BadgeModule,
    DialogComponent,
    Menubar,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isDarkMode: WritableSignal<boolean> = signal(true);
  signedIn$!: Observable<boolean | null>;
  @Output() setIsDark = new EventEmitter();
  cartVisible: boolean = false;
  itemCount$: Observable<number> = new Observable<number>();
  cartTotal$!: Observable<number>;
  items!: MenuItem[];
  username!: Observable<string>;

  categoryVisible = false;
  isMenuOpen = false;
  isMobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.setIsDark.emit(this.isDarkMode());
    this.signedIn$ = this.authService.signedIn$;
    this.itemCount$ = this.cartService.cartItems$.pipe(
      map((item) => item.reduce((acc, curr) => acc + curr.quantity, 0)),
      startWith(0)
    );

    this.cartTotal$ = this.cartService.cartTotal$;

    this.authService.username$.subscribe((username) => {
      this.items = [
        {
          label: username ? `${username}` : 'Sign',
          icon: 'pi pi-chevron-down',
          items: username
            ? [
                {
                  label: 'Profile',
                  route: '/profile',
                },
                {
                  label: 'Sign Out',
                  route: '/signout',
                },
              ]
            : [
                {
                  label: 'Sign In',
                  route: '/signin',
                },
                {
                  label: 'Sign Up',
                  route: '/signup',
                },
              ],
        },

        {
          label: 'Products',
          icon: 'pi pi-chevron-down',
          items: [
            {
              label: 'View',
              route: '/',
            },
            {
              label: 'Add',
              route: '/create',
            },
          ],
        },
        {
          label: 'Category',
          icon: 'pi pi-chevron-down',
          items: [
            {
              label: 'Add',
              command: () => this.openDialog('Category'),
            },
          ],
        },
        {
          label: 'About',
          route: '/about',
        },
      ];
    });
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
    this.setIsDark.emit(this.isDarkMode());
  }

  openDialog(value: string): void {
    if (value === 'Cart') {
      this.cartVisible = true;
      this.categoryVisible = false;
    } else if (value === 'Category') {
      this.categoryVisible = true;
      this.cartVisible = false;
    }
  }
}

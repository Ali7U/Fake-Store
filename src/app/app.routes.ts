import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { UpdateProductComponent } from './main/update-product/update-product.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { authGuard } from './auth/guard/auth.guard';
import { AboutComponent } from './main/about/about.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  { path: 'signout', component: SignoutComponent },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./main/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./main/create-product/create-product.component').then(
            (m) => m.CreateProductComponent
          ),
      },
      {
        path: 'update/:id',
        component: UpdateProductComponent,
      },
    ],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

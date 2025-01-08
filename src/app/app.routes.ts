import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { NonAuthGuard } from './_guards/nonAuth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
  canActivate:[NonAuthGuard] 
  },
  { path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
    canActivate:[NonAuthGuard]  },
   {
     path: 'history',
     loadComponent: () => import('./components/history/history.component').then(m => m.HistoryComponent),
     canActivate: [AuthGuard]
   },
   {
     path: 'profile',
     loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
     canActivate: [AuthGuard]
   },
   {
     path: 'admin',
     loadComponent: () => import('./components/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent),
     canActivate: [AuthGuard, RoleGuard],
     data: { roles: ['admin'] }
   }
];

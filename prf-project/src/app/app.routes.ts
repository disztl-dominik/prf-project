import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'register', loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent) },
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'doctor-management', loadComponent: () => import('./doctor-management/doctor-management.component').then((c) => c.DoctorManagementComponent), canActivate: [authGuard] },
    { path: 'choose-doctor', loadComponent: () => import('./choose-doctor/choose-doctor.component').then((c) => c.ChooseDoctorComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'dashboard',
        component:DashboardComponent,
    },
    {
        path:'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    },
];

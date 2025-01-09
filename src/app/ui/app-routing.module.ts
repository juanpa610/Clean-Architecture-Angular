import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'sing-in', loadComponent: () => import('./components/sign-in/sign-in.component').then(c => c.SignInComponent) },
  { path: 'sing-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(c => c.SignUpComponent) },
  { path: 'list-albums', loadComponent: () => import('./components/album-list/album-list.component').then(c => c.AlbumListComponent) },
  { path: '**', redirectTo: 'sing-up', pathMatch: 'full' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'list-albums', loadComponent: () => import('./components/album-list/album-list.component').then(c => c.AlbumListComponent) },
  { path: '**', redirectTo: 'list-albums', pathMatch: 'full' },
];

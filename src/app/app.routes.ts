import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: ``, pathMatch: 'full' },
  { path: '**', redirectTo: ``, pathMatch: 'full' },
];

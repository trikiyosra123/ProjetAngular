import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  
  {
    path: 'protected',
    canActivate: [authGuard],
    loadComponent: () => import('./components/protected/protected.component').then(m => m.ProtectedComponent)
  },
  {
    path: 'personnes',
    canActivate: [authGuard],
   
    loadComponent: () => import('./personne/personne.component').then(m => m.PersonneComponent)
  },
   {
    path: 'departements',
    canActivate: [authGuard],
   
    loadComponent: () => import('./departement/departement.component').then(m => m.DepartementComponent)
  },
{
    path: 'regions',
    canActivate: [authGuard],
   
    loadComponent: () => import('./region/region.component').then(m => m.RegionComponent)
  },
 
  {
    path: '**',
    redirectTo: ''
  }

];

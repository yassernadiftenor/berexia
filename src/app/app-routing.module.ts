import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Login' },
  { path: 'Employee', loadChildren: () => import('./components/gestion-emplyee/gestion-emplyee.component')},
  { path: 'Departement', loadChildren: () => import('./components/gestiondepartement/gestiondepartement.component').then(m => m.GestiondepartementComponent) },
  { path: 'Login', loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PanelColoresComponent } from './pages/panel-colores/panel-colores.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'panel-colores', component: PanelColoresComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'panel-colores' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

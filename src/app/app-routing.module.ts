import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthAppComponent } from './layout/auth-app/auth-app.component';
import { LayoutModule } from './layout/layout.module';
import { notLoggedGuard } from './core/guards/not-logged.guard';

const routes: Routes = [
  {
    path:'auth',
    canActivate: [notLoggedGuard],
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AuthAppComponent,
    loadChildren: () => import('./views/template/template.module').then(m => m.TemplateModule)
  },
  {
    path:'', redirectTo : 'admin',pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
   path:'login',
   component: LoginComponent,
   data: { title: 'Login' }
  },
  {
    path:'', redirectTo : '/auth/login',pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [LoginComponent],
  providers: [],
})
export class AuthModule {}




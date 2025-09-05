import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  {
   path:'',
   component: ProfilComponent
  },
  {
   path:'edit',
   component: EditProfilComponent
  }
]

@NgModule({
  declarations: [
    ProfilComponent,
    EditProfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
   ],
  exports: [],
  providers: [],
})
export class UserModule {}

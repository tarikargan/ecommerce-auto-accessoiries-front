import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoadingModule } from 'src/app/shared/components/content-loading/content-loading.module';

const routes : Routes = [
   {
    path:'',
    component: ClientsComponent
   }
]
@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    ReactiveFormsModule,
    ContentLoadingModule
   ],
  exports: [],
  providers: [],
})
export class ClientsModule {}

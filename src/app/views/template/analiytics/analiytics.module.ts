import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliyticsComponent } from './analiytics.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: AnaliyticsComponent,
    data: { title: 'products' }
   },
  {
    path:'', redirectTo : '/admin/options',pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    AnaliyticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   ],
  exports: [],
  providers: [],
})
export class AnaliyticsModule {}

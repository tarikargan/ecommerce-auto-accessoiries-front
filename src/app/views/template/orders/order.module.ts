import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoadingModule } from 'src/app/shared/components/content-loading/content-loading.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { OrderDetailsComponent } from './order-details/order-details.component';


const routes : Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'details/:id',
    component: OrderDetailsComponent
  }
]
@NgModule({
  declarations: [
    OrdersComponent,
    OrdersFormComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ContentLoadingModule,
    QuillModule,
    NgSelectModule
   ],
  exports: [],
  providers: [],
})
export class OrderModule {}

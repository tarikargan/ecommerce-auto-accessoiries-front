import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { ButtonSecondaryComponent } from './button-secondary/button-secondary.component';
import { ButtonSuccessComponent } from './button-success/button-success.component';
import { ButtonInfoComponent } from './button-info/button-info.component';
import { ButtonCustomComponent } from './button-custom/button-custom.component';
import { ButtonCancelComponent } from './button-cancel/button-cancel.component';

@NgModule({
  declarations: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSuccessComponent,
    ButtonInfoComponent,
    ButtonCustomComponent,
    ButtonCancelComponent
  ],
  imports: [ CommonModule ],
  exports: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSuccessComponent,
    ButtonInfoComponent,
    ButtonCustomComponent,
    ButtonCancelComponent
  ],
  providers: [],
})
export class BaseUiModule {}

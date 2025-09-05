import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [ CommonModule ],
  exports: [PopupComponent],
  providers: [],
})
export class PopupModule {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-info',
  templateUrl: './button-info.component.html',
  styleUrls: ['./button-info.component.scss']
})
export class ButtonInfoComponent {
 @Input() btn_name: string = '';
}

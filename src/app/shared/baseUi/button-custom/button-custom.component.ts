import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  templateUrl: './button-custom.component.html',
  styleUrls: ['./button-custom.component.scss']
})
export class ButtonCustomComponent {
 @Input() btn_name: string = 'button label';
 @Input() bg: string       = 'balck';
 @Input() color: string    = 'white';
}

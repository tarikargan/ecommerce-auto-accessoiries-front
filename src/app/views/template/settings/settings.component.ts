import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  activeOption :any = 'production';


  constructor(){

  }

  handleToggleActiveOption(i:any){
    this.activeOption = i;
  }
}

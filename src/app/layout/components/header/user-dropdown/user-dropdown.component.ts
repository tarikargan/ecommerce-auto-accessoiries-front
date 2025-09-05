import { Component, Input, OnInit, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  @Input()  role        :any;
  @Output() logout      :EventEmitter<any>   = new EventEmitter();
  @Output() closeDrop   :EventEmitter<any>   = new EventEmitter();
  clicked = false;

  constructor(
    private el: ElementRef,
  ) { }


  ngOnInit(): void {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
      const clickedInside = this.el.nativeElement.contains(target);
      if (!clickedInside && this.clicked) {
        this.closeDrop.emit();
        this.clicked = false;
      }else{
        this.clicked = true;
      }
  }


  logOut(){
    this.logout.emit();
  }
}

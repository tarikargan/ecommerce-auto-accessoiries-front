import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { UserService } from './../../../core/services/user.service';
import { User } from 'src/app/core/classes/user';
import { take } from 'rxjs/operators';
// import { PopupService } from 'src/app/core/services/popup.service';
import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
// import { NotificationService } from './../../../core/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
// import { EditAvatarService } from './../../../core/services/reactiveService/editAvatar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  environment             :  any     = environment;
  public user             :  User    = new User();
  public notifications    :  any[]   = [];
  public notifCount       :  number  = 0;
  public openDrop_down    :  boolean = false;
  public openDrop_notif   :  boolean = false;
  public openDrop_search  :  boolean = false;
  public clicked          :  boolean = false;

  breadcrumbConfig        :  any     = {
    bgColor       : 'transparent',
    fontSize      : '14px',
    fontColor     : '#98A2B3',
    lastLinkColor : '#000',
    symbol        : ' \\ ',
 }

  constructor(
    // private _notificationSrv          :NotificationService,
    private _userService              :UserService,
    // private _popupService             :PopupService,
    private _authService              :AuthService,
    private _router                   :Router,
    // private _EditAvatarService        :EditAvatarService,
    private _el                       :ElementRef
  ) { }

  // @HostListener('document:click', ['$event.target'])
  // public onClick(target: any) {
  //     const clickedInside = this._el.nativeElement.contains(target);
  //     if (!clickedInside && this.clicked) {
  //       this.openDrop_down  = false;
  //       this.clicked        = false;
  //     }else{
  //       this.clicked = true;
  //     }
  // }

  ngOnInit(): void {
    this._userService.getUser().pipe(take(1)).subscribe((user:User)=>{
      this.user = user
    },
    error =>{
        console.log('sorry someThing went wrong ' + error);
    })

    // edit profile
    // this._EditAvatarService.editAvatar.subscribe((el:User) => {
    //     if(!this.isObjectEmpty(el)){
    //       this.user = el;
    //     }
    // })

    this.getAllNotifs();
  }




  // handle toggle user drop-down
  handToggleDropDown(){
     this.openDrop_down = !this.openDrop_down;
  }

  getAllNotifs(){
    // this._notificationSrv.getAll()
    // .pipe(take(1))
    // .subscribe(data => {
    //   this.notifications = [...data];
    //   console.log('notif',data);
    //   this.notifCount = this.notifications.filter(el => el.read_at == null).length;
    // },
    // error => {
    //   console.error(error);

    // }
    // )
  }

  async readNotif(event:any){
    console.log(event);
    this.notifications = await this.notifications.map(notif => {
      if(notif.id == event && notif.read_at == null){
        console.log({notif});

        notif.read_at = new Date();
        this.notifCount = this.notifCount - 1;
        return notif;
      }else{
        return notif
      }
    })

    console.log('this.notifications',this.notifications);



  }

  toggleSearch(){
     this.openDrop_search = !this.openDrop_search;
  }

  toggleNotif(){
    this.openDrop_notif = !this.openDrop_notif;
      console.log('toggle');
  }




  logOut(){
    this._authService.logout().pipe(take(1)).subscribe(el =>{
      // console.log('logout');
      localStorage.removeItem('access_token');
      this._router.navigateByUrl('/auth/login');

    })
  }


  // check if objet is empty
  isObjectEmpty = (objectName:any) => {
    return JSON.stringify(objectName) === "{}";
  };
}

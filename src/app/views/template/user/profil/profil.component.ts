import { Component } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  public user             :  User    = new User();
  constructor(
    private _userService              :UserService,
  ){

  }


  ngOnInit(): void {
    this._userService.getUser().pipe(take(1)).subscribe((user:User)=>{
      this.user = user
      console.log({user});

    },
    error =>{
        console.log('sorry someThing went wrong ' + error);
    });
  }


}

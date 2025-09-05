import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { EntrepriseService } from 'src/app/core/services/entreprise/entreprise.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public entreprise:any;


  constructor(
    private _userService              :UserService,
    private _authService              :AuthService,
    private _router                   :Router,
    private _EntrepriseService        :EntrepriseService
  ) { }


  ngOnInit(): void {
    this.getEntrepriseDetails();
    // throw new Error('Method not implemented.');
  }


  logOut(){
    this._authService.logout().pipe(take(1)).subscribe(el =>{
      localStorage.removeItem('access_token');
      this._router.navigateByUrl('/auth/login');

    })
  }



  getEntrepriseDetails(){
    this._EntrepriseService.getOwner()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{

      this.entreprise = data;
      // console.log({data});
    },err => {
      console.log(err);
    });
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}

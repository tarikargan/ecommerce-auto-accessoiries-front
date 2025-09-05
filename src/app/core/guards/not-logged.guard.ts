import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { take, map } from 'rxjs/operators';
import { User } from 'src/app/core/classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class notLoggedGuard implements CanActivate {
  constructor(
    private _userService : UserService,
    private _authService : AuthService,
    private _router : Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('access_token')){
        return this._userService.getUser().pipe(take(1),
          map((user: User) => {
            console.log('user::::::::::',user);
            localStorage.removeItem('access_token')
            // this._authService.loginRedirection();
            return false;
          })
        );
      }
    return true;
  }

}

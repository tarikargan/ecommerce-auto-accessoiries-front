import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
// import { UserType } from '../enum/userType';
import { UserService } from './../services/user.service';
import { User } from 'src/app/core/classes/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(
    private _userService : UserService,
    private _authService : AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._userService.getUser().pipe(take(1),
      map((user: User) => {

        if (user && user.status == true) {
          console.log("passed admin guard");
          return true;
        }
        console.log("notpassed admin guard");
        this._authService.loginRedirection();
        return false;
      })
    );
  }

}

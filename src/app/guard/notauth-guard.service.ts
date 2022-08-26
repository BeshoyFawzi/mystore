import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class NotauthGuardService implements CanActivate {

  constructor(private _AuthService:AuthService,private _Router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean | UrlTree> {
    return new Promise(resolve =>{
     this._AuthService.user.subscribe(user =>{
      if(!user){     //if user not login enter this page
        resolve(true);
      }else{
        this._Router.navigate(['/home']);
        resolve(false);
      }
     })
    })
  }
}

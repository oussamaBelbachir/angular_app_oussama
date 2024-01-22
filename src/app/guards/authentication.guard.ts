import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AppStateService} from "../services/app-state.service";


@Injectable({
  providedIn: 'root', // or provide it in a specific module
})
export class AuthenticationGuard{
  constructor(private route : Router, private appState : AppStateService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.appState.authState.isAuthenticated){
      return true;
    }else{
      this.route.navigateByUrl("/login");
      return false;
    }
  }
}

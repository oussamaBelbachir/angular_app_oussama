import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AppStateService} from "../services/app-state.service";


@Injectable({
  providedIn: 'root', // or provide it in a specific module
})
export class AuthorizationGuard{
  constructor(private route : Router, private appState : AppStateService) {
    console.log("yes")
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if(this.appState.authState.roles.includes("ADMIN")){
    if(this.appState.authState.roles.includes(route.data["role"])){
      return true;
    }else{
      this.route.navigateByUrl("/admin/products");
      return false;
    }
  }
}

import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private route : Router,public appState : AppStateService,public ls : LoadingService) {
  }
  actions: Array<any> = [
    { title: 'Home', route: '/home' },
    { title: 'Products', route: '/admin/products' },
    { title: 'New Product', route: '/admin/newProduct' },
  ];

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    this.appState.authState = {};
    this.route.navigateByUrl("/login");
  }

  login() {
    this.route.navigateByUrl("/login");
  }
}

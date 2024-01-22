import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(public appState : AppStateService) {
    // console.log(this.totalCheckedProducts());
  }

  totalCheckedProducts():number{
    // console.log("99",this.appState.productState.products)
    return this.appState.productState.products.reduce((acc:number, p:Product) => {
      if(p.checked){
        return 1 + acc;
      }else return  acc;
    },0);
  }

}

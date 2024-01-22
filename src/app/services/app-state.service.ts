import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState:any = {
    keyword : "",
    products: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 3,
    totalProducts : 0,
    status : "",
    errorMessage : ""
  }

  public authState: any = {
    isAuthenticated : false,
    username : undefined,
    roles : undefined,
    token : undefined
  }

  constructor() { }


  setProductState(state:any){
    this.productState = {...this.productState,...state};
  }

  setAuthState(state:any){
    this.authState = {...this.authState,...state};
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, Observable} from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private host:string = "http://localhost:8089/products";
  constructor(private http: HttpClient) {}
  // public getProducts(page:number=1,size:number=2): Observable<Array<Product>> {
  //   return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  // }
  public getProducts(page:number=1,size:number=2,keyword:string=""){
    return this.http.get(`${this.host}?name_like=${keyword}&_page=${page}&_limit=${size}`,
        {
          observe : "response",
          transferCache: {includeHeaders: ['x-total-count']}
        }).pipe(delay(200));
  }

  public toggleChecked(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.host}/${product.id}`,
      {
        checked: !product.checked,
      }
    );
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(
      `${this.host}/${product.id}`
    );
  }

  public addProduct(product : Product):Observable<Product>{
    return this.http.post<Product>(this.host, product);
  }

  public search(keyword : string):Observable<Array<Product>>{
    return  this.http.get<Array<Product>>(`${this.host}?name_like=${keyword}`);
  }

  public getProductById(id : number):Observable<Product>{
    return this.http.get<Product>(`${this.host}/${id}`);
  }


  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`${this.host}/${product.id}`,product);
  }
}

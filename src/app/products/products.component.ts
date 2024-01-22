// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(private ps: ProductService,public appState : AppStateService) {}

  // public keyword: string="";
  // products: Array<Product> = [];
  // currentPage:number = 1;
  // totalPages:number = 0;
  // pageSize:number = 3;
  // products$!: Observable<Array<Product>>;


  onKeywordChange() {
    // this.ps.search(this.keyword).subscribe({
    //   next : value => {
    //     console.log(value)
    //     this.products = value;
    //   },
    //   error: (err) => {
    //     console.log('**************');
    //     console.error(err.message);
    //     console.error(err);
    //   },
    // })
    // this.appState.productState.currentPage = 1;
    this.appState.setProductState({currentPage: 1});
    this.getProducts();

  }
  ngOnInit(): void {
      this.getProducts();
    // console.log([].constructor(3).fill(0))
  }

  getProducts(){

    // this.appState.setProductState({status : "LOADING"});
    this.ps.getProducts(this.appState.productState.currentPage,this.appState.productState.pageSize,this.appState.productState.keyword).subscribe({
      next: (data) => {
        let totalProducts:number = parseInt(data.headers.get("x-total-count")!);
        let totalPages:number = Math.ceil(totalProducts/this.appState.productState.pageSize);

        this.appState.setProductState({
          products : data.body as Product[],
          totalProducts,
          totalPages,
          // status : ""
        });

      },
      error: (err) => {
        this.appState.setProductState({
          errorMessage: err,
          // status: "ERROR"
        });
        console.log('**************');
        console.error(err.message);
        console.error(err);
      },
    });
  }
  toggleChecked(product: Product) {
    this.ps.toggleChecked(product).subscribe({
      next: (updatedProduct) => {
        console.log(updatedProduct);
        product.checked = !product.checked;
      },
    });
  }

  deleteProduct(product: Product) {
    if (confirm('Etes vous sûre?'))
      this.ps.deleteProduct(product).subscribe({
        next: () => {
          this.appState.setProductState({"products" : (this.appState.productState.products.filter((p:any) => p.id != product.id))});
        },
        error: (err) => {
          console.error(err);
        },
      });
  }


  setCurrentPage(page:number) {
    this.appState.setProductState({currentPage : page});
    this.getProducts();
  }
}

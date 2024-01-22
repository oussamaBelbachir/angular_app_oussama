import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  productId! : number;
  public productForm! : FormGroup;

  constructor(
      private route : ActivatedRoute,
      private ps : ProductService,
      private fb: FormBuilder,
      private router : Router) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProducts();
  }

  getProducts(){
    this.ps.getProductById(this.productId).subscribe({
        next : (value) => {
            const {id,name,price,checked} = value;
            this.productForm = this.fb.group({
                id : this.fb.control(id),
                name : this.fb.control(name , [Validators.required]),
                price : this.fb.control(price),
                checked : this.fb.control(checked)
            });
        },
        error: (err) => {
            console.log('**************');
            console.error(err.message);
            console.error(err);
        },

    })

  }

    updateProduct() {
        let product = this.productForm.value;
        this.ps.updateProduct(product).subscribe({
            next : value => {
                console.log("✅ ✅ ",value);
                this.router.navigateByUrl!("admin/products");
            },

            error: (err) => {
                console.log('**************');
                console.error(err.message);
                console.error(err);
            },
        })

    }
}

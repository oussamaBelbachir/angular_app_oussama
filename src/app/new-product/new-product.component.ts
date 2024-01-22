import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;
  constructor(private fb: FormBuilder,private ps:ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      price: this.fb.control(90),
      checked: this.fb.control(true),
    });
  }

  saveProduct() {
    let product:Product = this.productForm.value;
    console.log(product);
    this.ps.addProduct(product).subscribe({
      next : value => {
        console.log("✅ ✅ ✅ ",value)
      },
      error : err => {
        console.error(err)
      }
    })

  }
}

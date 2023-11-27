import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/Product";
import {ProductService} from "../services/product.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  public addForm! : FormGroup;

  constructor(private formBuilder: FormBuilder, private productService : ProductService, private router : Router) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name : this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      price : this.formBuilder.control(1, [Validators.required, Validators.min(1)]),
      promotion : this.formBuilder.control(false, [Validators.required])
    });
  }

  addProduct() {
    let product : Product = this.addForm.value;
    console.log(product);
    this.productService.addProduct(product).subscribe(
      {
        next : (data) => {
          let alt =  confirm("Add success, back to list ok");
          if(alt) this.router.navigateByUrl("/admin/products")
          else this.addForm.reset();
        }
      }
    );
  }
}

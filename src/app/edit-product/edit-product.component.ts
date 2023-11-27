import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/Product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private id!: number;
  public editForm!: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private formBuilder: FormBuilder,private router : Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe({
      next: (product) => {
        this.editForm = this.formBuilder.group({
          id: this.formBuilder.control(product.id),
          name: this.formBuilder.control(product.name, [Validators.required, Validators.minLength(5)]),
          price: this.formBuilder.control(product.price, [Validators.required, Validators.min(1)]),
          promotion: this.formBuilder.control(product.promotion)
        });
      }, error: (error) => console.log(error)
    });
  }

  updateProduct() {
    let product: Product = this.editForm.value;
    this.productService.updateProduct(product).subscribe({
      next: (result) => {
        let con = confirm("Edit success, back to list ok");
        if (con) this.router.navigateByUrl("/admin/products");
      }
    });
  }
}

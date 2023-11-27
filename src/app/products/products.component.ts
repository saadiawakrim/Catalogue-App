import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/Product';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  /*  public page: number = 0;
    public size: number = 5;
    public totalPages: number = 0;
    public products!: Array<Product>;*/

  private action: string = "all";

  public searchForm!: FormGroup;

  constructor(private productSevice: ProductService, private formBuilder: FormBuilder, private router: Router, public appStateservice: AppStateService) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group(
      {
        keyword: this.formBuilder.control("")
      }
    );
    this.getPageProduct();
  }

  public getPageProduct() {
/*    this.appStateservice.setProductsState({
      status: "LOADING"
    });*/
    this.productSevice.getPageProducts(this.appStateservice.productsState.page, this.appStateservice.productsState.size).subscribe({
      next: (pageProduct) => {
        this.appStateservice.setProductsState(
          {
            page: pageProduct.page,
            size: pageProduct.size,
            totalPages: pageProduct.totalPages,
            products: pageProduct.products,
            /*status: "DONE"*/
          }
        );
        /*this.appStateservice.productsState.page = pageProduct.page;
        this.appStateservice.productsState.size = pageProduct.size;
        this.appStateservice.productsState.totalPages = pageProduct.totalPages;
        this.appStateservice.productsState.products = pageProduct.products;*/
      },
      error: (error) => {
        console.log(error);
/*        this.appStateservice.setProductsState(
          {
            status : "EROOR",
            errorMessage : "There is a problem in data connection"
          }
        );*/
      }
    });
  }

  public getPageProductByName() {
    this.action = "search";
    this.productSevice.getPageProductsByName(this.searchForm.value.keyword, this.appStateservice.productsState.page, this.appStateservice.productsState.size).subscribe({
      next: (pageProduct) => {
        this.appStateservice.setProductsState(
          {
            page: pageProduct.page,
            size: pageProduct.size,
            totalPages: pageProduct.totalPages,
            products: pageProduct.products
          }
        );
        /*        this.appStateservice.productsState.page = pageProduct.page;
                this.appStateservice.productsState.size = pageProduct.size;
                this.appStateservice.productsState.totalPages = pageProduct.totalPages;
                this.appStateservice.productsState.products = pageProduct.products;*/
      },
      error: (error) => console.log(error)
    });
  }

  public handleGetPageProductsByName() {
    this.appStateservice.productsState.page = 0;
    this.getPageProductByName();
  }

  public changePage(index: number) {
    this.appStateservice.productsState.page = index;
    if (this.action == "all")
      this.getPageProduct();
    else
      this.getPageProductByName();
  }

  public deleteProduct(id: number) {
    this.productSevice.deleteProduct(id).subscribe(
      {
        next: () => {
          this.appStateservice.productsState.products = this.appStateservice.productsState.products.filter((element) => element.id != id);
        },
        error: (error) => console.log(error)
      }
    );
  }

  public changePromotion(id: number) {
    this.productSevice.changePromotion(id).subscribe({
      next: () => {
        this.appStateservice.productsState.products.forEach((element) => {
          if (element.id == id) element.promotion = !element.promotion
        });
      }, error: (error) => console.log(error)
    });
  }

  editProduct(id: number) {
    this.router.navigateByUrl("/admin/edit-product/" + id);
  }
}

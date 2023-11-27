import {Injectable} from '@angular/core';
import {Product, ProductsState} from "../model/Product";
import {FormGroup} from "@angular/forms";
import {AuthState} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState: ProductsState = {page: 0, size: 5, totalPages: 0, products: [], status : "", errorMessage: ""}

  public authState : AuthState = {authenticated : false, username : "", roles : [], access_token: "", refresh_token:""};

  constructor() {
  }

  public setProductsState(state : any){
    this.productsState = {...this.productsState, ...state}
  }

  public setAuthState(state : any){
    this.authState = {...this.authState, ...state};
  }
}

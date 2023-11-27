import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {PageProduct, Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppStateService} from "./app-state.service";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient, private appStateService : AppStateService) { }

  private generateHeader(){
    const headers = new HttpHeaders().set(
      'Authorization', 'Bearer ' + this.appStateService.authState.access_token
    );
    return headers;
  }
  public getPageProducts(page:number, size:number) : Observable<PageProduct>{
    return this.httpClient.get<PageProduct>(`http://127.0.0.1:8080/api/v1/products?page=${page}&size=${size}`,
      {headers:this.generateHeader()}
      );
  }

  public getPageProductsByName(keyword : string,page:number, size:number) : Observable<PageProduct>{
    return this.httpClient.get<PageProduct>(`http://127.0.0.1:8080/api/v1/products/name/like?keyword=${keyword}&page=${page}&size=${size}`,
      {headers:this.generateHeader()}
      );
  }

  public deleteProduct(id : number) : Observable<boolean>{
    return this.httpClient.delete<boolean>("http://127.0.0.1:8080/api/v1/products/"+id, {headers:this.generateHeader()});
  }

  public changePromotion(id : number) : Observable<boolean>{
    return this.httpClient.patch<boolean>("http://127.0.0.1:8080/api/v1/products/"+id+"/promotion", {}, {headers:this.generateHeader()});
  }

  public getProduct(id : number) : Observable<Product>{
    return this.httpClient.get<Product>(`http://127.0.0.1:8080/api/v1/products/${id}`,{headers:this.generateHeader()})
  }

  public addProduct(product : Product) : Observable<Product>{
    return this.httpClient.post<Product>('http://127.0.0.1:8080/api/v1/products',product, {headers:this.generateHeader()});
  }

  public updateProduct(product : Product) : Observable<Product>{
    return this.httpClient.put<Product>(`http://127.0.0.1:8080/api/v1/products/${product.id}`,product,{headers:this.generateHeader()});
  }
}

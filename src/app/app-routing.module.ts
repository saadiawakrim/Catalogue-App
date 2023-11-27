import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import {AddProductComponent} from "./add-product/add-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [
  {path: "", component : LoginComponent},
  {path : "login", component : LoginComponent},
  {path :"admin", component : AdminComponent ,canActivate: [authenticationGuard] , children : [
      {path : "products", component : ProductsComponent},
      {path : "add-product", component : AddProductComponent, canActivate : [authorizationGuard]},
      {path : "edit-product/:id", component: EditProductComponent,canActivate : [authorizationGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

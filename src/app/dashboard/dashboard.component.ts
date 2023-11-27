import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public appStateService : AppStateService) {
  }

  public getTotalPages(){
    return this.appStateService.productsState.totalPages;
  }

  public getPageSize(){
    return this.appStateService.productsState.products.length;
  }

  public getPageTotalPromotionTrue(){
    return this.appStateService.productsState.products.filter((element) => element.promotion).length;
  }

  public getPageTotalPromotionFalse(){
    return this.appStateService.productsState.products.filter((element) => !element.promotion).length;
  }

}
